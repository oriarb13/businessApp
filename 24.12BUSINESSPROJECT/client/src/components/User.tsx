import React from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

interface UserCardProps {
  image: string;
  name: string | undefined;
}

const User: React.FC<UserCardProps> = ({ image, name }) => {
  return (
    <div className="flex items-center justify-center w-40 mt-2">
      <div className="flex items-center w-full pr-3 space-x-2 rounded-full shadow-lg py- bg-gradient-to-r from-gray-300 via-gray-200 to-gray-100 dark:from-blue-500 dark:via-blue-400 dark:to-blue-300">
        <Avatar className="w-8 h-8">
          <AvatarImage src={image} alt={name} />
          <AvatarFallback>{name?.charAt(0)}</AvatarFallback>
        </Avatar>
        <div className="font-medium text-gray-800 dark:text-white">{name}</div>
      </div>
    </div>
  );
};

export default User;
