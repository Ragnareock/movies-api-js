function serviceMove(page = 1) {
  const BASE_URL = 'https://api.themoviedb.org/3';
  const END_POINT = '/trending/movie/week';
  const API_KEY = 'b252a3be4f66a1920a26a286abc3ccbf';

  return fetch(`${BASE_URL}${END_POINT}?api_key=${API_KEY}&page=${page}`).then(
    response => {
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      return response.json();
    }
  );
}

export { serviceMove };
