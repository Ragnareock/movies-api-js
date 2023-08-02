import { serviceMove } from './js/movies-api';
import { createMarkup } from './js/cardMarkup';

// const containerEl = document.querySelector('.js-move-list');
// const loadEl = document.querySelector('.js-load-more');

// let page = 1;
// loadEl.addEventListener('click', onLoadMore);

// function onLoadMore() {
//   page += 1;
//   serviceMove(page).then(data => {
//     containerEl.insertAdjacentHTML('beforeend', createMarkup(data.results));
//     if (data.page >= data.total_pages) {
//       loadEl.hidden = true;
//     }
//   });
// }

// serviceMove()
//   .then(data => {
//     console.log(data);
//     containerEl.insertAdjacentHTML('beforeend', createMarkup(data.results));
//     if (data.page < data.total_pages) {
//       loadEl.hidden = false;
//     }
//   })
//   .catch(error => console.log(error));

const containerEl = document.querySelector('.js-move-list');
const guardEl = document.querySelector('.js-guard');
const loaderEl = document.querySelector('.loader');

const options = {
  root: null,
  rootMargin: '300px',
  threshold: 0,
};

const observer = new IntersectionObserver(handlerPagination, options);
let page = 1;

function handlerPagination(entries, observer) {
  console.log(entries);
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      page += 1;
      loaderEl.hidden = false;
      serviceMove(page)
        .then(data => {
          containerEl.insertAdjacentHTML(
            'beforeend',
            createMarkup(data.results)
          );
          if (data.page >= data.total_pages) {
            observer.unobserve(entry.target);
          }
        })
        .catch(error => console.log(error))
        .finally(() => (loaderEl.hidden = true));
    }
  });
}

serviceMove()
  .then(data => {
    containerEl.insertAdjacentHTML('beforeend', createMarkup(data.results));
    if (data.page < data.total_pages) {
      observer.observe(guardEl);
    }
  })
  .catch(error => (location.href = './error.html'));
