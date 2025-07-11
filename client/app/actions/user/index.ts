import { useGetAutomationInfoQuery } from "@/lib/redux/services/automation";
import { useGetUserQuery } from "@/lib/redux/services/userApi";

export const OnUserInfo = (id: string) => {
  const { data } = useGetUserQuery(id);
  if (!data) {
    return { user: null };
  }
  return { user: data };
};

export const OnAutomationInfo = (id: string) => {
  const { data, refetch } = useGetAutomationInfoQuery(id);
  return { automation: data, refetch };
};
