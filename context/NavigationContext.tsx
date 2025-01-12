import { router } from "expo-router";
import { createContext, useContext, useEffect, useState } from "react";

interface NavigationContextProps{
    sideNavPath: string;
    bottomNavPath: string;
    onChangeSidePath: (oldValue: string, newValue: string) => void;
    onChangeBottomPath: (oldValue: string, newValue: string) => void; 
}

const defaultValue: NavigationContextProps = {
    sideNavPath: "Plan",
    bottomNavPath: "Me",
    onChangeSidePath: () => {},
    onChangeBottomPath: () => {},
};

const NavigationContext = createContext<NavigationContextProps>(defaultValue);

export const useNavigationContext = () => useContext(NavigationContext);

export const NavigationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [sideNavPath, setSideNavPath] = useState<string>('Plan');
    const [bottomNavPath, setBottomNavPath] = useState<string>('Me');
  
    const onChangeSidePath = (oldValue: string, newValue: string) => {
      if (oldValue === newValue) return;
      setSideNavPath(newValue);

      const path =
        bottomNavPath === 'Notification' || bottomNavPath === 'MissedDeadline'
          ? `/${bottomNavPath}`
          : `/${bottomNavPath}/${newValue}`;
  
      router.push(path);
    };
  
    const onChangeBottomPath = (oldValue: string, newValue: string) => {
      if (oldValue === newValue) return;
      setBottomNavPath(newValue);

      const path =
        newValue === 'Notification' || newValue === 'MissedDeadline'
          ? `/${newValue}`
          : `/${newValue}/${sideNavPath}`;
  
      router.push(path);
    };
  
    const value = {
      sideNavPath,
      bottomNavPath,
      onChangeSidePath,
      onChangeBottomPath,
    };
  
    return <NavigationContext.Provider value={value}>{children}</NavigationContext.Provider>;
  };
  
