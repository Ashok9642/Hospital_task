import React from 'react';

const Child = React.memo(({ SendData }) => {
  console.log('Child Rendered');

  return (
    <div>
      <h1>Hello</h1>
      <button onClick={() => SendData('Hello Parent')}>Send Data</button>
    </div>
  );
});
export default Child;
