import RelatedBlogCard from '../RelatedBlogCard/RelatedBlogCard';
import './RelatedBlogs.scss';

const RelatedBlogs = ({ relatedBlogs }) => {
  return (
    <section className='related-blogs'>
      {relatedBlogs.map((blog) => (
        <div className='related-blogs__wrapper'>
          <h4 className='related-blogs__title'>Related Blogs</h4>

          <RelatedBlogCard key={blog._id} blog={blog} />
        </div>
      ))}
    </section>
  );
};

export default RelatedBlogs;
