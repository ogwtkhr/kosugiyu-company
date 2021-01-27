import React, { useState, useEffect, useRef } from 'react';
import { BaseLayout, Meta } from '@/layouts';
import { graphql, useStaticQuery } from 'gatsby';
import { StatementQuery } from '@/types';

import styled from 'styled-components';
import { Spacing } from '@/constants';
import { MomentumScroll } from '@/components';

const IndexPage: React.FC = () => {
  const [isShowMenu, setIsShowMenu] = useState<boolean>(false);

  const data = useStaticQuery<StatementQuery>(graphql`
    query Statement {
      settingYaml {
        statement
      }
    }
  `);

  const mainArticle = data.settingYaml?.statement?.map((paragraph) => paragraph || '') || [];

  return (
    <>
      <BaseLayout>
        <Meta />
        <Container>
          <MomentumScroll direction="horizontal">
            <MainMessageContainer>
              <MessageHeading>山路を登りながら</MessageHeading>
              <MainMessage>
                {mainArticle.map((paragraph, index) => (
                  <MainMessageParagraph key={index}>{paragraph}</MainMessageParagraph>
                ))}
              </MainMessage>
            </MainMessageContainer>
          </MomentumScroll>
        </Container>
      </BaseLayout>
    </>
  );
};

const Container = styled.div``;

const ScrollContent = styled.div`
  position: fixed;
  right: 0;
`;

const MainMessageContainer = styled.div`
  /* width: 300px; */
  display: flex;
  flex-direction: row-reverse;
  margin-right: 14vh;
`;

const MessageHeading = styled.h1`
  margin-top: 10vh;
  margin-left: 6vh;
  font-size: 2.4vh;
  letter-spacing: 0.2em;
  text-orientation: upright;
  writing-mode: vertical-rl;
  font-weight: bold;
`;

const MainMessage = styled.article`
  height: ${(420 / 800) * 100}vh;
  margin-top: 15vh;
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

export default IndexPage;
