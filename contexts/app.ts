import { createContext, SetStateAction } from 'react';
import { ColorScheme } from '@mantine/core';

export interface AppContextInterface {
  name: string;
  apiVersion: string;

  showNavbar: boolean;
  toggleNavbar: (value?: SetStateAction<boolean>) => void;

  colorScheme: ColorScheme;
  toggleColorScheme: () => void;
}

const AppCtx = createContext<AppContextInterface | null>(null);

export default AppCtx;
