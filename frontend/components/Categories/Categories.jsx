import Card from '../blog/Card/Card';

import './Categories.scss';

const Categories = ({ category, blogs }) => {
  return (
    <section className='categories'>
      <div className='category'>
        <h1 className='category__title'>{category.name}</h1>
      </div>
      {blogs.map((blog) => (
        <Card key={blog._id} blog={blog} />
      ))}
    </section>
  );
};

export default Categories;
