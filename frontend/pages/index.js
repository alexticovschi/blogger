import Layout from '../components/Layout';
import Link from 'next/link';

const Index = () => (
  <Layout>
    <article className='overflow-hidden py-5'>
      <div className='container'>
        <div className='row'>
          <div className='col-md-12 text-center py-5'>
            <h1 className='display-5 font-weight-bold'>
              PROGRAMMING & WEB DEVELOPMENT BLOGS/TUTORIALS
            </h1>
          </div>
        </div>
      </div>

      <div className='container'>
        <div className='row'>
          <div className='col-md-12 text-center pt-4 pb-5'>
            <p className='lead'>
              Best programming and web development blogs and tutorials on React
              Node NextJs and JavaScript
            </p>
          </div>
        </div>
      </div>
      <div className='container'>
        <div className='row'>
          <div className='col-md-4'>
            <div className='flip flip-horizontal'>
              <div
                className='front'
                style={{
                  backgroundImage:
                    'url(' +
                    'https://images.pexels.com/photos/2653362/pexels-photo-2653362.jpeg?auto=compress&cs=tinysrgb&h=400&w=660' +
                    ')',
                }}
              >
                <h2 className='text-shadow text-center h1'>React</h2>
              </div>
              <div className='back text-center'>
                <Link href='/categories/react'>
                  <a>
                    <h4 className='h1'>React Js</h4>
                  </a>
                </Link>
                <p className='lead'>
                  The world's most popular frontend web development library
                </p>
              </div>
            </div>
          </div>

          <div className='col-md-4'>
            <div className='flip flip-horizontal'>
              <div
                className='front'
                style={{
                  backgroundImage:
                    'url(' +
                    'https://images.pexels.com/photos/2653362/pexels-photo-2653362.jpeg?auto=compress&cs=tinysrgb&h=400&w=660' +
                    ')',
                }}
              >
                <h2 className='text-shadow text-center h1'>Node</h2>
              </div>
              <div className='back text-center'>
                <Link href='/categories/node'>
                  <a>
                    <h4 className='h1'>Node Js</h4>
                  </a>
                </Link>
                <p className='lead'>
                  The worlds most popular backend development tool for
                  JavaScript Ninjas
                </p>
              </div>
            </div>
          </div>

          <div className='col-md-4'>
            <div className='flip flip-horizontal'>
              <div
                className='front'
                style={{
                  backgroundImage:
                    'url(' +
                    'https://images.pexels.com/photos/2653362/pexels-photo-2653362.jpeg?auto=compress&cs=tinysrgb&h=400&w=660' +
                    ')',
                }}
              >
                <h2 className='text-shadow text-center h1'>Next</h2>
              </div>
              <div className='back text-center'>
                <Link href='/categories/next.js'>
                  <a>
                    <h4 className='h1'>Next Js</h4>
                  </a>
                </Link>
                <p className='lead'>
                  A Production ready web framework for building SEO React apps
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className='row'>
          <div className='col-md-4'>
            <div className='flip flip-horizontal'>
              <div
                className='front'
                style={{
                  backgroundImage:
                    'url(' +
                    'https://images.pexels.com/photos/2653362/pexels-photo-2653362.jpeg?auto=compress&cs=tinysrgb&h=400&w=660' +
                    ')',
                }}
              >
                <h2 className='text-shadow text-center h1'>Angular</h2>
              </div>
              <div className='back text-center'>
                <Link href='/categories/angular'>
                  <a>
                    <h4 className='h1'>Angular</h4>
                  </a>
                </Link>
                <p className='lead'>
                  A TypeScript-based open-source web application framework led
                  by the Angular Team at Google and by a community of
                  individuals and corporations.
                </p>
              </div>
            </div>
          </div>

          <div className='col-md-4'>
            <div className='flip flip-horizontal'>
              <div
                className='front'
                style={{
                  backgroundImage:
                    'url(' +
                    'https://images.pexels.com/photos/2653362/pexels-photo-2653362.jpeg?auto=compress&cs=tinysrgb&h=400&w=660' +
                    ')',
                }}
              >
                <h2 className='text-shadow text-center h1'>MERN</h2>
              </div>
              <div className='back text-center'>
                <Link href='/categories/mern'>
                  <a>
                    <h4 className='h1'>MERN</h4>
                  </a>
                </Link>
                <p className='lead'>
                  A free and open-source JavaScript software stack for building
                  dynamic web sites and web applications.
                </p>
              </div>
            </div>
          </div>

          <div className='col-md-4'>
            <div className='flip flip-horizontal'>
              <div
                className='front'
                style={{
                  backgroundImage:
                    'url(' +
                    'https://images.pexels.com/photos/2653362/pexels-photo-2653362.jpeg?auto=compress&cs=tinysrgb&h=400&w=660' +
                    ')',
                }}
              >
                <h2 className='text-shadow text-center h1'>Laravel</h2>
              </div>
              <div className='back text-center'>
                <Link href='/categories/laravel'>
                  <a>
                    <h4 className='h1'>Laravel</h4>
                  </a>
                </Link>
                <p className='lead'>
                  A free, open-source PHP web framework, created by Taylor
                  Otwell and intended for the development of web applications
                  following the model–view–controller architectural pattern and
                  based on Symfony.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className='row'>
          <div className='col-md-4'>
            <div className='flip flip-horizontal'>
              <div
                className='front'
                style={{
                  backgroundImage:
                    'url(' +
                    'https://images.pexels.com/photos/2653362/pexels-photo-2653362.jpeg?auto=compress&cs=tinysrgb&h=400&w=660' +
                    ')',
                }}
              >
                <h2 className='text-shadow text-center h1'>Gatsby</h2>
              </div>
              <div className='back text-center'>
                <Link href='/categories/gatsby'>
                  <a>
                    <h4 className='h1'>Gatsby Js</h4>
                  </a>
                </Link>
                <h5>Fast in every way that matters</h5>
                <p className='lead'>
                  Gatsby is a free and open source framework based on React that
                  helps developers build blazing fast websites and apps Get
                  Started
                </p>
              </div>
            </div>
          </div>

          <div className='col-md-4'>
            <div className='flip flip-horizontal'>
              <div
                className='front'
                style={{
                  backgroundImage:
                    'url(' +
                    'https://images.pexels.com/photos/2653362/pexels-photo-2653362.jpeg?auto=compress&cs=tinysrgb&h=400&w=660' +
                    ')',
                }}
              >
                <h2 className='text-shadow text-center h1'>JavaScript</h2>
              </div>
              <div className='back text-center'>
                <Link href='/categories/javascript'>
                  <a>
                    <h4 className='h1'>JavaScript</h4>
                  </a>
                </Link>
                <p className='lead'>
                  A programming language that conforms to the ECMAScript
                  specification. JavaScript is high-level, often just-in-time
                  compiled, and multi-paradigm.
                </p>
              </div>
            </div>
          </div>

          <div className='col-md-4'>
            <div className='flip flip-horizontal'>
              <div
                className='front'
                style={{
                  backgroundImage:
                    'url(' +
                    'https://images.pexels.com/photos/2653362/pexels-photo-2653362.jpeg?auto=compress&cs=tinysrgb&h=400&w=660' +
                    ')',
                }}
              >
                <h3 className='text-shadow text-center h1'>Sass</h3>
              </div>
              <div className='back text-center'>
                <Link href='/categories/sass'>
                  <a>
                    <h4 className='h1'>Sass</h4>
                  </a>
                </Link>
                <h5>CSS with superpowers</h5>
                <p className='lead'>
                  The most mature, stable, and powerful professional grade CSS
                  extension language in the world.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
  </Layout>
);

export default Index;
