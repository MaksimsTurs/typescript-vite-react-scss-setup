import "@scss/root.scss";

import type { ReactNode } from "react";

import { createRoot } from "react-dom/client";

import ErrorBoundary from "./components/Error-Boundary/Error-Boundary.component";
import { Routes, initRouteComponents } from "./hooks/use-react-router/use-react-router.hook";
import { ReactStorageProvider } from "./hooks/use-react-storage/use-storage.hook";

const { Route, Link } = initRouteComponents<"/home">();

function App(): ReactNode {
  return(
    <Routes>
      <Route path="/home"/>
      {/*  children */}
    </Routes>
  )
};

createRoot(document.body)
  .render(
    <ErrorBoundary>
      <ReactStorageProvider storages={{}}>
        <App/>
      </ReactStorageProvider>
    </ErrorBoundary>
  );  