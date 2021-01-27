import React, { useState, useEffect, useRef } from 'react';
import { ValueOf } from '@/types';
import styled, { createGlobalStyle } from 'styled-components';
import { window } from '@/util/window';

const DirectionType = {
  VERTICAL: 'vertical',
  HORIZONTAL: 'horizontal',
  HORIZONTAL_REVERSE: 'horizontal-reverse',
} as const;

const getScrollY = () => window.scrollY || window.pageYOffset;

type DirectionType = ValueOf<typeof DirectionType>;

type MomentumScrollProps = {
  direction?: DirectionType;
};

export const MomentumScroll: React.FC<MomentumScrollProps> = ({
  direction = DirectionType.VERTICAL,
  children,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [baseScrollY, setBaseScrollY] = useState<number>(getScrollY());
  const [bodyHeight, setBodyHeight] = useState<number | undefined>(undefined);

  const isVertical = () => direction === DirectionType.VERTICAL;

  const next = baseScrollY || 0; // TODO,

  // resize
  const setBodySize = () => {
    const rawContentLength = isVertical() ? ref.current?.clientHeight : ref.current?.clientWidth;
    if (rawContentLength !== bodyHeight) {
      setBodyHeight(rawContentLength);
    }
  };

  setBodySize();

  const nextStyle = {
    transform: (() => {
      switch (direction) {
        case DirectionType.HORIZONTAL:
          return `translate3d(${next}px, 0, 0)`;
        case DirectionType.HORIZONTAL_REVERSE:
          return `translate3d(-${next}px, 0, 0)`;
        case DirectionType.VERTICAL:
        default:
          return `translate3d(0, -${next}px, 0)`;
      }
    })(),
  };

  useEffect(() => {
    window.addEventListener('scroll', () => {
      setBaseScrollY(getScrollY);
    });
    setBodySize();
  }, []);

  useEffect(() => {
    if (bodyHeight) window.document.body.style.height = `${bodyHeight}px`;
  }, [bodyHeight]);

  return (
    <>
      <GlobalStyle />
      <Container ref={ref} style={nextStyle}>
        {children}
      </Container>
    </>
  );
};

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
`;

const GlobalStyle = createGlobalStyle`
  body {
    -ms-overflow-style: none;
    scrollbar-width: none;
    overscroll-behavior: none;
    /* overflow: hidden; */

    &::-webkit-scrollbar {
      display:none;
    }
  }
`;

export default GlobalStyle;
