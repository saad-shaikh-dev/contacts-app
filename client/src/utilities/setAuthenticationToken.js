import axios from "axios";

const setAuthenticationToken = token => {
  token
    ? (axios.defaults.headers.common["x-auth-token"] = token)
    : delete axios.defaults.headers.common["x-auth-token"];
};

export default setAuthenticationToken;
