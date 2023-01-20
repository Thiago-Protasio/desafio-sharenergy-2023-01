import { useState } from "react";
import { useCookies } from "react-cookie";

export default function useToken() {
  const [cookies, setCookies] = useCookies(['token']);

  const getToken = () => {
    const token = cookies.token;
    return token;
  }

  const [token, setToken] = useState(getToken());

  const saveToken = (userToken: any, remember: boolean) => {
    setCookies('token', userToken, {
      path: '/',
      maxAge: remember ? 60 * 60 * 24 * 30 : undefined,
    });
    setToken(userToken);
  };

  return {
    setToken: saveToken,
    token,
  };

}