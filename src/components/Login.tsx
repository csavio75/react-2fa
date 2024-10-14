import { signIn } from "@/api/Login";
import { useState } from "react";
import Credentials from "./Credentials";
import Welcome from "./Welcome";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [invalidCredentials, setInvalidCredentials] = useState(false);
  const [enable2FA, setEnable2FA] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleLogin = () => {
    if (username && password) {
      const logIn = signIn(username, password);
      logIn
        .then((response) => {
          if (!response.success) {
            setInvalidCredentials(true);
          } else {
            setInvalidCredentials(false);
            setEnable2FA(true);
          }
        })
        .catch((error) => console.error(error));
    }
  };

  if (enable2FA && !success) {
    return (
      <>
        {enable2FA && (
          <>
            <Credentials
              username={username}
              requireQRCode={false}
              close={() => setSuccess(true)}
            />
          </>
        )}
      </>
    );
  }

  if (success) {
    return <Welcome username={username} />;
  }

  return (
    <>
      <h4>Authentification</h4>
      <br />
      <label htmlFor="username">Username: </label>
      <input
        type="text"
        name="username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <br />
      <br />
      <label htmlFor="password">Password: </label>
      <input
        type="password"
        name="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <br />
      <br />
      <button onClick={handleLogin}>Se connecter</button>
      <br />

      {invalidCredentials && <p>Invalid credentials</p>}
    </>
  );
}
