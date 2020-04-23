import Card from '../blog/Card/Card';

import './BlogCategory.scss';

const BlogCategory = ({ category, blogs }) => {
  return (
    <section className='blog-category'>
      <div className='blog-category__banner'>
        <h2 className='blog-category__title'>{category.name}</h2>
      </div>
      {blogs.map((blog) => (
        <Card key={blog._id} blog={blog} />
      ))}
    </section>
  );
};

export default BlogCategory;
