"use client";

import { useEffect } from "react";
import { useAppDispatch } from "@/lib/hooks";
import { setCredentials, setUser } from "@/lib/redux/slices/authSlice";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

type DecodedToken = {
  UserInfo: {
    userId: string;
    name: string;
    email: string;
  };
  exp: number;
  iat: number;
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const token = Cookies.get("token");

    if (token) {
      const decoded: DecodedToken = jwtDecode(token);

      const user = {
        _id: decoded.UserInfo.userId,
        name: decoded.UserInfo.name,
        email: decoded.UserInfo.email,
      }

      dispatch(setCredentials({ token }));
      dispatch(setUser({ user }));
    }
  }, [dispatch]);

  return <>{children}</>;
}
