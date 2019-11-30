import * as React from 'react';
const { useState, memo, useCallback } = React;

const CountButton = memo(function CountButton({onClick, count} : {onClick: () => void; count: number}) {
  console.log(count + '----------');
  return <button onClick={onClick}>{count}</button>
})

export default function Memo() {
  const [count1, setCount1] = useState(0);
  const increment1 = useCallback(() => setCount1(c => c + 1), []);

  const [count2, setCount2] = useState(0);
  const increment2 = useCallback(() => setCount2(c => c + 1), []);

  const [text, setText] = useState('测试');

  return (
    <>
      <CountButton count={count1} onClick={increment1} />
      <CountButton count={count2} onClick={increment2} />
      <p>{text}</p>
      <button onClick={() => setText(x => x + '改变了')}>改变文字</button>
    </>
  )
}