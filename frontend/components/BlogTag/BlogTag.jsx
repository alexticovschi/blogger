import Card from '../blog/Card/Card';

import './BlogTag.scss';

const BlogTag = ({ tag, blogs }) => {
  return (
    <section className='blog-tag'>
      <div className='blog-tag__banner'>
        <h2 className='blog-tag__title'>{tag.name}</h2>
      </div>
      {blogs.map((blog) => (
        <Card key={blog._id} blog={blog} />
      ))}
    </section>
  );
};

export default BlogTag;
