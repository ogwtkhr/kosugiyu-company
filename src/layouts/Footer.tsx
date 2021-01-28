import React from 'react';
import styled, { css } from 'styled-components';
import { Spacing, TextSize, TypeFace } from '@/constants';
import { CombinationLogo } from '@/components';
import { useTheme } from '@/hooks';
import { Link } from 'gatsby';

export const Footer: React.FC = () => {
  const { isNormalScreen } = useTheme();
  return (
    <Container>
      <Inner>
        <FooterText>© {new Date().getFullYear()} Kosugiyu, inc.</FooterText>
        {isNormalScreen && (
          <StyledLink to="/">
            <CombinationLogo />
          </StyledLink>
        )}
      </Inner>
    </Container>
  );
};

const Container = styled.footer`
  ${({ theme }) =>
    theme.isNormalScreen
      ? css`
          position: fixed;
          right: 5vh;
          bottom: 5vh;
        `
      : css`
          padding: ${Spacing.LARGE}px 0;
        `};
`;

const Inner = styled.div`
  ${({ theme }) =>
    theme.isNormalScreen
      ? css`
          display: flex;
          align-items: flex-end;
        `
      : css``};
`;

const StyledLink = styled(Link)`
  ${({ theme }) =>
    theme.isNormalScreen
      ? css`
          display: block;
          width: 80px;
        `
      : css``};
`;

const FooterText = styled.p`
  ${({ theme }) =>
    theme.isNormalScreen
      ? css`
          margin-right: ${Spacing.XXX_LARGE}px;
          font-family: ${TypeFace.SANS_SERIF};
          font-size: ${TextSize.XX_SMALL}rem;
        `
      : css`
          text-align: center;
          padding: ${Spacing.LARGE}px 0;
        `};
`;

export default Footer;
