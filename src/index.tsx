import type { ReactNode } from "react";

import { createRoot } from "react-dom/client";

import ErrorBoundary from "./components/Error-Boundary/Error-Boundary.component";

function App(): ReactNode {
  return(
    <ErrorBoundary>
      {/* children */}
    </ErrorBoundary>
  );
};

createRoot(document.body).render(<App/>);