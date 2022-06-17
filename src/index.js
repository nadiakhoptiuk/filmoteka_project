import { markupMoviesGallery } from "./js/template";
import { pagination } from './js/pagination';
import { moviePagination } from './js/pagination'

document.addEventListener('DOMContentLoaded', markupMoviesGallery);
pagination.on('afterMove', moviePagination);
