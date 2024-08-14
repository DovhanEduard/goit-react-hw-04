const LoadMoreBtn = ({page, onLoadMore }) => {
  return (
    <button type="button" onClick={() => onLoadMore(page + 1)}>
      Load More
    </button>
  );
};

export default LoadMoreBtn;
