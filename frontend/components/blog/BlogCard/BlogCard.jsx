import Link from 'next/link';
import renderHTML from 'react-render-html';
import moment from 'moment';
import { API } from '../../../config';
import './BlogCard.scss';

const BlogCard = ({ blog }) => (
  <article className='blog-card'>
    <Link href={`/blogs/${blog.slug}`}>
      <a>
        <h2 className='blog-card__title'>{blog.title}</h2>
      </a>
    </Link>
    <p className='blog-card__text'>
      Written by{' '}
      <Link href={`/profile/${blog.postedBy.username}`}>
        <a>
          <span>{blog.postedBy.name}</span>
        </a>
      </Link>{' '}
      | Published {moment(blog.updatedAt).fromNow()}
    </p>
    <div className='blog-card__categories-tags'>
      {blog.categories.map((category) => (
        <Link key={category._id} href={`/categories/${category.slug}`}>
          <a className='blog-card__category'>{category.name}</a>
        </Link>
      ))}

      {blog.tags.map((tag) => (
        <Link key={tag._id} href={`/tags/${tag.slug}`}>
          <a className='blog-card__tag'>{tag.name}</a>
        </Link>
      ))}
      <br />
    </div>
    <div className='blog-card__img-and-excerpt'>
      <Link href={`/blogs/${blog.slug}`}>
        <a>
          <img
            className='blog-card__img'
            src={`${API}/blog/photo/${blog.slug}`}
            alt={blog.title}
          />
        </a>
      </Link>
      <div className='blog-card__excerpt'>{renderHTML(blog.excerpt)}</div>
    </div>
  </article>
);

export default BlogCard;
