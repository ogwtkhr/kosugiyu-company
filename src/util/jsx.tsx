import React from 'react';

export const getTextBreakFragment = (str: string, separator?: RegExp): JSX.Element[] => {
  const defaultSeparator = /\\n/;
  const array = str.split(separator || defaultSeparator);
  return array.map((textFragment, index) => (
    // eslint-disable-next-line react/no-array-index-key
    <React.Fragment key={index}>
      {textFragment}
      {index < array.length - 1 && <br />}
    </React.Fragment>
  ));
};
