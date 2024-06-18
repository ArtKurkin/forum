import React, { useContext, useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { Context } from "../main";
import { observer } from "mobx-react-lite";

function RequireAuth({ children }) {
  const location = useLocation();

  const { store } = useContext(Context);

  if (!store.isAuth) {
    return <Navigate to="/login" state={{ from: location }} />;
  }
  return children;
}
export default observer(RequireAuth);
