import ListsSection from './ListsSection';
import AddSection from './AddSection';

function App() {
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
          <ListsSection title="Unpacked Items" />
          <ListsSection title="Packed Items" />
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
