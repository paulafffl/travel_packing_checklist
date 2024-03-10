import React, { useContext } from 'react';
import List from './List';
import { ItemsContext } from '../context';

function App() {
  const { items } = useContext(ItemsContext);
  return (
    <main>
      <h1>Travel Packing List</h1>
      <List items={items} />
    </main>
  );
}

export default App;
