// Store
interface CounterState {
  value: number;
}

interface UserState {
  isSignedIn: boolean;
}

// Actions
const increment = { type: "INCREMENT", payload: 1 };
const decrement = { type: "DECREMENT", payload: 1 };

const ReduxPage = () => {
  return <div>Hello</div>;
};

export default ReduxPage;
