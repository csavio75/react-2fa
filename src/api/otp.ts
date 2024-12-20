import axios from "axios";

type ResponseData = {
  uri: string;
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
        resolve(response.data);
      })
      .catch((err) => {
        console.log(err);
        reject(err);
      });
  });
};

export const removeQrcode = (username: string) => {
  const url = `${BASE_API}/qrcode/remove/${username}`;
  return new Promise((resolve, reject) => {
    axios
      .delete(url)
      .then((response) => {
        resolve(response.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};
