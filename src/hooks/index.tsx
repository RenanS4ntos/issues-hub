import React from "react";
import { Provider as PaperProvider } from "react-native-paper";
import { AuthProvider } from "./auth-hook";

interface HooksProviderProps {
  children: React.ReactNode;
}

export default function HooksProvider({ children }: HooksProviderProps) {
  return (
    <PaperProvider>
      <AuthProvider>{children}</AuthProvider>
    </PaperProvider>
  );
}
