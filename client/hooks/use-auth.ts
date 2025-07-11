import jwtDecode from "jwt-decode";
import { useAppSelector } from "@/lib/hooks";

const useAuth = () => {
  const { token } = useAppSelector((state) => state.auth);

  if (token) {
    const decoded = jwtDecode(token);
    const { name, email, userId } = decoded.UserInfo;

    return { name, email, userId };
  }

  return { username: "", email: "", userId: "" };
};
export default useAuth;
