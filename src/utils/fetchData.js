export const exerciseOptions = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com',
    'X-RapidAPI-Key': '',
  },
};

export const youtubeOptions = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Host': 'youtube-search-and-download.p.rapidapi.com',
    'X-RapidAPI-Key': '',
  },
};

export const quotesOption = {
  method: 'GET',
  url: 'https://bodybuilding-quotes1.p.rapidapi.com/quotes',
  params: {page: '5'},
  headers: {
    'X-RapidAPI-Host': 'bodybuilding-quotes1.p.rapidapi.com',
    'X-RapidAPI-Key': '',
  }
};



export const fetchData = async (url, options) => {
  const res = await fetch(url, options);
  const data = await res.json();

  return data;
};
