import React from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { GlobalStyle } from './GlobalStyle';
import 'intersection-observer';
import 'reset.css';
import { Colors, ScreenValue } from '@/constants';
import { Header } from '@/layouts/Header';
import { Footer } from '@/layouts/Footer';
import { Loading } from '@/layouts/Loading';
import { useScreenThreshold, useBaseMetaInfo } from '@/hooks';

type BaseLayoutProps = {
  useHeader?: boolean;
  useFooter?: boolean;
  showMenu?: boolean;
};

export const BaseLayout: React.FC<BaseLayoutProps> = ({
  useHeader = true,
  useFooter = true,
  children,
}) => {
  const { title } = useBaseMetaInfo();
  const { overThreshold: isNormalScreen } = useScreenThreshold(ScreenValue.MEDIUM);

  return (
    <ThemeProvider
      theme={{
        isNormalScreen,
      }}
    >
      <GlobalStyle />
      {useHeader && <Header siteTitle={title} />}
      <Main>{children}</Main>
      {useFooter && <Footer />}
      <Loading />
    </ThemeProvider>
  );
};

const Main = styled.main`
  background-color: ${Colors.UI_PAPER};
`;

export default BaseLayout;
