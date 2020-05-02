import Link from 'next/link';
import renderHTML from 'react-render-html';
import moment from 'moment';
import { API } from '../../../config';

import './Blog.scss';

const Blog = ({ blog }) => {
  return (
    <article className='blog'>
      <figure>
        <img
          src={`${API}/blog/photo/${blog.slug}`}
          alt={blog.title}
          className='blog__banner-img'
        />
      </figure>

      <div className='blog__wrapper'>
        <section>
          <h1 className='blog__title'>{blog.title}</h1>
          <p className='blog__written-by'>
            Written by{' '}
            <Link href={`/profile/${blog.postedBy.username}`}>
              <a>
                <span>{blog.postedBy.name}</span>
              </a>
            </Link>{' '}
            | Published {moment(blog.updatedAt).fromNow()}
          </p>
        </section>
        <section className='blog__categories-tags'>
          {blog.categories.map((category) => (
            <Link key={category._id} href={`/categories/${category.slug}`}>
              <a className='blog__category'>{category.name}</a>
            </Link>
          ))}

          {blog.tags.map((tag) => (
            <Link key={tag._id} href={`/tags/${tag.slug}`}>
              <a className='blog__tag'>{tag.name}</a>
            </Link>
          ))}
          <br />
        </section>
        <section>
          <div className='blog__text'>{renderHTML(blog.body)}</div>
        </section>
      </div>
    </article>
  );
};

export default Blog;
