import axios, { AxiosResponse } from 'axios';
import { FilmData } from '../types';
const API_KEY = import.meta.env.VITE_API_KEY;

export const apiCall = async (name: string) => {
  const { data }: AxiosResponse<FilmData> = await axios.get(
    'https://online-movie-database.p.rapidapi.com/actors/get-all-filmography',
    {
      params: {
        nconst: `${name}`,
      },
      headers: {
        'X-RapidAPI-Key': API_KEY,
        'X-RapidAPI-Host': 'online-movie-database.p.rapidapi.com',
      },
    }
  );
  console.log(data);
  
  return data;
};
