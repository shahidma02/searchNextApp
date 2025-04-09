"use client";
import { useCounterStore } from "../store";

export default function ZustandPage() {
  const count = useCounterStore((state) => state.count);
  const increment = useCounterStore((state) => state.incrementAsync);
  const decrement = useCounterStore((state) => state.decrement);

  return (
    <div style={{ textAlign: "center", marginTop: "2rem" }}>
      <h2>Hello</h2>
      <h1>{count}</h1>
      <div style={{ marginTop: "1rem" }}>
        <button
          onClick={increment}
          style={{ marginRight: "1rem", padding: "0.5rem 1rem" }}
        >
          Increment
        </button>
        <button onClick={decrement} style={{ padding: "0.5rem 1rem" }}>
          Decrement
        </button>
      </div>
    </div>
  );
}
