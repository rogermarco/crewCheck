import { useState, ChangeEvent } from 'react';
import clapper from './assets/clapper.svg';
import { apiCall } from './services/ApiService';
import Results from './components/Results';
import Loading from './components/Loading';
import Alert from '@mui/material/Alert';

function App() {
  const [formState, setFormState] = useState({
    nameOne: '',
    nameTwo: '',
  });

  const [resultState, setResultState] = useState({
    callOne: {},
    callTwo: {},
  });

  const [matches, setMatches] = useState();
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

  const comparer = async (one, two) => {
    const idArrayOne = one.filmography;
    const idArrayTwo = two.filmography;

    // Filter out useless categories, and build an array of just IDs
    const badCategories = ['archive_footage', 'self', 'thanks', 'soundtrack'];
    const idMatches = await idArrayTwo
      .filter(({ id }) => idArrayOne.map((entry) => entry.id).includes(id))
      .filter(({ category }) => !badCategories.includes(category))
      .map((entry) => entry.id);
    // Build two more arrays from the originals filtered by the idMatches array
    const filmOneMatches = idArrayOne
      .filter((film) => idMatches.includes(film.id))
      .filter(({ category }) => !badCategories.includes(category));
    const filmTwoMatches = idArrayTwo
      .filter((film) => idMatches.includes(film.id))
      .filter(({ category }) => !badCategories.includes(category));
    // Combine the two above arrays into one where each index contains the movie object that is associated with each person
    const finalArray = [];
    for (let i = 0; i < filmOneMatches.length; i++) {
      for (let j = 0; j < filmTwoMatches.length; j++) {
        if (filmOneMatches[i].id === filmTwoMatches[j].id) {
          finalArray.push([filmOneMatches[i], filmTwoMatches[j]]);
        }
      }
    }
    setMatches(finalArray);
  };

  const handleClick = async () => {
    try {
      if (!formState.nameOne || !formState.nameTwo) {
        setAlertMessage('Hey! Add a second person to compare with.');
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

      setResultState({ callOne: resOne, callTwo: resTwo });
      setLoading(false);
      setAlert(false);
    } catch (error) {
      console.log(error);
      setAlert(true);
      setLoading(false);
      setResultState({
        callOne: {},
        callTwo: {},
      });
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
        ) : resultState.callOne.id && resultState.callTwo.id ? (
          <Results
            resultOne={resultState.callOne}
            resultTwo={resultState.callTwo}
            matches={matches}
          />
        ) : (
          <></>
        )}
      </section>
    </main>
  );
}

export default App;
