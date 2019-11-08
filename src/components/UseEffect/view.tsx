import * as React from 'react';
const { useState, useEffect } = React;
let timer: NodeJS.Timer | null = null;

export default function UseEffect() {
  const [data, setData] = useState([]);

  // useEffect serves the same purpose as componentDidMount, componentDidUpdate, and componentWillUnmount
  // If you call useEffect like I did you would see an infinite loop. And for solving this “bug” you would need to pass an empty array as a second argument to useEffect
  useEffect(() => {
    fetch('https://api.coinmarketcap.com/v1/ticker/?limit=10')
      .then(response => response.json())
      .then(data => setData(data));
    timer = setInterval(() => {
      console.log(11111111111);
    }, 1000);
    return () => { // 组件卸载执行，若在组件卸载不需要执行，则不用返回
      if (timer) {
        clearInterval(timer);
      }
    }
  }, []) // 第二个参数为[]，只在挂载执行 类似componentDidMount

  return (
    <div>
      <ul>
        {
          data.map((item: any) => (
            <li key={item.id}>{item.price_usd}</li>
          ))
        }
      </ul>
    </div>
  )
}