export interface Films {
  category: string,
  job?: string,
  characters?: string[],
  roles?: string[],
  id: string,
  image: {
    height: number;
    id: string;
    url: string;
    width: number;
  },
  status: string,
  title: string,
  titleType: string,
  year: number,
  episodeNumber?: string,
  releaseDate?: string,
  seasonNumber?: string,
}

export interface FilmData {
  id: string;
  base: {
    '@type': string;
    id: string;
    legacyNameText: string;
    name: string;
  };
  filmography: Films[];
}
