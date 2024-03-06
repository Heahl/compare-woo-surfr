import { createContext, useContext, useState, type ReactNode } from "react";

interface LanguageContextValue {
  language: string;
  toggleLanguage: () => void;
}

const LanguageContext = createContext<LanguageContextValue | undefined>(
  undefined,
);

interface LanguageProviderProps {
  children: ReactNode;
}

const LanguageProvider = ({ children }: LanguageProviderProps): JSX.Element => {
  const [language, setLanguage] = useState("english");

  const toggleLanguage = () => {
    setLanguage((prevLanguage) =>
      prevLanguage === "english" ? "german" : "english",
    );
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

const useLanguage = (): LanguageContextValue => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};

export { LanguageProvider, useLanguage };
