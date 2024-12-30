import React, { createContext, useContext, useState, useMemo } from "react";
import { validateToken } from "@/API/userAPI";
import { useNavigate } from "react-router-dom";

type IUser = {
  _id: string;
  username: string;
  email: string;
  password: string;
  image?: string;
  plan: "Standard" | "Gold" | "Platinum";
  savedBusinesses: string[];
  ownBusinesses: string[];
};

interface UserContextType {
  user: IUser | null;
  isGuest: boolean;
  fetchUser: () => void;
  setUser: React.Dispatch<React.SetStateAction<IUser | null>>;
  loginAsGuest: () => void;
  checkTokenValidity: () => Promise<void>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

interface UserProviderProps {
  children: React.ReactNode;
}

export const UserProvider = ({ children }: UserProviderProps) => {
  const navigate = useNavigate();
  const [user, setUser] = useState<IUser | null>(null);
  const [isGuest, setIsGuest] = useState<boolean>(false);

  // fetch user
  const fetchUser = async () => {
    try {
      const user = await validateToken();
      setUser(user);
      setIsGuest(false);
    } catch (error) {
      console.error("Invalid token", error);
      if (isGuest) {
        setUser(null);
        navigate("/");
      }
    }
  };

  // Function to login as guest
  const loginAsGuest = () => {
    setUser(null);
    setIsGuest(true);
    navigate("/home");
  };

  // check token
  const checkTokenValidity = async () => {
    try {
      await validateToken();
    } catch (error) {
      console.error("Invalid token", error);
      if (!isGuest) {
        alert("Your session has expired. Please log in again.");
        setUser(null);
        navigate("/login");
      }
    }
  };

  const value = useMemo(
    () => ({
      user,
      isGuest,
      fetchUser,
      setUser,
      loginAsGuest,
      checkTokenValidity,
    }),
    [user, isGuest]
  );

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useUser = () => {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }

  return context;
};
