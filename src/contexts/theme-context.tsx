'use client'

import React, { createContext, useCallback, useState } from 'react';

export type ThemeContextProps = {
  refreshThemeList: boolean;
  setRefreshThemeList: (refresh: boolean) => void;
};

export const ThemeContext = createContext<ThemeContextProps>({
  refreshThemeList: true,
  setRefreshThemeList: () => { },
});

export const ThemeContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [refreshThemeList, setRefreshThemeList] = useState(true);

  return (
    <ThemeContext.Provider value={{ refreshThemeList, setRefreshThemeList }}>
      {children}
    </ThemeContext.Provider>
  );
};
