import React from "react";

export default function Dashboard() {
  return (
    <div>
      <Boldify>
        <div>Dashboard</div>
      </Boldify>
    </div>
  );
}

export function Boldify ({ children }) {
    // how to use children props
  return <b>{children}</b>;
};
