import type { ReactNode } from "react";

import { createRoot } from "react-dom/client";

import ErrorBoundary from "./components/Error-Boundary/Error-Boundary.component";

import { Routes, initRouteComponents, usePath } from "./hooks/use-react-router/use-react-router.hook";

const { Route } = initRouteComponents();

function App(): ReactNode {
  return(
    <ErrorBoundary>
      <Routes>
        {(() => {
          const paths = usePath()
          console.log(paths)
          return(
            <Route path="/"/>
          )
        })()}
      </Routes>
      {/* children */}
    </ErrorBoundary>
  );
};

createRoot(document.body).render(
  <ErrorBoundary>
    <Routes>
      <App/>
    </Routes>
  </ErrorBoundary>
);