import { Link } from 'gatsby';
import React from 'react';
import styled from 'styled-components';
import { CombinationLogo } from '@/components';
import { Spacing } from '@/constants';

type Props = {
  siteTitle: string;
};

export const Header: React.FC<Props> = () => (
  <>
    <Content>
      <Heading>
        <StyledLink to="/">
          <SiteLogo>
            <CombinationLogo />
          </SiteLogo>
        </StyledLink>
      </Heading>
    </Content>
  </>
);

const Content = styled.header`
  margin: ${Spacing.XX_LARGE}px;
`;

const Heading = styled.h1``;

const SiteLogo = styled.h1`
  width: 80px;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
`;

export default Header;
