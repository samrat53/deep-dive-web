import "./App.css";
import React, { useContext, useState } from "react";
import { CountContext } from "./Context";

export default function App() {
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
  return (<CountComponent />);
};

const CountComponent = () => {
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
