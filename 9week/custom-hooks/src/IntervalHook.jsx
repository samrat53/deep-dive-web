import React, { useEffect, useState } from "react";

function useInterval(fn, time) {
  useEffect(() => { //used useEffect sob that anytime the App rerenders the timer doesnot restarts
    const x = setInterval(() => {
      fn();
    }, time);
    return () => clearInterval(x);
  }, [fn, time]);
}

const IntervalHook = () => {
  const [count, setCount] = useState(0);
  useInterval(() => {
    setCount((c) => c + 1);
  }, 1000);
  return <div>Timer is at {count}</div>;
};

export default IntervalHook;
