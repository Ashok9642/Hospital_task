import React from 'react';
import Navbar from '../Pages/Navbar';

const PrivateLayout = ({ children }) => {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
};

export default PrivateLayout;
