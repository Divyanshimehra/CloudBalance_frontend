import { createContext, useContext } from "react";

export const AccountContext = createContext(null);
export function useAccount() {
  const ctx = useContext(AccountContext);
  if (!ctx) {
    throw new Error("useAccount must be used inside AccountProvider");
  }
  return ctx;
}