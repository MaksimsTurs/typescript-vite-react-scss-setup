import "@scss/root.scss";

import type { ReactNode } from "react";

import { createRoot } from "react-dom/client";

import ErrorBoundary from "./components/Error-Boundary/Error-Boundary.component";
import { Routes, initRouteComponents, useParams, usePath } from "./hooks/use-react-router/use-react-router.hook";
import { ReactStorageProvider } from "./hooks/use-react-storage/use-storage.hook";

export const { Route, Link } = initRouteComponents<string>();

function App(): ReactNode {
  const params = useParams();
  const path = usePath();

  console.log(params, path);

  return(
    <>
      <Route path="/" children={
        <Link href="/2599" children="User"/> 
      }/>
      <Route path="/:id" children={
        <Link href="/" children={`User: ${params.id}`}/>
      }/>
      {/* children */}
    </>
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