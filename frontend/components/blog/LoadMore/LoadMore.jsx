import './LoadMore.scss';

const LoadMore = ({ size, limit, loadMoreBlogs }) => {
  return (
    <div className='load-more'>
      {/* if size greater than 0 and size is greater than or equal to limit, show button */}
      {size > 0 && size >= limit && (
        <button onClick={loadMoreBlogs} className='load-more__btn'>
          Load More
        </button>
      )}
    </div>
  );
};

export default LoadMore;
