export const exerciseOptions = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com',
    'X-RapidAPI-Key': '9b4e8da4e0msh4e8f304113b52e5p1e2beajsn9ca950eddec5',
  },
};

export const youtubeOptions = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Host': 'youtube-search-and-download.p.rapidapi.com',
    'X-RapidAPI-Key': '9b4e8da4e0msh4e8f304113b52e5p1e2beajsn9ca950eddec5',
  },
};

export const quotesOption = {
  method: 'GET',
  url: 'https://bodybuilding-quotes1.p.rapidapi.com/quotes',
  params: {page: '5'},
  headers: {
    'X-RapidAPI-Host': 'bodybuilding-quotes1.p.rapidapi.com',
    'X-RapidAPI-Key': 'c4f5254226msh10570caa9c1f5f8p1def93jsnb6055c72ecd0',
  }
};




export const fetchData = async (url, options) => {
  const res = await fetch(url, options);
  const data = await res.json();

  return data;
};
