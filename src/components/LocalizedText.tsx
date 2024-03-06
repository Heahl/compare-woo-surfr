import { type ReactNode } from "react";
import { useLanguage } from "./LanguageContext";

interface LocalizedTextProps {
  englishText: string;
  germanText: string;
  className?: string;
  children?: ReactNode;
}

const LocalizedText = ({
  englishText,
  germanText,
  className,
}: LocalizedTextProps) => {
  const { language } = useLanguage();

  return (
    <span className={className}>
      {language === "english" ? englishText : germanText}
    </span>
  );
};

export default LocalizedText;
