import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

type MainLayoutChromeContextValue = {
  hideTabBar: boolean;
  setHideTabBar: (hidden: boolean) => void;
};

const MainLayoutChromeContext = createContext<MainLayoutChromeContextValue | null>(
  null
);

export function MainLayoutChromeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [hideTabBar, setHideTabBarState] = useState(false);
  const setHideTabBar = useCallback((hidden: boolean) => {
    setHideTabBarState(hidden);
  }, []);

  const value = useMemo(
    () => ({ hideTabBar, setHideTabBar }),
    [hideTabBar, setHideTabBar]
  );

  return (
    <MainLayoutChromeContext.Provider value={value}>
      {children}
    </MainLayoutChromeContext.Provider>
  );
}

export function useMainLayoutChrome(): MainLayoutChromeContextValue {
  const ctx = useContext(MainLayoutChromeContext);
  if (!ctx) {
    throw new Error(
      "useMainLayoutChrome must be used within MainLayoutChromeProvider"
    );
  }
  return ctx;
}
