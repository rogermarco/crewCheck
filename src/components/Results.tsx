import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

function Results({ resultOne, resultTwo, matches }) {

  const idArrayOne = resultOne.filmography;
  const idArrayTwo = resultTwo.filmography;
  
  const badCategories = ['archive_footage', 'self', 'thanks', 'soundtrack']
  const idMatches = idArrayTwo.filter(({ id }) => idArrayOne.map(entry => entry.id).includes(id)).filter(({ category }) => !badCategories.includes(category)).map(entry => entry.id);
  // console.log('IDMATCHES', idMatches);

  const filmOneMatches = idArrayOne.filter(film => idMatches.includes(film.id)).filter(({ category }) => !badCategories.includes(category));
  const filmTwoMatches = idArrayTwo.filter(film => idMatches.includes(film.id)).filter(({ category }) => !badCategories.includes(category));
  // console.log('FILM ONE MATCHES', filmOneMatches);
  // console.log('FILM TWO MATCHES', filmTwoMatches);

  // console.log(filmOneMatches[0].id); //=> returns title
  
  const finalArray = []
  for (let i = 0; i < filmOneMatches.length; i++) {
    for (let j = 0; j < filmTwoMatches.length; j++) {
      if (filmOneMatches[i].id === filmTwoMatches[j].id) {
        finalArray.push([filmOneMatches[i], filmTwoMatches[j]])
      }
    }
  }
  console.log(resultOne.base.name.split(' ')[0]);
  
  // console.log('FINAL ARRAY', finalArray);
  // console.log(finalArray[0][0].title); // => returns title
  // const test = finalArray.map((data) => data.map((nested) => nested.title)) // => returns title
  // console.log(test);

  return (
    <main>
      <p className='text-center'>It seems like {resultOne.base.name} and {resultTwo.base.name} may have crossed paths in these productions:</p>
      {finalArray.map((outer) => {
        return (
          <div className='border-y py-2'>
            <p className='text-xl font-bold text-center'>{outer[0].title}</p>
            <p className='text-center'>{resultOne.base.name.split(' ')[0]} worked as {outer[0].job || outer[0].category}</p>
            <p className='text-center'>{resultTwo.base.name.split(' ')[0]} as {outer[1].job || outer[0].category}</p>
          </div>
        )
      })}
    </main>
  );
}

export default Results;

// Works
// const uniqueEntries = Array.from(new Set(filmArray.map(a => a.id))).map(id => filmArray.find(a => a.id === id));
// console.log(uniqueEntries);

// <section>
//   {result.result.base && (
//     <>
//       <div>{result.result.base.name}</div>
//       <div>
//         {result.result.filmography.map((data) => {
//           return (
//             <div key={uuidv4()}>
//               <span>{data.title}</span> -&nbsp;
//               <span className='capitalize'>
//                 {data.job || data.category}
//               </span>
//               <br />
//             </div>
//           );
//         })}
//       </div>
//     </>
//   )}
// </section>

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