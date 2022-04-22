import { CSSObject } from '@emotion/react';
import { Theme } from '@mui/material';

export const globalStyles = (theme: Theme): CSSObject => ({
  '&::-webkit-scrollbar': {
    width: '0.4em',
    height: '100%',
  },
  '&::-webkit-scrollbar-track': {
    boxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)',
    webkitBoxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)',
  },
  '&::-webkit-scrollbar-thumb': {
    backgroundColor: theme.palette.primary.main,
  },
  'html, body, #__next': {
    height: '100%',
    padding: 0,
    margin: 0,
    fontFamily:
      'Roboto, -apple-system, BlinkMacSystemFont, Segoe UI,  Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif',
  },
  body: {
    WebkitFontSmoothing: 'antialiased',
    MozOsxFontSmoothing: 'grayscale',
  },
  '*': { boxSizing: 'border-box' },
});
