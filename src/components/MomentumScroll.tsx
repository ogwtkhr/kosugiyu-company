import React, { useState, useEffect, useRef } from 'react';
import { ValueOf } from '@/types';
import styled, { createGlobalStyle, css } from 'styled-components';
import { window } from '@/util/window';
import { initial } from 'lodash';

// 参考
// https://qiita.com/nishinoshake/items/f6cbe1cc81d1c179cf0d

const DirectionType = {
  VERTICAL: 'vertical',
  HORIZONTAL: 'horizontal',
  HORIZONTAL_REVERSE: 'horizontal-reverse',
} as const;

const getScrollY = () => window.scrollY || window.pageYOffset;

type DirectionType = ValueOf<typeof DirectionType>;

type MomentumScrollProps = {
  smooth?: boolean;
  speed?: number;
  fuzzy?: number;
  direction?: DirectionType;
};

export const MomentumScroll: React.FC<MomentumScrollProps> = ({
  smooth,
  speed = 0.1,
  fuzzy = 0.5,
  direction = DirectionType.VERTICAL,
  children,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [destination, setDestination] = useState<number>(getScrollY());
  const [bodyHeight, setBodyHeight] = useState<number | undefined>(undefined);
  const [before, setBefore] = useState<number>(0);

  const isVertical = () => direction === DirectionType.VERTICAL;

  let next: number;
  if (smooth) {
    next = Math.round(before + (destination - before) * speed);
    if (Math.abs(destination - next) <= fuzzy) next = destination;
  } else {
    next = destination;
  }

  // resize
  const setBodySize = () => {
    const vertical = isVertical();
    const rawContentLength = vertical ? ref.current?.clientHeight : ref.current?.clientWidth;
    if (rawContentLength && rawContentLength !== bodyHeight) {
      setBodyHeight(
        vertical ? rawContentLength : rawContentLength - window.innerWidth + window.innerHeight,
      );
    }
  };

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
      setDestination(getScrollY);
    });

    window.addEventListener('resize', () => {
      setBodySize();
    });

    setBodySize();
    return () => {
      window.document.body.style.height = 'initial';
    };
  }, []);

  useEffect(() => {
    if (bodyHeight) window.document.body.style.height = `${bodyHeight}px`;
  }, [bodyHeight]);

  useEffect(() => {
    if (destination !== next) {
      window.requestAnimationFrame(() => {
        setBefore(next);
      });
    }
  }, [next, destination]);

  return (
    <>
      <GlobalStyle />
      <Container ref={ref} style={nextStyle} direction={direction}>
        {children}
      </Container>
    </>
  );
};

type ContainerProps = {
  direction: DirectionType;
};

const Container = styled.div<ContainerProps>`
  position: fixed;
  top: 0;
  will-change: transform;
  ${({ direction }) =>
    direction === DirectionType.HORIZONTAL
      ? css`
          right: 0;
        `
      : css`
          left: 0;
        `};
`;

const GlobalStyle = createGlobalStyle`
  body {
    -ms-overflow-style: none;
    scrollbar-width: none;
    overscroll-behavior: none;

    &::-webkit-scrollbar {
      display:none;
    }
  }
`;

export default GlobalStyle;
