import ListsSection from './ListsSection';
import AddSection from './AddSection';
import { useContext, useMemo } from 'react';
import { ItemsContext } from '../context';

function App() {
  const { listsObj, listsShown } = useContext(ItemsContext);

  const countItemsInTotal = useMemo(() => {
    const listsShowing = listsShown.map((listKey) => listsObj[listKey] || []);
    return listsShowing.reduce((sum, list) => sum + list.length, 0);
  }, [listsShown]);

  return (
    <div className="main">
      <header>
        <h1>
          <img src="./logo.png" alt="Logo" className="mb-1.5 mr-2 inline-block h-9 w-9" />
          {`Travel Packing\u00A0Checklist`}
        </h1>
      </header>
      <main>
        <AddSection />
        <div className="flex flex-col gap-x-10 md:flex-row">
          <ListsSection title="Unpacked Items" totalItems={countItemsInTotal} />
          <ListsSection title="Packed Items" totalItems={countItemsInTotal} />
        </div>
      </main>
      <footer>
        <p className="flex align-middle">
          <span className="emojiStyle mr-1">🌈</span>
          Built by
          <a
            className="ml-1 underline"
            href="https://www.linkedin.com/in/paulafernandeslima/"
            target="_blank"
            rel="noreferrer"
            aria-label="Credit: Built by Paula Lima, with love - Open author's LinkedIn page in a new window"
          >
            Paula Lima
          </a>
          , with
          <span className="emojiStyle ml-1">❤️</span>
        </p>
      </footer>
    </div>
  );
}

export default App;
