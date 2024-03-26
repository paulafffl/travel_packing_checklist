import List from './List';
import AddSection from './AddSection';

function App() {
  return (
    <div className="outer-margin">
      <header>
        <h1>{`🧳Travel Packing\u00A0Checklist`}</h1>
      </header>
      <main>
        <AddSection />
        <div className="flex flex-col gap-x-10 md:flex-row">
          <List title="Unpacked Items" />
          <List title="Packed Items" />
        </div>
      </main>
      <footer>
        Built by
        <a
          className="ml-1 underline"
          href="https://www.linkedin.com/in/paulafernandeslima/"
          target="_blank"
          rel="noreferrer"
        >
          Paula Lima
        </a>
        , with ❤️
      </footer>
    </div>
  );
}

export default App;
