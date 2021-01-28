import { ThemeContext } from 'styled-components';
import { useContext } from 'react';

type Theme = { isNormalScreen: boolean };
export const useTheme = (): Theme => {
  return useContext<Theme>(ThemeContext);
};
