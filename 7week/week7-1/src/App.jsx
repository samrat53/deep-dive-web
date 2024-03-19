import "./App.css";
//--------------------------------using recoil-------------------------------------------
import {
  RecoilRoot,
  useRecoilState,
  useRecoilValue,
  useSetRecoilState,
} from "recoil";
import { countAtom, evenSelector } from "./store/atoms/count";

export default function App() {
  return (
    <div>
      <RecoilRoot>
        <CountRecoil />
      </RecoilRoot>
    </div>
  );
}

const CountRecoil = () => {
  console.log("re-render count");
  return (
    <div>
      <CountRendererRecoil />
      <ButtonsRecoil />
    </div>
  );
};

const CountRendererRecoil = () => {
  const count = useRecoilValue(countAtom); // got just the count here
  console.log("re-render countRenderer");
  return (
    <>
      <b>{count}</b>
      <EvenCountRender />
    </>
  );
};

const EvenCountRender = () => {
  const isEven=useRecoilValue(evenSelector);
  return <div>{isEven? `It is even` : ``}</div>;
};

const ButtonsRecoil = () => {
  // const [count, setCount] = useRecoilState(countAtom);
  const setCount = useSetRecoilState(countAtom); 
  //more optimised=> count is not fetched and hence is not re-rendered
  
  console.log("re-render buttons");
  return (
    <div>
      <button onClick={() => setCount((prev) => prev + 1)}>Inc</button>
      <button onClick={() => setCount((prev) => prev - 1)}>Dec</button>
    </div>
  );
};

// ------------------------using context api------------------------------------

import React, { useContext, useState } from "react";
import { CountContext } from "./Context";
export function ContextAPI() {
  const [count, setCount] = useState(0);
  return (
    <div>
      <CountContext.Provider value={[count, setCount]}>
        <Count />
      </CountContext.Provider>
    </div>
  );
}

const Count = () => {
  console.log("re-rendered Count");
  return <CountComponent />;
};

const CountComponent = () => {
  console.log("re-rendered CountComponent");
  return (
    <div>
      <CountRenderer />
      <Buttons />
    </div>
  );
};

const CountRenderer = () => {
  const [count] = useContext(CountContext);
  return <div>{count}</div>;
};

const Buttons = () => {
  const [count, setCount] = useContext(CountContext);
  return (
    <div>
      <button onClick={() => setCount(count + 1)}>Inc</button>
      <button onClick={() => setCount(count - 1)}>Dec</button>
    </div>
  );
};

// ------------------ using browser router and react lazy with suspence----------------------------

import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import Fallback from "./components/Fallback";
import { Suspense } from "react";
const Dashboard = React.lazy(() => import("./components/Dashboard"));
const Landing = React.lazy(() => import("./components/Landing"));

export function Routing() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={
              <Suspense fallback={<Fallback />}>
                <Landing />
              </Suspense>
            }
          />
          <Route
            path="/dashboard"
            element={
              <Suspense fallback={<Fallback />}>
                <Dashboard />
              </Suspense>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

const Navbar = () => {
  const navigate = useNavigate();
  return (
    <div>
      <div>
        <button onClick={() => navigate("/")}>Landing</button>
        <button onClick={() => navigate("/dashboard")}>Dashboard</button>
      </div>
    </div>
  );
};
