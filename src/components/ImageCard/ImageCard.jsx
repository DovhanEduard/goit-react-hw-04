import css from './ImageCard.module.css';

function ImageCard({ image, onSmallImgClick, onClick }) {
  const handleClick = () => {
    onSmallImgClick(image);
    onClick();
  };
  return (
    <div onClick={handleClick}>
      <img
        className={css.galleryImage}
        src={image.urls.small}
        alt={image.description}
      />
    </div>
  );
}

export default ImageCard;
