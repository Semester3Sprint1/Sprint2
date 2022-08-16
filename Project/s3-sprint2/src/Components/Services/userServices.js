import http from "../Services/http";

let getUsers = () => {
  console.log("Get Users is running");
  return http.get("http://localhost:3001/api/users/me");
};

export default { getUsers };
