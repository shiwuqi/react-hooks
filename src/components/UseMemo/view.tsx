import * as React from 'react';
const { useState, useMemo } = React;

// function useMemo<T>(factory: () => T, deps: DependencyList | undefined): T;
// useMemo 会在组件第一次渲染的时候执行，之后会在其依赖的变量发生改变时再次执行，返回缓存的变量


const fibonacci = (n: number): number => {
  console.log(n + '------>');
  if (n <= 1) {
    return 1;
  }
  return fibonacci(n - 1) + fibonacci(n - 2);
};

export default function UseMemo() {
  const [num, setNum] = useState(1);
  const [isGreen, setIsGreen] = useState(true);
  const fib = useMemo(() => fibonacci(num), [num]);

  return <div>
    <h1
      onClick={() => setIsGreen(!isGreen)}
      style={{ color: isGreen ? "limegreen" : "crimson" }}
    >
      useMemo Example
  </h1>
    <h2>
      Fibonacci of {num} is {fib}
    </h2>
    <button onClick={() => setNum(num + 1)}>➕</button>
  </div>
}