import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import Layout from "./pages/Layout";
import HomePage from "./pages/HomePage";
import ProfilePage from "./pages/Profile/ProfilePage";
import Stack from "./pages/Stack";
import ChatHome from "./pages/chat/ChatHome";
import ChatPage from "./pages/chat/ChatPage";

function App() {
  const routes = createBrowserRouter([
    {path: '/', element: <Layout />, children: ([
      {index: true, element: <HomePage />},
      {path: '/profile', element: <ProfilePage />},
      {path: '/chat', element: <ChatHome /> },
      {path: '/chat/:projectID', element: <ChatPage /> },
      {path: '/stack', element: <Stack />}
    ])}
  ])
  return (
    <RouterProvider router={routes}/>
  );
}

export default App;
