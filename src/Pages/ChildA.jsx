import axios from 'axios';
import React, { useEffect, useState } from 'react';

const ChildA = React.memo(({ sendData, Increment }) => {
  const [search, setSearch] = useState('');
  const [dataa, setData] = useState([]);

  useEffect(() => {
    let timer = setTimeout(() => {
      console.log('Search', search);
    }, 500);
    return () => clearTimeout(timer);
  }, [search]);
  useEffect(() => {
    const fetchdata = async () => {
      try {
        let data_details = await axios.get('https://jsonplaceholder.typicode.com/posts');
        setData(data_details.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchdata();
  }, []);
  return (
    <div>
      <h1>ChildA</h1>
      <button onClick={() => sendData('Hello From A')}>Send Data</button>
      <button onClick={Increment}>Child Increment</button>
      <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} />
      <ul>
        {dataa.map((item) => (
          <li key={item.id}>{item.title}</li>
        ))}
      </ul>
    </div>
  );
});

export default ChildA;
