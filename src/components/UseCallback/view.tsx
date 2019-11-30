import * as React from 'react';
const { useState, useEffect, useCallback, memo } = React;

// function useCallback<T extends (...args: any[]) => any>(callback: T, deps: DependencyList): T;
// useCallback 会在组件第一次渲染的时候执行，之后会在其依赖的变量发生改变时再次执行，返回返回缓存的函数

const ExpensiveComputationComponent = memo(({ compute, count } : { compute: (count: number) => number; count: number }) => {
  console.log('useCallback----------->');
  return (
    <div>
      <h1>computed: {compute(count)}</h1>
      <h4>last re-render {new Date().toLocaleTimeString()}</h4>
    </div>
  );
});

function UseCallback(){
  const [time, setTime] = useState(new Date());
  const [count, setCount] = useState(1);
  useEffect(() => {
    const timer = setTimeout(() => {
      setTime(new Date());
    }, 1000);
    return () => clearTimeout(timer);
  });

  const fibonacci = (n: number): number => {
    if (n <= 1) {
      return 1;
    }
    return fibonacci(n - 1) + fibonacci(n - 2);
  };

  return (
    <div>
      <h1>useCallback Example {time.toLocaleTimeString()}</h1>
      <button onClick={() => setCount(count + 1)}>
        current count: {count}
      </button>
      <ExpensiveComputationComponent
        compute={useCallback(fibonacci, [])}
        // compute={fibonacci}
        count={count}
      />
    </div>
  );
};

export default UseCallback;