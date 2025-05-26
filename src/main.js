import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
  showLoadMoreButton,
  hideLoadMoreButton,
} from './js/render-functions.js';

import { getImagesByQuery } from './js/pixabay-api.js';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('#search-form');
const loadMoreBtn = document.querySelector('.load-more');

let query = '';
let page = 1;
let totalHits = 0;
let loadedImages = 0;

form.addEventListener('submit', async e => {
  e.preventDefault();
  query = e.target.elements.searchQuery.value.trim();
  if (!query) return;

  page = 1;
  clearGallery();
  hideLoadMoreButton();
  showLoader();

  try {
    const data = await getImagesByQuery(query, page);
    totalHits = data.totalHits;
    loadedImages = data.hits.length;

    if (data.hits.length === 0) {
      iziToast.warning({
        message: 'No images found. Try a different keyword.',
        position: 'topRight',
      });
      return;
    }

    createGallery(data.hits);

    if (totalHits > loadedImages) {
      showLoadMoreButton();
    }
  } catch (error) {
    iziToast.error({
      message: 'Error loading images. Please try again.',
      position: 'topRight',
    });
  } finally {
    hideLoader();
  }
});

loadMoreBtn.addEventListener('click', async () => {
  page += 1;
  showLoader();

  try {
    const data = await getImagesByQuery(query, page);
    loadedImages += data.hits.length;
    createGallery(data.hits);

    smoothScroll();

    if (loadedImages >= totalHits) {
      hideLoadMoreButton();
      iziToast.info({
        message: "We're sorry, but you've reached the end of search results.",
        position: 'topRight',
      });
    }
  } catch (error) {
    iziToast.error({
      message: 'Error loading more images.',
      position: 'topRight',
    });
  } finally {
    hideLoader();
  }
});

function smoothScroll() {
  const { height: cardHeight } = document
    .querySelector('.gallery a')
    .getBoundingClientRect();
  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}
