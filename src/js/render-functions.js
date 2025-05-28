import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const galleryContainer = document.querySelector('.gallery');
const loader = document.querySelector('.loader');
const loadMoreBtn = document.querySelector('.load-more');

const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

export function createGallery(images) {
  const markup = images
    .map(
      image => `
        <li class="gallery-item">
          <a href="${image.largeImageURL}" class="gallery__item">
            <img class="gallery__image" src="${image.webformatURL}" alt="${image.tags}" />
          </a>
          <div class="info">
            <div class="info-block">
              <p>Likes</p>
              <b>${image.likes}</b>
            </div>
            <div class="info-block">
              <p>Views</p>
              <b>${image.views}</b>
            </div>
            <div class="info-block">
              <p>Comments</p>
              <b>${image.comments}</b>
            </div>
            <div class="info-block">
              <p>Downloads</p>
              <b>${image.downloads}</b>
            </div>
          </div>
        </li>
      `
    )
    .join('');

  document.querySelector('.gallery').insertAdjacentHTML('beforeend', markup);
  lightbox.refresh();
}

export function clearGallery() {
  galleryContainer.innerHTML = '';
}

export function showLoader() {
  loader.classList.remove('hidden');
}

export function hideLoader() {
  loader.classList.add('hidden');
}

export function showLoadMoreButton() {
  loadMoreBtn.classList.remove('hidden');
}

export function hideLoadMoreButton() {
  loadMoreBtn.classList.add('hidden');
}
