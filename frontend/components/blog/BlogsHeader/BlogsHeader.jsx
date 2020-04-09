import Link from 'next/link';
import './BlogsHeader.scss';

const BlogsHeader = ({ categories, tags }) => {
  return (
    <section className='blogs-header'>
      <h1 className='blogs-header__title'>Programming blogs and tutorials</h1>

      <div className='blogs-header__categories-tags'>
        {categories.map((category) => (
          <Link key={category._id} href={`/categories/${category.slug}`}>
            <a className='blogs-header__category'>
              <img
                className='blogs-header__category-icon'
                src='images/category.svg'
                alt='category icon'
              />
              {category.name}
            </a>
          </Link>
        ))}

        {tags.map((tag) => (
          <Link key={tag._id} href={`/tags/${tag.slug}`}>
            <a className='blogs-header__tag'>
              <img
                className='blogs-header__tag-icon'
                src='images/tag.svg'
                alt='tag icon'
              />
              {tag.name}
            </a>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default BlogsHeader;
