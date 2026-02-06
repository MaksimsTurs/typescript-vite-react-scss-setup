import "@scss/root.scss";

import type { ReactNode } from "react";

import { createRoot } from "react-dom/client";

import ErrorBoundary from "./components/Error-Boundary/Error-Boundary.component";
import { Routes } from "./hooks/use-react-router/use-react-router.hook";
import { ReactStorageProvider } from "./hooks/use-react-storage/use-storage.hook";

function App(): ReactNode {
  return(
    <ErrorBoundary>
      {/* children */}
    </ErrorBoundary>
  );
};

createRoot(document.body).render(
  <ReactStorageProvider storages={{}}>
    <Routes>
      <ErrorBoundary>
        <App/>
      </ErrorBoundary>
    </Routes>
  </ReactStorageProvider>
);  