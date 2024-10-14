import { getOTP, verifyOTP } from "@/api/otp";
import Image from "next/image";
import { useEffect, useState } from "react";

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
  const [image, setImage] = useState("");
  const [code, setCode] = useState("");
  const [invalid, setInvalid] = useState(false);

  const checkOTP = () => {
    verifyOTP(code)
      .then((response) => {
        const result = response.success;
        if (result === true) {
          close();
          setInvalid(false);
        } else {
          setInvalid(true);
        }
      })
      .catch(() => setInvalid(false));
  };

  useEffect(() => {
    getOTP(username)
      .then((res) => {
        const bas64_image = res.base64_image;
        const imgSrc = "data:image/png;base64," + bas64_image;
        setImage(imgSrc);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [username]);

  return (
    <>
      {requireQRCode && (
        <>
          <p>
            Veuillez scanner ce qrcode avec une applicaction authenticator sur
            votre mobile
          </p>
          <Image src={image} alt="qrcode" width={200} height={200} />
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
