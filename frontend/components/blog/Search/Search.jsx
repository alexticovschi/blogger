import Link from 'next/link';
import { useState, useEffect } from 'react';
import { blogSearch } from '../../../actions/blog';
import './Search.scss';

const Search = () => {
  const [values, setValues] = useState({
    search: '',
    results: [],
    searched: false,
    message: '',
  });

  // *** IMPLEMENTNG SEARCH ****
  // 1# send data to backend to fetch results
  // 2# once the results are fetched, add them to state
  // 3# render results based on data stored in state

  const { search, results, message, searched } = values;

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async function () {
    try {
      const response = await blogSearch({ search });

      setValues({
        ...values,
        results: response,
        searched: true,
      });

      if (response.length === 0) {
        setValues({
          ...values,
          message: 'No blogs found',
        });
      }
    } catch (error) {
      console.log(error);
      setError(error);
    }
  };

  const handleChange = (e) => {
    setValues({
      ...values,
      search: e.target.value,
      searched: false,
      results: [],
      message: '',
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchData();
  };

  return (
    <form onSubmit={handleSubmit} className='search'>
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
          {message ? (
            <li className='search__list-group-item search__list-group-item__message'>
              {message}
            </li>
          ) : null}
        </ul>
      )}
    </form>
  );
};

export default Search;
