import clapper from './assets/clapper.svg'

function App() {
  return (
    <main className='w-[90%] m-auto'>
      <section>
        <p className='text-center mt-5'>
          Drop a full imdb link in each box to compare the two to see if they have worked together before.
        </p>
        <p className='text-center'>Hit the clapper and any matches will be shown below!</p>
        <form>
          <div className='flex flex-col sm:flex-row'>
            <input
              type='text'
              placeholder='First person'
              id='nameOne'
              name='nameOne'
              className='input-box'
            ></input>
            <input
              type='text'
              placeholder='Second person'
              id='nameTwo'
              name='nameTwo'
              className='input-box'
            ></input>
          </div>
          <img 
          src={clapper}
          className='transition ease-in-out hover:scale-105 h-60 w-auto m-auto mt-5'
          />
        </form>
      </section>
    </main>
  );
}

export default App;
