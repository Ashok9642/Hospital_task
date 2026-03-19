import { useState } from 'react';
import './App.css';
import Hospital from './Hospital.js/Hospital';

function App() {
  const [value, setvalue1] = useState(0);
  return (
    <div className="App">
      <Hospital />
    </div>
  );
}

export default App;
