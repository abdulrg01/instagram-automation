// import { redirect } from "next/navigation";

// export const onOAuthInstagram = (strategy: "INSTAGRAM" | "CRM") => {
//   if (strategy === "INSTAGRAM") {
//     return redirect(process.env.INSTAGRAM_EMBEDDED_OAUTH_URL as string);
//   }
// };

export const onOAuthInstagram = (strategy: "INSTAGRAM") => {
  return () => {
    if (strategy === "INSTAGRAM") {
      window.location.href = process.env
        .NEXT_PUBLIC_INSTAGRAM_EMBEDDED_OAUTH_URL as string;
    }
  };
};
