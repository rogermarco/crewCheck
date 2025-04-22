import { useState, ChangeEvent } from 'react';
import clapper from './assets/clapper.svg';
import { apiCall } from './services/ApiService';
import Results from './components/Results';
import Loading from './components/Loading';
import Alert from '@mui/material/Alert';
import { FilmData, Matches } from './types';

function App() {
  const [formState, setFormState] = useState({
    nameOne: '',
    nameTwo: '',
  });

  // const [resultState, setResultState] = useState({
  //   callOne: {},
  //   callTwo: {},
  // });

  const [matches, setMatches] = useState<Matches>();
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const comparer = (one: FilmData, two: FilmData) => {
    const badCategories = ['archive_footage', 'self', 'thanks', 'soundtrack'];

    const filteredOne = one.filmography.filter(
      (entry) => !badCategories.includes(entry.category)
    );
    const filteredTwo = two.filmography.filter(
      (entry) => !badCategories.includes(entry.category)
    );

    // Create a Map to quickly look up film entries by ID for the first person
    const filmMap = new Map(filteredOne.map((entry) => [entry.id, entry]));

    // Find matches and build the final array in one step
    const finalArray = [];

    for (const filmTwo of filteredTwo) {
      const filmOne = filmMap.get(filmTwo.id);
      if (filmOne) {
        finalArray.push([filmOne, filmTwo]);
      }
    }

    setMatches({
      nameOne: one.base.name,
      nameTwo: two.base.name,
      matches: finalArray,
    });
  };

  const handleClick = async () => {
    try {
      if (!formState.nameOne || !formState.nameTwo) {
        setAlertMessage('Hey! Add another person to compare with.');
        throw new Error();
      }
      if (formState.nameOne === formState.nameTwo) {
        setAlertMessage("You can't compare someone to themselves!");
        throw new Error();
      }
      setLoading(true);
      const trimmedNameOne = formState.nameOne.match(/nm\d*/g)!.join();
      const trimmedNameTwo = formState.nameTwo.match(/nm\d*/g)!.join();
      const resOne = await apiCall(trimmedNameOne);
      const resTwo = await apiCall(trimmedNameTwo);
      comparer(resOne, resTwo);

      // setResultState({ callOne: resOne, callTwo: resTwo });
      setLoading(false);
      setAlert(false);
    } catch (error) {
      console.log(error);
      setAlert(true);
      setLoading(false);
      // setResultState({
      //   callOne: {},
      //   callTwo: {},
      // });
    }
  };

  return (
    <main className='w-[90%] m-auto font-mono'>
      <section>
        <p className='text-center mt-5'>
          Drop a person's full imdb link (or just the nm string from the URL) in
          each box to compare the two to see if they have worked together
          before.
        </p>
        <p className='text-center'>
          Hit the clapper and any matches will be shown below!
        </p>
        {alert ? (
          <Alert
            severity='info'
            className='w-fit m-auto mt-1 text-sm border border-blue-300 rounded-lg'
          >
            {alertMessage}
          </Alert>
        ) : (
          <></>
        )}
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
            className='transition ease-in-out hover:scale-105 h-auto w-2/5 max-w-[300px] m-auto my-5 cursor-pointer'
            onClick={handleClick}
          />
        </form>
      </section>
      <section>
        {loading ? (
          <Loading />
        ) : matches?.nameOne ? (
          <Results data={matches} />
        ) : (
          <></>
        )}
      </section>
    </main>
  );
}

export default App;
