import { ReactNode } from "react";

const IconButton = ({
  icon,
  onClick,
  className,
}: {
  icon: ReactNode;
  onClick?: () => void;
  className?: string;
}) => {
  return (
    <div
      onClick={onClick}
      className={`w-fit h-fit rounded-md p-1 border border-gray-400 flex justify-center items-center cursor-pointer ${className}`}
    >
      {icon}
    </div>
  );
};

export default IconButton;
