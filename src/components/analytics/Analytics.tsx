import React from 'react';
import { GoogleAnalytics } from './GoogleAnalytics';
import { Hotjar } from './Hotjar';

export const Analytics: React.FC = () => {
  return (
    <>
      <GoogleAnalytics />
      <Hotjar />
    </>
  );
};

export { GoogleAnalytics, Hotjar };
