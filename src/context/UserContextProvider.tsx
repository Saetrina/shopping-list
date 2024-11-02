import React, { createContext, useContext, useState, ReactNode } from "react";
import { TUser } from "../utils/types/types";

type Props = {
  children: ReactNode;
};

// Define a context type that includes user and setUser
type UserContextType = {
  user: TUser | null;
  setUser: React.Dispatch<React.SetStateAction<TUser | null>>;
};

const UserContext = createContext<UserContextType | null>(null);

export const UserContextProvider = ({ children }: Props) => {
  const [user, setUser] = useState<TUser | null>(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  const context = useContext(UserContext);

  if (!context)
    throw new Error("useUserContext must be used within a UserContextProvider");

  return context;
};
