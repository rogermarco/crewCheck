import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

function Results({ resultOne, resultTwo, matches }) {

  const IMDB_URL = 'https://www.imdb.com';
  
  return (
    <main>
      <p className='text-center'>It seems like {resultOne.base.name} and {resultTwo.base.name} may have crossed paths in these productions:</p>
      {matches.map((outer) => {
        return (
          <div key={uuidv4()} className='border-y py-2'>
            <div className='text-xl font-bold text-center'><a href={`${IMDB_URL}${outer[0].id}`}>{outer[0].title}</a></div>
            <p className='text-center'>{resultOne.base.name.split(' ')[0]} worked as {outer[0].job || outer[0].category}</p>
            <p className='text-center'>{resultTwo.base.name.split(' ')[0]} worked as {outer[1].job || outer[0].category}</p>
          </div>
        )
      })}
    </main>
  );
}

export default Results;


  //   const filmArray = resultOne.result.filmography;
  //   const list = {};
  //   for (const index of filmArray) {
  //     list[index.category] = list[index.category] ? list[index.category] + 1 : 1;
  //   }
  //   setCategoryList(list)


  /*
  const idArrayOne = resultOne.filmography.map(a => a.id);
  const idArrayTwo = resultTwo.filmography

  const badCategories = ['archive_footage', 'self', 'thanks', 'soundtrack']
  const test = idArrayTwo.filter(({ id }) => idArrayOne.includes(id)).filter(({ category }) => !badCategories.includes(category)).map(a => a.id);
  */