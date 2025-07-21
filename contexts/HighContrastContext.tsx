// contexts/HighContrastContext.tsx
import React, { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

type HighContrastContextType = {
  mode: boolean;
  setMode: (val: boolean) => void;
};

const HighContrastContext = createContext<HighContrastContextType>({
  mode: false,
  setMode: () => {},
});

export const HighContrastProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [mode, setMode] = useState(false);

  useEffect(() => {
    const load = async () => {
      const value = await AsyncStorage.getItem("@hightContrastMode");
      if (value !== null) {
        setMode(JSON.parse(value));
      }
    };
    load();
  }, []);

  const updateMode = async (val: boolean) => {
    setMode(val);
    await AsyncStorage.setItem("@hightContrastMode", JSON.stringify(val));
  };

  return (
    <HighContrastContext.Provider value={{ mode, setMode: updateMode }}>
      {children}
    </HighContrastContext.Provider>
  );
};

export const useHighContrast = () => useContext(HighContrastContext);
