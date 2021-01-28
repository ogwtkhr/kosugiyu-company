import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import { TopPageInfoQuery } from '@/types';
import styled, { css } from 'styled-components';
import {
  BigSpacing,
  Colors,
  Spacing,
  TextSize,
  TextWeight,
  TypographyMixin,
  TypeFace,
  ScreenType,
} from '@/constants';
import { Picture } from '@/components';
import { getTextBreakFragment } from '@/util/jsx';
import media from 'styled-media-query';

export const TopContent: React.FC = () => {
  const data = useStaticQuery<TopPageInfoQuery>(graphql`
    query TopPageInfo {
      settingYaml {
        statement {
          title
          body
        }
        companyInfo {
          title
          description
        }
      }
    }
  `);

  const mainTitle = data.settingYaml?.statement?.title || '';
  const mainArticle = data.settingYaml?.statement?.body?.map((paragraph = '') => paragraph) || [];
  const companyInfo =
    data.settingYaml?.companyInfo?.map((info) => ({
      title: info?.title || '',
      description: info?.description || '',
    })) || [];
  return (
    <MainContent>
      <MainMessageContainer>
        <MessageHeading>{mainTitle}</MessageHeading>
        <MainMessage>
          {mainArticle.map((paragraph, index) => (
            <MainMessageParagraph key={index}>
              {getTextBreakFragment(paragraph, /\n/)}
            </MainMessageParagraph>
          ))}
        </MainMessage>
      </MainMessageContainer>
      <HeroImage>
        <Picture relativePath="photos/top/hero.jpg" />
      </HeroImage>
      <CompanyInfo>
        <CompanyInfoList>
          {companyInfo.map(({ title, description }) => (
            <CompanyInfoListItem key={title}>
              <CompanyInfoItem>
                <CompanyInfoTitle>{title}</CompanyInfoTitle>
                <CompanyInfoDescription>{description}</CompanyInfoDescription>
              </CompanyInfoItem>
            </CompanyInfoListItem>
          ))}
        </CompanyInfoList>
      </CompanyInfo>
    </MainContent>
  );
};

const MainContent = styled.div`
  ${({ theme }) =>
    theme.isNormalScreen
      ? css`
          display: flex;
          flex-direction: row-reverse;
        `
      : css``};
`;

const NORMAL_GUTTER = 14;

const MainMessageContainer = styled.div`
  ${({ theme }) =>
    theme.isNormalScreen
      ? css`
          display: flex;
          flex-direction: row-reverse;
          margin-right: ${NORMAL_GUTTER}vh;
        `
      : css`
          margin: ${BigSpacing.SMALL}px ${Spacing.X_LARGE}px ${BigSpacing.X_SMALL}px;
        `};
`;

const MessageHeading = styled.h1`
  font-weight: 500;
  letter-spacing: 0.2em;
  ${({ theme }) =>
    theme.isNormalScreen
      ? css`
          margin-top: 10vh;
          margin-left: 6vh;
          font-size: 2.4vh;
          ${TypographyMixin.VERTICAL_WRITING};
        `
      : css`
          font-size: ${TextSize.X_LARGE}rem;
        `};
`;

const MainMessage = styled.article`
  ${({ theme }) =>
    theme.isNormalScreen
      ? css`
          height: ${(420 / 800) * 100}vh;
          margin-top: ${NORMAL_GUTTER}vh;
          ${TypographyMixin.VERTICAL_WRITING};
        `
      : css`
          margin: ${Spacing.XX_LARGE}px 0;
          font-size: ${TextSize.SMALL}rem;
        `};
`;

const MainMessageParagraph = styled.p`
  & + & {
    margin-right: 4vh;
  }

  ${media.lessThan(ScreenType.MEDIUM)`
  & + & {
    margin-right: 0;
    margin-top: ${Spacing.XX_LARGE}px;
    }
  `};
  ${({ theme }) =>
    theme.isNormalScreen
      ? css`
          font-size: 1.9vh;
          letter-spacing: 0.15em;
        `
      : css``};
`;

const HeroImage = styled.div`
  ${({ theme }) =>
    theme.isNormalScreen
      ? css`
          width: 360px;
          height: 100vh;
          margin-right: ${NORMAL_GUTTER}vh;
        `
      : css`
          width: 100%;
          height: 240px;
        `};
`;

const CompanyInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  ${({ theme }) =>
    theme.isNormalScreen
      ? css`
          height: 100vh;
          padding-right: ${NORMAL_GUTTER}vh;
          padding-left: ${NORMAL_GUTTER}vh;
        `
      : css`
          margin-top: ${BigSpacing.X_SMALL}px;
          margin-bottom: ${BigSpacing.X_SMALL}px;
        `};
`;

const CompanyInfoList = styled.ul`
  min-width: 240px;
`;

const CompanyInfoListItem = styled.li``;

const CompanyInfoItem = styled.dl`
  display: flex;
  align-items: center;
  color: ${Colors.UI_TEXT_WEAKEN};
  font-family: ${TypeFace.SANS_SERIF};
  font-size: ${TextSize.X_SMALL}rem;
`;

const CompanyInfoTitle = styled.dt`
  min-width: 100px;
  font-weight: ${TextWeight.BOLD};
`;

const CompanyInfoDescription = styled.dd`
  font-weight: ${TextWeight.MEDIUM};
`;
