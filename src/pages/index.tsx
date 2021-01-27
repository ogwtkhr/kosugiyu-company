import React, { useState, useEffect, useRef } from 'react';
import { BaseLayout, Meta } from '@/layouts';
import { graphql, useStaticQuery } from 'gatsby';
import { StatementQuery } from '@/types';
import style from 'styled-components';

// import HorizontalScroll from 'react-scroll-horizontal'

import styled from 'styled-components';
import { Spacing } from '@/constants';

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
        <MainMessageContainer>
          <MainMessage>
            {mainArticle.map((paragraph, index) => (
              <MainMessageParagraph key={index}>{paragraph}</MainMessageParagraph>
            ))}
          </MainMessage>
        </MainMessageContainer>
      </BaseLayout>
    </>
  );
};

const MainMessageContainer = styled.div`
  /* width: 300px; */
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
