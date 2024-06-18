import {
  Route,
  Routes,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import HomePage from "./pages/HomePage";
import CategoryPage from "./pages/CategoryPage";
import NotFoundPage from "./pages/NotFoundPage";
import "./App.css";
import Layout from "./components/Layout";
import CreatePost from "./pages/CreatePost";
import LoginPage from "./pages/LoginPage";
import RequireAuth from "./hoc/RequireAuth";
import { Toaster } from "sonner";
import { useContext, useEffect } from "react";
import { Context } from "./main";
import { observer } from "mobx-react-lite";
import ForumPage from "./pages/ForumPage";
import TopicPage from "./pages/TopicPage";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<HomePage />} />

      <Route path="category/">
        <Route path=":slug" element={<CategoryPage />} />
      </Route>
      <Route path="forum/:slug" element={<ForumPage />} />
      <Route path="topic/:slug" element={<TopicPage />} />
      <Route
        path="posts/new"
        element={
          <RequireAuth>
            <CreatePost />
          </RequireAuth>
        }
      />
      <Route path="login" element={<LoginPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Route>
  )
);

function App() {
  const { store } = useContext(Context);

  const check = async () => {
    await store.checkAuth();
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      check();
    }
  }, []);

  return (
    <>
      <Toaster richColors />
      <RouterProvider router={router} />
    </>
  );
}

export default observer(App);
