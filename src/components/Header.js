import React from "react";
import MultiLanguage from "../containers/multiLanguage/index";
import { useTranslation } from "react-i18next";

const Header = () => {
  const { t } = useTranslation();
  return (
    <header>
      <h1>{t("todolist")}</h1>
      <MultiLanguage></MultiLanguage>
    </header>
  );
};

export default Header;
