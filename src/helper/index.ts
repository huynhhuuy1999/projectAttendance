export * from "./cookie";

export const logout = () => {
  window.location.replace("/");
  window.localStorage.clear();
};

export let regNumber = /^\d+$/;
