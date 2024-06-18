import React, { useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Context } from "../main";
import { observer } from "mobx-react-lite";

function LoginPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [name, setName] = useState();
  const [password, setPassword] = useState();
  const { store } = useContext(Context);

  const fromPage = location.state?.from?.pathname || "/";

  return (
    <div className="space-y-2 max-w-sm mx-auto border p-4 bg-white rounded-lg ">
      <h1 className="font-bold text-lg">Login page</h1>
      <div className="space-y-2">
        <input
          type="text"
          name="name"
          placeholder="Введите имя"
          className="border rounded-lg p-2 w-full "
          onChange={e => setName(e.target.value)}
        />
        <input
          type="password"
          name="password"
          placeholder="Введите пароль"
          className="border rounded-lg p-2 w-full "
          onChange={e => setPassword(e.target.value)}
        />
        <div className="flex gap-2">
          <button
            type="submit"
            className="bg-sky-700 text-white p-2 rounded-lg border hover:bg-sky-600"
            onClick={() =>
              store.login(name, password, () =>
                navigate(fromPage, { replace: true })
              )
            }
          >
            Войти
          </button>
          <button
            className="bg-sky-700 text-white p-2 rounded-lg border hover:bg-sky-600"
            onClick={() =>
              store.registration(name, password, () =>
                navigate(fromPage, { replace: true })
              )
            }
          >
            Зарегистрироваться
          </button>
        </div>
      </div>
    </div>
  );
}

export default observer(LoginPage);
