import axios from "axios";

type ResponseData = {
  base64_image: string;
};

type ValidOTP = {
  success: boolean;
};

const BASE_API = "http://localhost:5000";

export const getOTP = (username: string) => {
  const url = `${BASE_API}/otp/${username}`;
  return new Promise<ResponseData>((resolve, reject) => {
    axios
      .get(url)
      .then((response) => {
        resolve(response.data);
      })
      .catch((error) => reject(error));
  });
};

export const verifyOTP = (code: string) => {
  const url = `${BASE_API}/verify_otp`;
  return new Promise<ValidOTP>((resolve, reject) => {
    axios
      .post(url, { code: code })
      .then((response) => {
        console.log(response.data);
        resolve(response.data);
      })
      .catch((err) => {
        console.log(err);
        reject(err);
      });
  });
};
