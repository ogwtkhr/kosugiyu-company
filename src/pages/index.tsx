import React from 'react';
import { BaseLayout, Meta } from '@/layouts';
import { useScreenThreshold } from '@/hooks';

import styled from 'styled-components';
import { MomentumScroll, RenderClientOnly, TopContent } from '@/components';

const IndexPage: React.FC = () => {
  const { overThreshold: isNormalScreen } = useScreenThreshold();

  // SSRだとレンダリングが変になるのでスキップ
  return (
    <RenderClientOnly>
      <BaseLayout useHeader={!isNormalScreen}>
        <Meta />
        <Container>
          {isNormalScreen && (
            <MomentumScroll direction="horizontal" smooth>
              <TopContent />
            </MomentumScroll>
          )}
          {!isNormalScreen && <TopContent />}
        </Container>
      </BaseLayout>
    </RenderClientOnly>
  );
};

const Container = styled.div``;

export default IndexPage;
