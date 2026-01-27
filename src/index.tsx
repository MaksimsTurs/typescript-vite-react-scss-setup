import type { ReactNode } from "react";

import { createRoot } from "react-dom/client";

import ErrorBoundary from "./components/Error-Boundary/Error-Boundary.component";

import { Routes, initRouteComponents, useNavigate } from "./hooks/use-react-router/use-react-router.hook";

const { Route } = initRouteComponents();

function App(): ReactNode {
  return(
    <ErrorBoundary>
        {(() => {
          const navigate = useNavigate();
          return(
            <>
              <Route path="/" children={
                <button onClick={() => navigate("/home")}>Go /home</button>
              }/>
              <Route path="/home" children={
                <button onClick={() => navigate("/")}>Go /</button>
              }/>
            </>
          )
        })()}
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