import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import Layout from "./pages/Layout";
import HomePage from "./pages/HomePage";
import ProfilePage from "./pages/Profile/ProfilePage";
import Stack from "./pages/Stack";

function App() {
  const routes = createBrowserRouter([
    {path: '/', element: <Layout />, children: ([
      {index: true, element: <HomePage />},
      {path: '/profile', element: <ProfilePage />},
      {path: '/stack', element: <Stack />}
    ])}
  ])
  return (
    <RouterProvider router={routes}/>
  );
}

export default App;
