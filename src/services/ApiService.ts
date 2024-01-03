import axios, { AxiosResponse } from 'axios';
import { FilmData } from '../types';

export const apiCall = async (name: string) => {
  const { data }: AxiosResponse<FilmData> = await axios.get(
    'https://online-movie-database.p.rapidapi.com/actors/get-all-filmography',
    {
      params: {
        nconst: `${name}`,
      },
      headers: {
        'X-RapidAPI-Key': 'f01412cab9msh1c6fef97f94e6cdp1bcbc2jsn382a762579e9',
        'X-RapidAPI-Host': 'online-movie-database.p.rapidapi.com',
      },
    }
  );
  console.log(data);
  
  return data;
};
