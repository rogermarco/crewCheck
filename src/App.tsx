import { useState, ChangeEvent } from 'react';
import clapper from './assets/clapper.svg';
import { apiCall } from './services/ApiService';
import Results from './components/Results';

function App() {
  const [formState, setFormState] = useState({
    nameOne: '',
    nameTwo: '',
  });

  const [resultState, setResultState] = useState({
    callOne: {},
    callTwo: {},
  });

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleClick = async () => {
    try {
      const trimmedNameOne = formState.nameOne.match(/nm\d*/g)!.join();
      const trimmedNameTwo = formState.nameTwo.match(/nm\d*/g)!.join();
      const resOne = await apiCall(trimmedNameOne);
      const resTwo = await apiCall(trimmedNameTwo);

      setResultState({callOne: resOne, callTwo: resTwo})
    } catch (error) {
      console.log(error);
      alert('something went wrong with the form submission');
    }
  };

  return (
    <main className='w-[90%] m-auto'>
      <section>
        <p className='text-center mt-5'>
          Drop a person's full imdb link (or just the nm string from the URL) in
          each box to compare the two to see if they have worked together
          before.
        </p>
        <p className='text-center'>
          Hit the clapper and any matches will be shown below!
        </p>
        <form>
          <div className='flex flex-col lg:flex-row'>
            <input
              type='text'
              placeholder='First person'
              name='nameOne'
              value={formState.nameOne}
              onChange={handleChange}
              className='input-box'
            ></input>
            <input
              type='text'
              placeholder='Second person'
              name='nameTwo'
              value={formState.nameTwo}
              onChange={handleChange}
              className='input-box'
            ></input>
          </div>
          <img
            src={clapper}
            className='transition ease-in-out hover:scale-105 h-auto w-2/5 m-auto mt-5 cursor-pointer'
            onClick={handleClick}
          />
        </form>
      </section>
      {resultState.callOne.id && resultState.callTwo.id &&
        <section>
          <Results result={resultState.callOne} />
          <Results result={resultState.callTwo} />
        </section>
      }
    </main>
  );
}

export default App;
