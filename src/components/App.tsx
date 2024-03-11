import React, { useContext } from 'react';
import { ItemsContext } from '../context';
import List from './List';
import NewItem from './NewItem';

function App() {
  const { items } = useContext(ItemsContext);
  return (
    <main className="main-margin">
      <h1>Travel Packing List</h1>
      <NewItem />
      <List items={items} />
    </main>
  );
}

export default App;
