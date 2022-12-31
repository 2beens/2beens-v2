import { createContext, SetStateAction } from 'react';

export interface AppContextInterface {
  name: string;
  showNavbar: boolean;
  toggleNavbar: (value?: SetStateAction<boolean>) => void;
}

const AppCtx = createContext<AppContextInterface | null>(null);

export default AppCtx;
