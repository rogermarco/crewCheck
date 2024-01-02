export interface Films {
  [
    category: String,
    job?: String,
    characters?: String[],
    roles?: String[],
    id: String,
    image: {
      height: Number;
      id: String;
      url: String;
      width: Number;
    },
    status: String,
    title: String,
    titleType: String,
    year: Number,
  ];
}

export interface FilmData {
  id: String;
  base: {
    '@type': String;
    id: String;
    legacyNameText: String;
    name: String;
  };
  filmography: Films[];
}
