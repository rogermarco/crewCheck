import { v4 as uuidv4 } from 'uuid';

function Results({ resultOne, resultTwo, matches }) {

  const IMDB_URL = 'https://www.imdb.com';  
  
  return (
    <main>
      {matches.length > 0 ?
      <>
      <p className='text-center pb-2 border-b'>It appears that {resultOne.base.name} and {resultTwo.base.name} could have crossed paths in these productions:</p>
      <div className='grid sm:grid-cols-2 lg:grid-cols-3'>
      {matches.map((outer) => {
        return (
          <div key={uuidv4()} className='max-w-fit m-auto'>
            <div className='text-xl font-bold text-center underline'><a href={`${IMDB_URL}${outer[0].id}`}>{outer[0].title}</a></div>
            <p className='text-center'>{resultOne.base.name.split(' ')[0]} worked as <i>{outer[0].job || outer[0].category}</i></p>
            <p className='text-center pb-2 border-b'>{resultTwo.base.name.split(' ')[0]} worked as <i>{outer[1].job || outer[1].category}</i></p>
          </div>
        )
      })}
      </div>
      </>
      :
      <p className='text-center'>It doesn't look like {resultOne.base.name} and {resultTwo.base.name} have ever crossed paths!</p>
      }
    </main>
  );
}

export default Results;