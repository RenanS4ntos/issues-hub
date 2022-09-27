import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

interface AuthContextExportData {
  hasUser: boolean;
  authenticated: boolean;
  signIn({ email, password }): Promise<void>;
  signOut(): Promise<void>;
}

const AuthContext = createContext<AuthContextExportData>(
  {} as AuthContextExportData
);

const AuthProvider: React.FC = ({ children }) => {
  const [hasUser, setHasUser] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);

  const signIn = useCallback(async (username: string, password: string) => {
    if (username && password) {
      setHasUser(true);
      setAuthenticated(true);
    }
  }, []);

  const signOut = useCallback(async () => {
    setHasUser(false);
    setAuthenticated(false);
  }, []);

  const value = useMemo(
    () => ({
      authenticated,
      signOut,
      signIn,
      hasUser,
    }),
    [authenticated, signOut, signIn, hasUser]
  );

  return (
    <AuthContext.Provider
      // eslint-disable-next-line react/jsx-no-constructed-context-values
      value={value}
    >
      {children}
    </AuthContext.Provider>
  );
};

function useAuth(): AuthContextExportData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth deve ser usado com AuthProvider");
  }

  return context;
}

export { AuthProvider, useAuth };
