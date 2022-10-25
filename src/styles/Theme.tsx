const colors = {
  primary: '#FFCB7C',
  secondary1: '#D7B076',
  secondary2: '#BFDAF3',
  black: '#342E21',
  white: '#FFFFFF',
  grey1: '#9A958B',
  grey2: '#BBB7B0',
  grey3: '#CFCCC4',
  grey4: '#E5E4E0',
  grey5: '#F2F2F0',
  warning: '#DE5C5C',
  notice1: '#F98A67',
  notice2: '#94CD8A',
} as const;

const fontSize = {
  header01: '1.25rem',
  header02: '1.125rem',
  body01: '1rem',
  body02: '0.875rem',
  badge01: '0.8rem',
  badge02: '0.75rem',
} as const;

const fontWeight = {
  bold: 700,
  regular: 400,
  light: 300,
} as const;

const lineHeight = {
  lh26: '1.6rem',
  lh24: '1.5rem',
  lh22: '1.4rem',
  lh20: '1.25rem',
} as const;

export type ColorTypes = typeof colors;
export type FontSizeTypes = typeof fontSize;
export type FontWeightTypes = typeof fontWeight;
export type LineHeightTypes = typeof lineHeight;

const DefaultTheme = {
  colors,
  fontSize,
  fontWeight,
  lineHeight,
};

export default DefaultTheme;
