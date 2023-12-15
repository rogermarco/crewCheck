import reel from '../assets/film-reel.svg';

function Loading () {
  return ( 
    <img src={reel}
    className='m-auto w-20 h-20 text-white animate-spin fill-black'
    />
   );
}

export default Loading;