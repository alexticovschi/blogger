import BlogCard from '../BlogCard/BlogCard';
import './Blogs.scss';

const Blogs = ({ blogs, loadedBlogs }) => {
  return (
    <section className='blogs'>
      {blogs && blogs.map((blog, i) => <BlogCard key={i} blog={blog} />)}
      {loadedBlogs &&
        loadedBlogs.map((blog, i) => <BlogCard key={i} blog={blog} />)}
    </section>
  );
};

export default Blogs;
