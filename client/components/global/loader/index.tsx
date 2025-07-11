import { cn } from "@/lib/utils";
import { FaSpinner } from "react-icons/fa";

type Props = {
  state: boolean;
  className?: string;
  children?: React.ReactNode;
  color?: string;
};

function Loader({ state, className, children, color }: Props) {
  return state ? (
    <div className={cn(className)}>
      <FaSpinner color={color} />
    </div>
  ) : (
    children
  );
}

export default Loader;
