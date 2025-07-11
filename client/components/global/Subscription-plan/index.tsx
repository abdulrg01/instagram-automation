import { OnUserInfo } from "@/app/actions/user";
import { useAppSelector } from "@/lib/hooks";

type Props = {
  type: "FREE" | "PRO";
  children: React.ReactNode;
};

export const SubscriptionPlan = ({ children, type }: Props) => {
  const { user: userInfo } = useAppSelector((state) => state.auth);
  const { user } = OnUserInfo(userInfo?._id || "");
  return user?.subscription?.plan === type && children;
};
