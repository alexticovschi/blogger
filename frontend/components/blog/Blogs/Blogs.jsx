import Card from '../Card/Card';
import './Blogs.scss';

const Blogs = ({ blogs, loadedBlogs, size, limit, loadMoreBlogs }) => {
  return (
    <section className='blogs'>
      {blogs && blogs.map((blog, i) => <Card key={i} blog={blog} />)}
      {loadedBlogs &&
        loadedBlogs.map((blog, i) => <Card key={i} blog={blog} />)}
    </section>
  );
};

export default Blogs;
