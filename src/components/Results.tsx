import { Matches } from '../types';

interface Props {
  data: Matches;
}

function Results(data: Props) {
  const IMDB_URL = 'https://www.imdb.com';

  const indefiniteArticle = (word: string) => {
    const lowWord = word.toLowerCase();
    return ['a', 'e', 'i', 'o', 'u'].includes(lowWord.charAt(0))
      ? ' an '
      : ' a ';
  };

  return (
    <main>
      {data.data.matches.length > 0 ? (
        <>
          <p className='text-center pb-2 border-b'>
            It appears that {data.data.nameOne} and {data.data.nameTwo} could
            have crossed paths in these productions:
          </p>
          <div className='grid sm:grid-cols-2 lg:grid-cols-3'>
            {data.data.matches.map((outer) => {
              return (
                <div key={outer[0].id} className='max-w-fit m-auto'>
                  <div className='text-xl font-bold text-center underline'>
                    <a href={`${IMDB_URL}${outer[0].id}`} target='_blank'>
                      {outer[0].title}
                    </a>
                  </div>
                  <p className='text-center'>
                    {data.data.nameOne.split(' ')[0]} worked as
                    {indefiniteArticle(outer[0].job || outer[0].category)}
                    <i>{outer[0].job || outer[0].category}</i>
                  </p>
                  <p className='text-center pb-2 border-b'>
                    {data.data.nameTwo.split(' ')[0]} worked as
                    {indefiniteArticle(outer[0].job || outer[0].category)}
                    <i>{outer[1].job || outer[1].category}</i>
                  </p>
                </div>
              );
            })}
          </div>
        </>
      ) : (
        <p className='text-center'>
          It doesn't look like {data.data.nameOne} and {data.data.nameTwo} have
          ever crossed paths!
        </p>
      )}
    </main>
  );
}

export default Results;
