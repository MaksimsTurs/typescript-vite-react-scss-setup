import { expect, test } from "vitest";
import { render, screen,  } from "@testing-library/react";
import events from "@testing-library/user-event"

import { ReactStorageProvider, useStorage, createStorage } from "../use-storage.hook";

const counter = createStorage({
  initState: { count: 0 },
  actions: {
    increment: function(state, payload) {
      return {
        count: state.count + payload
      };
    },
    decrement: function(state, payload) {
      return {
        count: state.count - payload
      };
    }
  }
});

const { increment, decrement } = counter.actions;
const storages = { counter };

test("Test rendering and rerendering after synchrone state changing.", async function() {
  render(
    <ReactStorageProvider storages={storages}>
      <Synchrone/>
    </ReactStorageProvider>
  );

  expect(screen.getByTestId("counter").textContent).toBe("0");
  expect(counter.get()).toStrictEqual({ count: 0 });

  await events.click(screen.getByText("Increment"));

  expect(screen.getByTestId("counter").textContent).toBe("1");
  expect(counter.get()).toStrictEqual({ count: 1 });
});

function Synchrone() {
  const [data, dispatch] = useStorage<typeof storages, { count: number }>(selector => selector.counter);
  
  return(
    <div>
      <button onClick={() => dispatch(increment(1))}>Increment</button>
      <p data-testid="counter">{data.count}</p>
      <button onClick={() => dispatch(decrement(1))}>Decrement</button>
    </div>
  );
};