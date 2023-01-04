import { createContext, SetStateAction } from 'react';

export interface AppContextInterface {
  name: string;
  showNavbar: boolean;
  useDarkTheme: boolean;
  toggleNavbar: (value?: SetStateAction<boolean>) => void;
  toggleTheme: (value?: SetStateAction<boolean>) => void;
}

const AppCtx = createContext<AppContextInterface | null>(null);

export default AppCtx;
