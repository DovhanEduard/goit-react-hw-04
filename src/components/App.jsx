import './App.css';
import { useEffect, useState } from 'react';
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
  const [totalPages, setTotalPages] = useState(1);
  const [selectedImage, setSelectedImage] = useState(null);
  const [modalIsOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (currentPage > 1) {
      fetchImages(currentPage);
    }
  }, [currentPage]);

  const onSearch = searchValue => {
    setSearchedValue(searchValue);

    const fetchImages = async () => {
      try {
        setCurrentPage(1);
        setIsLoading(true);
        const data = await getImagesByValue(currentPage, searchValue);

        setImages(data.results);
        setTotalPages(data.total_pages);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchImages();
  };

  const fetchImages = () => {
    const fetchPhotos = async () => {
      try {
        setIsLoading(true);
        const data = await getImagesByValue(currentPage, searchedValue);
        setImages([...images, ...data.results]);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchPhotos();
  };

  const onPageChange = page => {
    const scrollDistance = 400;

    window.scrollBy({
      top: scrollDistance,
      left: 0,
      behavior: 'smooth',
    });
    
    if (totalPages === currentPage) {
      return;
    }
    setCurrentPage(page);
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

  return (
    <>
      <SearchBar onSearch={onSearch} />
      {isLoading && <Loader />}
      {error !== null && <ErrorMessage error={error} />}
      {images !== null && (
        <ImageGallery
          onSmallImgClick={setSelectedImage}
          onClick={openModal}
          images={images}
        />
      )}
      {Array.isArray(images) &&
        images.length !== 0 &&
        currentPage !== totalPages && (
          <LoadMoreBtn page={currentPage} onLoadMore={onPageChange} />
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
