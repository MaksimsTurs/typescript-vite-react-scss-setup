import "@scss/root.scss";

import type { ReactNode } from "react";

import { Fragment } from "react";

import { createRoot } from "react-dom/client";

import ErrorBoundary from "./components/Error-Boundary/Error-Boundary.component";
import { Routes, initRouteComponents } from "./hooks/use-react-router/use-react-router.hook";
import { ReactStorageProvider } from "./hooks/use-react-storage/use-storage.hook";

export const { Route, Link } = initRouteComponents<string>();

function App(): ReactNode {
  return(
    <Fragment>{/* children */}</Fragment>
  );
};

createRoot(document.body)
  .render(
    <ErrorBoundary>
      <Routes>
        <ReactStorageProvider storages={{}}>
          <App/>
        </ReactStorageProvider>
      </Routes>
    </ErrorBoundary>
  );  