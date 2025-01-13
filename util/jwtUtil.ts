import { jwtDecode } from "jwt-decode";

interface DecodedToken {
  id: string;
  role: string;
  exp: number;
}

export const decodeToken = (token: string): DecodedToken => {
  const decodedToken = jwtDecode<any>(token);
  return {
    id: decodedToken.sub,
    role: decodedToken.role,
    exp: decodedToken.exp,
  };
};

export const isTokenExpired = (token: string): boolean => {
    const decoded = jwtDecode<DecodedToken>(token);
    const currentTime = Math.floor(Date.now() / 1000);
    return decoded.exp < currentTime;
};
  