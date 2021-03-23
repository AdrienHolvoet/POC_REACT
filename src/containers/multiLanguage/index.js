import React from "react";
import { useTranslation } from "react-i18next";

const MultiLanguage = () => {
  const { t, i18n } = useTranslation();
  return (
    <div>
      <button onClick={() => i18n.changeLanguage("fr")}>{t("fr")}</button>
      <button onClick={() => i18n.changeLanguage("en")}>{t("en")}</button>
    </div>
  );
};

export default MultiLanguage;
