import React, { useEffect, useState } from "react";
import axios from "axios";

function useDebounce(inputValue, time) {
  const [dedouncedValue, setDebouncedValue] = useState(inputValue);

  useEffect(() => {
    let id = setTimeout(() => {
      setDebouncedValue(inputValue);
    }, time);

    return () => clearTimeout(id); //whenever the input parameter changes, the previous useEffect unmounts clearing the previous clock and then starting the new clock
  }, [inputValue]);

  return dedouncedValue;
}

const DebounceHook = () => {
  const [input, setInput] = useState("");
  const debouncedInput = useDebounce(input, 300);

  //   api call with debouncedInput
  useEffect(() => {
    axios.get("some url with" + debouncedInput);
    console.log(debouncedInput);
  }, [debouncedInput]);

  return (
    <div>
      <input
        type="text"
        placeholder="Enter here"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
    </div>
  );
};

export default DebounceHook;
