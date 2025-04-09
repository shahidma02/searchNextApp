"use client";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  decrement,
  increment,
  incrementAsync,
  incrementByAmount,
} from "@/store/slice";
import { AppDispatch, RootState } from "@/store/store";

export default function Counter() {
  const count = useSelector((state: RootState) => state.counter.value);
  const dispatch = useDispatch<AppDispatch>();

  return (
    <div>
      <div>
        <button
          aria-label="Increment value"
          // onClick={() => dispatch(incrementByAmount(10))}
          onClick={() => dispatch(incrementAsync(10))}
        >
          Increment
        </button>
        <span>{count}</span>
        <button
          aria-label="Decrement value"
          onClick={() => dispatch(decrement())}
        >
          Decrement
        </button>
      </div>
    </div>
  );
}
