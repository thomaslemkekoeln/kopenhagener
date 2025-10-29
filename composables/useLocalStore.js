export default async function useLocalStore(action, users = "users") {
  if (action === "set") {
    localStorage.setItem("users", JSON.stringify(users));
  } else if (action === "get" && window?.localStorage?.getItem("users")) {
    let localStore = window.localStorage.getItem("users");
    localStore = JSON.parse(localStore);
    localStore = eval(localStore);
    return localStore;
  }
}
