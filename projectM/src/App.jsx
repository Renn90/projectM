import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import Layout from "./pages/Layout";
import HomePage from "./pages/HomePage";

function App() {
  const routes = createBrowserRouter([
    {path: '/', element: <Layout />, children: ([
      {index: true, element: <HomePage />}
    ])}
  ])
  return (
    <RouterProvider router={routes}/>
  );
}

export default App;
