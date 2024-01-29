import { RouterProvider, createBrowserRouter, useNavigation } from "react-router-dom";
import "./App.css";
import Layout from "./pages/Layout";
import HomePage from "./pages/HomePage";
import ProfilePage from "./pages/Profile/ProfilePage";
import Stack from "./pages/Stack";
import ChatHome from "./pages/chat/ChatHome";
import ChatPage from "./pages/chat/ChatPage";
import Auth from "./pages/Auth/Auth";
import { signUpAction } from "./pages/Auth/AuthFunction";
import { userLoader } from "./pages/Layout";
import { profileFormAction } from "./pages/Profile/ProfileForm";
import { ProtectRoute, protectAuth } from "./pages/Auth/ProtectRoutes";
import ErrorPage from "./pages/ErrorPage";
import { lougoutAction } from "./pages/logout";
import ProjectPage from "./pages/ProjectPage";

function App() {
  const routes = createBrowserRouter([
    {path: '/', element: <Layout />, loader: userLoader, id: 'layout', errorElement: <ErrorPage />,  children: ([
      {index: true, element: <HomePage />, loader: ProtectRoute},
      {path: '/:projectID', element: <ProjectPage />, loader: ProtectRoute },
      {path: '/profile', element: <ProfilePage />, action: profileFormAction, loader: ProtectRoute},
      {path: '/chat', element: <ChatHome />, loader: ProtectRoute },
      {path: '/chat/:projectID', element: <ChatPage />, loader: ProtectRoute },
      {path: '/stack', element: <Stack />, loader: ProtectRoute}
    ])},
    {path: '/Auth', element: <Auth />, action: signUpAction, errorElement: <ErrorPage />, loader: protectAuth},
    {path: '/logout', action: lougoutAction},
  ])  ;
  return (
    <RouterProvider router={routes}/>
  );
}

export default App;
