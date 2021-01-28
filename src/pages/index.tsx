import React from 'react';
import { BaseLayout, Meta } from '@/layouts';
import { useScreenThreshold } from '@/hooks';

import styled from 'styled-components';
import { MomentumScroll, TopContent } from '@/components';

const IndexPage: React.FC = () => {
  const { overThreshold: isNormalScreen } = useScreenThreshold();
  return (
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
  );
};

const Container = styled.div``;

export default IndexPage;
