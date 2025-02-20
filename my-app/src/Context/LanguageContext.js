import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState("en");
  const [translations, setTranslations] = useState({});

  useEffect(() => {
    axios.get(`http://localhost:8080/api/translations?lang=${language}`)
      .then(response => setTranslations(response.data))
      .catch(error => console.error("Error fetching translations:", error));
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, translations, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export default LanguageContext;
