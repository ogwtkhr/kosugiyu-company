import React from 'react';
import { BaseLayout, Meta } from '@/layouts';
import { useScreenThreshold, useHasMounted } from '@/hooks';

import styled from 'styled-components';
import { MomentumScroll, TopContent } from '@/components';

const IndexPage: React.FC = () => {
  const { overThreshold: isNormalScreen } = useScreenThreshold();
  const hasMounted = useHasMounted();

  // SSRだとレンダリングが変になるのでスキップ
  return hasMounted ? (
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
  ) : null;
};

const Container = styled.div``;

export default IndexPage;
