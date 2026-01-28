import type { ReactNode } from "react";

import { createRoot } from "react-dom/client";

import ErrorBoundary from "./components/Error-Boundary/Error-Boundary.component";

import ReactStorageProvider from "./hooks/use-react-storage/components/React-Storage-Provider.component";

function App(): ReactNode {
  return(
    <ErrorBoundary>
      {/* children */}
    </ErrorBoundary>
  );
};

createRoot(document.body).render(
  <ReactStorageProvider storages={{}}>
    <ErrorBoundary>
      <App/>
    </ErrorBoundary>
  </ReactStorageProvider>
);  