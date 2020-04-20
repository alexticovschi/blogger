import './Footer.scss';

const Footer = () => (
  <footer className='footer'>
    <div className='footer__copyright'>
      <p>Copyright © 2020 BloggingCoder.com</p>
      <p className='footer__text-and-author'>
        All rights reserved. Made with ❤ in London, UK, by{' '}
        <a
          className='footer__text__author'
          target='_blank'
          href='https://alexticovschi.netlify.app/'
        >
          Alex Ticovschi
        </a>
      </p>
    </div>
  </footer>
);

export default Footer;
