import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import Layout from "./pages/Layout";
import HomePage from "./pages/HomePage";
import ProfilePage from "./pages/Profile/ProfilePage";

function App() {
  const routes = createBrowserRouter([
    {path: '/', element: <Layout />, children: ([
      {index: true, element: <HomePage />},
      {path: '/profile', element: <ProfilePage />}
    ])}
  ])
  return (
    <RouterProvider router={routes}/>
  );
}

export default App;
