import axios from "axios";

type signedUser = {
  success: boolean;
  data: [];
};

export const signIn = (username: string, password: string) => {
  const BASE_API = "http://localhost:5000";
  return new Promise<signedUser>((resolve, reject) => {
    axios
      .post(`${BASE_API}/login`, { username, password })
      .then((response) => resolve(response.data))
      .catch((error) => reject(error));
  });
};
