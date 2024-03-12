import React, { useContext } from 'react';
import { ItemsContext } from '../context';
import List from './List';
import NewItem from './NewItem';

function App() {
  const { packedItems, unpackedItems } = useContext(ItemsContext);
  return (
    <main className="main-margin">
      <h1> 🧳 Travel Packing List</h1>
      <NewItem />
      <div className="flex flex-col gap-x-10 md:flex-row">
        <List title="Unpacked Items" items={unpackedItems} />
        <List title="Packed Items" items={packedItems} />
      </div>
    </main>
  );
}

export default App;
