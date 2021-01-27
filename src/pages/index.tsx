import React, { useState, useEffect } from 'react';
import { BaseLayout, Meta } from '@/layouts';

import styled from 'styled-components';
import { ScreenValue } from '@/constants';
import { MomentumScroll, TopContent } from '@/components';

const threshold = ScreenValue.MEDIUM;

const IndexPage: React.FC = () => {
  const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth);
  const isNormalScreen = windowWidth > threshold;

  useEffect(() => {
    const adjustWindowWidth = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener('resize', adjustWindowWidth);
    adjustWindowWidth();
  }, []);

  return (
    <>
      <BaseLayout>
        <Meta />
        <Container>
          {isNormalScreen && (
            <MomentumScroll direction="horizontal" smooth>
              <TopContent />
            </MomentumScroll>
          )}
        </Container>
      </BaseLayout>
    </>
  );
};

const Container = styled.div``;

export default IndexPage;
