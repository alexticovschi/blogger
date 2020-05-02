import Card from '../blog/Card/Card';

import './BlogTag.scss';

const BlogTag = ({ tag, blogs }) => {
  return (
    <section className='blog-tag'>
      <img
        className='blog-tag__banner-img'
        src={`../images/tags/${tag.name.toLowerCase()}.jpg`}
        alt='tag banner'
      />
      <div className='blog-tag__wrapper'>
        {blogs.map((blog) => (
          <Card key={blog._id} blog={blog} />
        ))}
      </div>
    </section>
  );
};

export default BlogTag;
