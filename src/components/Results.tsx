import { useEffect, useState } from "react";
import { v4 as uuidv4 } from 'uuid'; 

function Results(result: any) {
  const [categoryList, setCategoryList] = useState({})
  console.log(result);
  
  useEffect(() => {
    const filmArray = result.result.filmography;
    const list = {};
    for (const index of filmArray) {
      list[index.category] = list[index.category] ? list[index.category] + 1 : 1;
    }
    setCategoryList(list)
  }, []);

  return (
    <section>
      {result.result.base && (
        <>
          <div>{result.result.base.name}</div>
          <div>
            {result.result.filmography.map((data) => {
              return (
                <div key={uuidv4()}>
                  <span>{data.title}</span> -&nbsp;
                  <span className='capitalize'>
                    {data.job || data.category}
                  </span>
                  <br />
                </div>
              );
            })}
          </div>
        </>
      )}
    </section>
  );
}

export default Results;

  // for (let i = 0; i < filmArray.length; i++) {
  //   if (categoryList.indexOf(filmArray[i].category) === -1) {
  //     categoryList.push(filmArray[i].category);
  //   }
  // }

  // Works
  // const uniqueEntries = Array.from(new Set(filmArray.map(a => a.id))).map(id => filmArray.find(a => a.id === id));
  // console.log(uniqueEntries);