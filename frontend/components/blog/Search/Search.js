import Link from 'next/link';
import { useState, useEffect } from 'react';
import { blogSearch } from '../../../actions/blog';
import './Search.scss';

const Search = () => {
  const [values, setValues] = useState({
    search: undefined,
    results: [],
    searched: false,
    message: ''
  });

  // *** IMPLEMENTNG SEARCH ****
  // 1# send data to backend to fetch results
  // 2# once the results are fetched, add them to state
  // 3# render results based on data stored in state

  const { search, results, searched, message } = values;

  const searchHandler = async e => {
    e.preventDefault();
    const response = await blogSearch({ search });

    try {
      if (response) {
        setValues({
          ...values,
          results: response,
          searched: true
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = e => {
    setValues({
      ...values,
      search: e.target.value,
      searched: false,
      results: []
    });
  };
  // console.log('RESULTS:', results);

  return (
    <form onSubmit={searchHandler}>
      <div className='container py-2'>
        <div className='row'>
          <div className='col-xl-12'>
            <input
              type='search'
              className='form-control'
              placeholder='Search blogs'
              onChange={handleChange}
            />
          </div>
          {results && (
            <ul className='list-group search mt-5 ml-3'>
              {results.map(blog => (
                <Link href={`/blogs/${blog.slug}`}>
                  <a>
                    <li className='list-group-item' key={blog._id}>
                      {blog.title}
                    </li>
                  </a>
                </Link>
              ))}
            </ul>
          )}
        </div>
      </div>
    </form>
  );
};

export default Search;
