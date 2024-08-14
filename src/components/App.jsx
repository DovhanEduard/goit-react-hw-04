import './App.css';
import { useState } from 'react';
import SearchBar from './SearchBar/SearchBar';
import ImageGallery from './ImageGallery/ImageGallery';
import Loader from './Loader/Loader';
import ErrorMessage from './ErrorMessage/ErrorMessage';
import LoadMoreBtn from './LoadMoreBtn/LoadMoreBtn';
import ImageModal from './ImageModal/ImageModal';
import { getImagesByValue } from './services/api';

function App() {
  const [images, setImages] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchedValue, setSearchedValue] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [modalIsOpen, setIsOpen] = useState(false);

  const fetchImages = (page, searchValue) => {
    const fetchPhotos = async () => {
      try {
        setCurrentPage(page);
        setIsLoading(true);
        setError(null);

        const data = await getImagesByValue(page, searchValue);
        const isFirstPage = page === 1;
        const updatedCurrentData = isFirstPage
          ? data.results
          : [...images, ...data.results];

        setImages(updatedCurrentData);
        setTotalPages(data.total_pages);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchPhotos();
  };

  const onSearch = searchValue => {
    setSearchedValue(searchValue);

    fetchImages(1, searchValue);
  };

  const onPageChange = () => {
    const nextPage = currentPage + 1;

    setCurrentPage(nextPage);
    fetchImages(nextPage, searchedValue);
  };

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const onAfterClose = () => {
    setSelectedImage(null);
  };

  const isImages = Boolean(images?.length);  
  const isPagesToLoad = currentPage !== totalPages;

  return (
    <>
      <SearchBar onSearch={onSearch} />
      {isLoading && <Loader />}
      {error && <ErrorMessage error={error} />}
      {isImages && (
        <>
          <ImageGallery
            onSmallImgClick={setSelectedImage}
            onClick={openModal}
            images={images}
          />
          {isPagesToLoad && <LoadMoreBtn onLoadMore={onPageChange} />}
        </>
      )}

      {selectedImage && (
        <ImageModal
          modalIsOpen={modalIsOpen}
          openModal={openModal}
          closeModal={closeModal}
          onAfterClose={onAfterClose}
          image={selectedImage}
        />
      )}
    </>
  );
}

export default App;
