function App() {
  return (
    <main className="w-4/5 m-auto">
      <section>
        <p>
          Drop one imdb <strong>nm parameter</strong> from a link (ex:
          imdb/name/<strong>nm1234567</strong>) in each box to compare the two. 
        </p>
        <p>Matches will be shown below.</p>
        <form>
          <input
            type='text'
            placeholder='First person'
            id='nameOne'
            name='nameOne'
          ></input>
          <input
            type='text'
            placeholder='Second person'
            id='nameTwo'
            name='nameTwo'
          ></input>
          <button type='submit'>Compare!</button>
        </form>
      </section>
    </main>
  );
}

export default App;
