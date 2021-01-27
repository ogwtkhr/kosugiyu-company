import React, { useState, useEffect, useRef } from 'react';
import { BaseLayout, Meta } from '@/layouts';
import { graphql, useStaticQuery } from 'gatsby';
import { TopPageInfoQuery } from '@/types';

import styled from 'styled-components';
import { Colors, Spacing, TextSize, TypeFace } from '@/constants';
import { MomentumScroll, Picture } from '@/components';

const IndexPage: React.FC = () => {
  const [isShowMenu, setIsShowMenu] = useState<boolean>(false);

  const data = useStaticQuery<TopPageInfoQuery>(graphql`
    query TopPageInfo {
      settingYaml {
        statement
        companyInfo {
          title
          description
        }
      }
    }
  `);

  const mainArticle = data.settingYaml?.statement?.map((paragraph = '') => paragraph) || [];
  const companyInfo =
    data.settingYaml?.companyInfo?.map((info) => ({
      title: info?.title || '',
      description: info?.description || '',
    })) || [];

  return (
    <>
      <BaseLayout>
        <Meta />
        <Container>
          <MomentumScroll direction="horizontal" smooth>
            <MainContent>
              <MainMessageContainer>
                <MessageHeading>山路を登りながら</MessageHeading>
                <MainMessage>
                  {mainArticle.map((paragraph, index) => (
                    <MainMessageParagraph key={index}>{paragraph}</MainMessageParagraph>
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
          </MomentumScroll>
        </Container>
      </BaseLayout>
    </>
  );
};

const Container = styled.div``;

const MainContent = styled.div`
  display: flex;
  flex-direction: row-reverse;
`;

const NORMAL_GUTTER = 14;

const MainMessageContainer = styled.div`
  /* width: 300px; */
  display: flex;
  flex-direction: row-reverse;
  margin-right: ${NORMAL_GUTTER}vh;
`;

const MessageHeading = styled.h1`
  margin-top: 10vh;
  margin-left: 6vh;
  font-size: 2.4vh;
  font-weight: bold;
  letter-spacing: 0.2em;
  text-orientation: upright;
  writing-mode: vertical-rl;
`;

const MainMessage = styled.article`
  height: ${(420 / 800) * 100}vh;
  margin-top: ${NORMAL_GUTTER}vh;
  text-orientation: upright;
  writing-mode: vertical-rl;
`;

const MainMessageParagraph = styled.p`
  font-size: 1.9vh;
  letter-spacing: 0.15em;
  & + & {
    margin-right: 4vh;
  }
`;

const HeroImage = styled.div`
  width: 360px;
  height: 100vh;
  margin-right: ${NORMAL_GUTTER}vh;
`;

const CompanyInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  padding-right: ${NORMAL_GUTTER}vh;
  padding-left: ${NORMAL_GUTTER}vh;
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
  font-weight: bold;
`;

const CompanyInfoDescription = styled.dd``;

export default IndexPage;
