import { Instagram, Plane } from "lucide-react";
import { JSX } from "react";
import { GiArtificialHive } from "react-icons/gi";

export type AutomationListenerProps = {
  label: string;
  icon: JSX.Element;
  desc: string;
  type: "SMARTAI" | "MESSAGE";
};

export const AUTOMATION_LISTENERS: AutomationListenerProps[] = [
  {
    label: "Sent the user a message",
    icon: <Plane />,
    desc: "Enter the message that you want to send the user",
    type: "MESSAGE",
  },
  {
    label: "Let's Smart AI take over",
    icon: <GiArtificialHive />,
    desc: "Tell AI about your project. (Upgrade to use this feature)",
    type: "SMARTAI",
  },
];

export type AutomationLTriggerProps = {
  label: string;
  icon: JSX.Element;
  desc: string;
  type: "COMMENT" | "DM";
};

export const AUTOMATION_TRIGGER: AutomationLTriggerProps[] = [
  {
    label: "User comment on my post",
    icon: <Instagram />,
    desc: "Select if you want to automate comments on your post",
    type: "COMMENT",
  },
  {
    label: "User send me a dm with a keyword",
    icon: <Instagram />,
    desc: "Select if you want to automate DMs on your profile",
    type: "DM",
  },
];
