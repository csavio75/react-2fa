import { getOTP, removeQrcode, verifyOTP } from "@/api/otp";
import { useEffect, useState } from "react";
import OTPQrcode from "./qrcode";

type credentialsProps = {
  username: string;
  requireQRCode: boolean;
  close: () => void;
};

export default function Credentials({
  username,
  requireQRCode,
  close,
}: credentialsProps) {
  const [uri, setUri] = useState("");
  const [code, setCode] = useState("");
  const [invalid, setInvalid] = useState(false);

  const checkOTP = () => {
    verifyOTP(code)
      .then((response) => {
        const result = response.success;
        if (result === true) {
          close();
          setInvalid(false);
          removeQrcode(username);
        } else {
          setInvalid(true);
        }
      })
      .catch(() => setInvalid(false));
  };

  useEffect(() => {
    getOTP(username)
      .then((res) => {
        setUri(res.uri);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [username]);

  return (
    <>
      {requireQRCode && uri && (
        <>
          <p>
            Veuillez scanner ce qrcode avec une applicaction authenticator sur
            votre mobile
          </p>
          <OTPQrcode uri={uri} />
        </>
      )}
      <br />
      <p>Veuillez saisir le code OTP dans authenticator</p>
      <input
        type="text"
        name="code"
        value={code}
        onChange={(e) => setCode(e.target.value)}
      />
      <button onClick={checkOTP}>Vérifier</button>
      {invalid && <p>Invalid credentials</p>}
    </>
  );
}
