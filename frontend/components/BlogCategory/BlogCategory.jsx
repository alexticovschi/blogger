import BlogCard from '../blog/BlogCard/BlogCard';

import './BlogCategory.scss';

const BlogCategory = ({ category, blogs }) => {
  return (
    <section className='blog-category'>
      <img
        className='blog-category__banner-img'
        src={`../images/categories/${category.name.toLowerCase()}.jpg`}
        alt='category banner'
      />
      <div className='blog-category__wrapper'>
        {blogs.map((blog) => (
          <BlogCard key={blog._id} blog={blog} />
        ))}
      </div>
    </section>
  );
};

export default BlogCategory;
