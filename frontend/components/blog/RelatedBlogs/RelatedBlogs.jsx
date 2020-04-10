import RelatedBlogCard from '../RelatedBlogCard/RelatedBlogCard';
import './RelatedBlogs.scss';

const RelatedBlogs = ({ relatedBlogs }) => {
  return (
    <>
      {relatedBlogs.length && (
        <section className='related-blogs'>
          <h4 className='related-blogs__title'>Related Blogs</h4>

          <div className='related-blogs__wrapper'>
            {relatedBlogs.map((blog) => (
              <RelatedBlogCard key={blog._id} blog={blog} />
            ))}
          </div>
        </section>
      )}
    </>
  );
};

export default RelatedBlogs;
