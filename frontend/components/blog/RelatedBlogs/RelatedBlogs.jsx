import RelatedBlogCard from '../RelatedBlogCard/RelatedBlogCard';
import './RelatedBlogs.scss';

const RelatedBlogs = ({ relatedBlogs }) => {
  return (
    <section className='related-blogs'>
      <h4 className='related-blogs__title'>Related Blogs</h4>

      {relatedBlogs.map((blog) => (
        <RelatedBlogCard key={blog._id} blog={blog} />
      ))}
    </section>
  );
};

export default RelatedBlogs;
