import React from 'react';
import styled from 'styled-components';
import { Spacing, BigSpacing, TextSize, ScreenType, TypeFace } from '@/constants';
import { CombinationLogo } from '@/components';
import media from 'styled-media-query';
import { Link } from 'gatsby';

export const Footer: React.FC = () => (
  <Container>
    <Inner>
      <FooterText>{new Date().getFullYear()} Kosugiyu, inc.</FooterText>
      <Link to="/">
        <FooterLogo>
          <CombinationLogo />
        </FooterLogo>
      </Link>
    </Inner>
  </Container>
);

const Container = styled.footer`
  position: fixed;
  right: 5vh;
  bottom: 5vh;
`;

const Inner = styled.div`
  display: flex;
  align-items: flex-end;
`;

const FooterLogo = styled.div`
  width: 80px;

  ${media.lessThan(ScreenType.MEDIUM)`
    width: ${BigSpacing.SMALL}px;
  `}
`;

const FooterText = styled.p`
  margin-right: ${Spacing.XXX_LARGE}px;
  font-family: ${TypeFace.SANS_SERIF};
  font-size: ${TextSize.XX_SMALL}rem;
`;

export default Footer;
