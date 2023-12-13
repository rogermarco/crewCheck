function Results(result: any) {
  return (
    <section>
      {result.result.base && (
        <>
          <div>{result.result.base.name}</div>
          <div>
            {result.result.filmography.map((data) => {
              return (
                <>
                <span>{data.title}</span> - 
                <span className='capitalize'>{data.job}</span><br />
                </>
              );
            })}
          </div>
        </>
      )}
    </section>
  );
}

export default Results;
