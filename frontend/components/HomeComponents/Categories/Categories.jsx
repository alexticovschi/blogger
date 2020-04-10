import Link from 'next/link';

import './Categories.scss';

const Categories = () => {
  return (
    <section className='home-categories'>
      <div className='home-categories__wrapper'>
        <Link href='/categories/react'>
          <a className='home-categories-card'>
            <figure>
              <img
                className='home-categories-card__img'
                src='images/categories/react.jpg'
                alt='category logo'
              />
            </figure>
            <div className='home-categories-card__content'>
              <h2 className='home-categories-card__title'>React</h2>
              <p className='home-categories-card__text'>
                The world's most popular frontend web development library.
              </p>
            </div>
          </a>
        </Link>

        <Link href='/categories/node'>
          <a className='home-categories-card'>
            <figure>
              <img
                className='home-categories-card__img'
                src='images/categories/nodejs.jpg'
                alt='category logo'
              />
            </figure>
            <div className='home-categories-card__content'>
              <h2 className='home-categories-card__title'>Node</h2>
              <p className='home-categories-card__text'>
                The worlds most popular backend development tool for JavaScript
                Ninjas.
              </p>
            </div>
          </a>
        </Link>

        <Link href='/categories/next.js'>
          <a className='home-categories-card'>
            <figure>
              <img
                className='home-categories-card__img'
                src='images/categories/nextjs.jpg'
                alt='category logo'
              />
            </figure>
            <div className='home-categories-card__content'>
              <h2 className='home-categories-card__title'>Next</h2>
              <p className='home-categories-card__text'>
                A Production ready web framework for building SEO and SSR React
                apps.
              </p>
            </div>
          </a>
        </Link>

        <Link href='/categories/javascript'>
          <a className='home-categories-card'>
            <figure>
              <img
                className='home-categories-card__img'
                src='images/categories/javascript.jpg'
                alt='category logo'
              />
            </figure>
            <div className='home-categories-card__content'>
              <h2 className='home-categories-card__title'>JavaScript</h2>
              <p className='home-categories-card__text'>
                A a programming language that conforms to the ECMAScript
                specification.
              </p>
            </div>
          </a>
        </Link>

        <Link href='/categories/angular'>
          <a className='home-categories-card'>
            <figure>
              <img
                className='home-categories-card__img'
                src='images/categories/angular.jpg'
                alt='category logo'
              />
            </figure>
            <div className='home-categories-card__content'>
              <h2 className='home-categories-card__title'>Angular</h2>
              <p className='home-categories-card__text'>
                A TypeScript-based open-source web application framework built
                by Google.
              </p>
            </div>
          </a>
        </Link>

        <Link href='/categories/vue'>
          <a className='home-categories-card'>
            <figure>
              <img
                className='home-categories-card__img'
                src='images/categories/vue.jpg'
                alt='category logo'
              />
            </figure>
            <div className='home-categories-card__content'>
              <h2 className='home-categories-card__title'>Vue</h2>
              <p className='home-categories-card__text'>
                An open-source JavaScript framework for building user interfaces
                and single-page applications.
              </p>
            </div>
          </a>
        </Link>

        <Link href='/categories/mern'>
          <a className='home-categories-card'>
            <figure>
              <img
                className='home-categories-card__img'
                src='images/categories/mern.jpg'
                alt='category logo'
              />
            </figure>
            <div className='home-categories-card__content'>
              <h2 className='home-categories-card__title'>MERN</h2>
              <p className='home-categories-card__text'>
                A free and open-source JavaScript software stack for building
                dynamic web sites and web applications.
              </p>
            </div>
          </a>
        </Link>

        <Link href='/categories/laravel'>
          <a className='home-categories-card'>
            <figure>
              <img
                className='home-categories-card__img'
                src='images/categories/laravel.jpg'
                alt='category logo'
              />
            </figure>
            <div className='home-categories-card__content'>
              <h2 className='home-categories-card__title'>Laravel</h2>
              <p className='home-categories-card__text'>
                A free and open-source JavaScript software stack for building
                dynamic web sites and web applications.
              </p>
            </div>
          </a>
        </Link>

        <Link href='/categories/gatsby'>
          <a className='home-categories-card'>
            <figure>
              <img
                className='home-categories-card__img'
                src='images/categories/gatsby.jpg'
                alt='category logo'
              />
            </figure>
            <div className='home-categories-card__content'>
              <h2 className='home-categories-card__title'>Gatsby</h2>
              <p className='home-categories-card__text'>
                Blazing fast modern site generator for React. Go beyond static
                sites: build full-blown apps with Gatsby.
              </p>
            </div>
          </a>
        </Link>

        <Link href='/categories/sass'>
          <a className='home-categories-card'>
            <figure>
              <img
                className='home-categories-card__img'
                src='images/categories/sass.jpg'
                alt='category logo'
              />
            </figure>
            <div className='home-categories-card__content'>
              <h2 className='home-categories-card__title'>Sass</h2>
              <p className='home-categories-card__text'>
                CSS with superpowers. The most mature and powerful professional
                grade CSS extension in the world.
              </p>
            </div>
          </a>
        </Link>

        <Link href='/categories/python'>
          <a className='home-categories-card'>
            <figure>
              <img
                className='home-categories-card__img'
                src='images/categories/python.jpg'
                alt='category logo'
              />
            </figure>
            <div className='home-categories-card__content'>
              <h2 className='home-categories-card__title'>Python</h2>
              <p className='home-categories-card__text'>
                An interpreted, high-level, general-purpose programming
                language.
              </p>
            </div>
          </a>
        </Link>

        <Link href='/categories/django'>
          <a className='home-categories-card'>
            <figure>
              <img
                className='home-categories-card__img'
                src='images/categories/django.jpg'
                alt='category logo'
              />
            </figure>
            <div className='home-categories-card__content'>
              <h2 className='home-categories-card__title'>Django</h2>
              <p className='home-categories-card__text'>
                A Python-based free and open-source web framework, which follows
                the model-template-view architectural pattern.
              </p>
            </div>
          </a>
        </Link>
      </div>
    </section>
  );
};

export default Categories;
