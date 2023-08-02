function createMarkup(arr) {
  return arr
    .map(
      ({ poster_path, release_date, original_title, vote_average }) => `
      <li>
        <img src="https://image.tmdb.org/t/p/w300/${poster_path}" alt="${original_title}" />
        <h2>${original_title}</h2>
        <p>${release_date}</p>
        <p>${vote_average}</p>
      </li>`
    )
    .join('');
}

export { createMarkup };
