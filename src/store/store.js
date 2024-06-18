import { makeAutoObservable } from "mobx";
import { toast } from "sonner";
import axios from "axios";
import $api from "../http";
import { API_URL } from "../http";

export default class Store {
  user = {};
  isAuth = false;
  isLoading = false;

  constructor() {
    makeAutoObservable(this);
  }

  setAuth(bool) {
    if (bool == !this.isAuth) {
      this.isAuth = bool;
    }
  }

  setUser(user) {
    this.user = user;
  }

  setLoading(bool) {
    this.isLoading = bool;
  }

  async login(name, password, callback) {
    try {
      const response = await $api.post("/users/login", { name, password });
      localStorage.setItem("token", response.data.accessToken);
      this.setAuth(true);
      toast.success("Вы вошли в аккаунт");
      this.setUser(response.data.user);
      callback();
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data?.message);
        return;
      } else {
        toast.error("Ошибка запроса");
      }
      console.log(error);
    }
  }

  async registration(name, password, callback) {
    try {
      const response = await $api.post("/users/registration", {
        name,
        password,
      });
      localStorage.setItem("token", response.data.accessToken);
      this.setAuth(true);
      this.setUser(response.data.user);
      callback();
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data?.message);
        return;
      } else {
        toast.error("Ошибка запроса");
      }
      console.log(error);
    }
  }

  async logout(callback) {
    try {
      const response = $api.get("/users/logout");
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message);
        return;
      } else {
        toast.error("Ошибка запроса");
      }
      console.log(error);
      toast.error(error.response?.data?.message);
    } finally {
      toast.success("Вы вышли из аккаунта");
      localStorage.removeItem("token");
      this.setAuth(false);
      this.setUser({});
      if (callback) {
        callback();
      }
    }
  }

  async checkAuth() {
    this.setLoading(true);
    try {
      const response = await axios.get(`${API_URL}/users/refresh`, {
        withCredentials: true,
      });
      localStorage.setItem("token", response.data.accessToken);
      this.setAuth(true);
      this.setUser(response.data.user);
    } catch (error) {
      console.log(error);
    } finally {
      this.setLoading(false);
    }
  }
}
