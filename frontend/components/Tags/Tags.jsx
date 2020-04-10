import Card from '../blog/Card/Card';

import './Tags.scss';

const Tags = ({ tag, blogs }) => {
  return (
    <section className='tags'>
      <div className='tag-banner'>
        <h1 className='tag-banner__title'>{tag.name}</h1>
      </div>
      {blogs.map((blog) => (
        <Card key={blog._id} blog={blog} />
      ))}
    </section>
  );
};

export default Tags;
