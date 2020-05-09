import Link from 'next/link';
import { useState, useEffect } from 'react';
import { blogSearch } from '../../../actions/blog';
import './Search.scss';

const Search = () => {
  const [values, setValues] = useState({
    search: undefined,
    results: [],
    searched: false,
    message: '',
  });

  // *** IMPLEMENTNG SEARCH ****
  // 1# send data to backend to fetch results
  // 2# once the results are fetched, add them to state
  // 3# render results based on data stored in state

  const { search, results, searched, message } = values;

  useEffect(() => {
    searchHandler();
  }, [search]);

  const searchHandler = async (e) => {
    // e.preventDefault();
    const response = await blogSearch({ search });

    try {
      if (response) {
        setValues({
          ...values,
          results: response,
          searched: true,
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e) => {
    setValues({
      ...values,
      search: e.target.value,
      searched: false,
      results: [],
    });
  };

  return (
    <form onSubmit={searchHandler} className='search'>
      <input
        type='search'
        className='search__input-bar'
        placeholder='Search...'
        onChange={handleChange}
      />
      {results && (
        <ul className='search__list-group'>
          {results.map((blog) => (
            <Link
              href={`/blogs/${blog.slug}`}
              key={blog._id}
              className='search__link'
            >
              <a className='search__link'>
                <li className='search__list-group-item' key={blog._id}>
                  {blog.title}
                </li>
              </a>
            </Link>
          ))}
        </ul>
      )}
    </form>
  );
};

export default Search;
