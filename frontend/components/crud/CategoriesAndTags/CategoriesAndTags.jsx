import Categories from '../Categories/Categories';
import Tags from '../Tags/Tags';
import './CategoriesAndTags.scss';

const CategoriesAndTags = () => {
  return (
    <div className='categories-and-tags'>
      <div className='categories-and-tags__banner'>
        <h4 className='categories-and-tags__title'>
          Manage Categories and Tags
        </h4>
      </div>
      <div className='categories-and-tags__wrapper'>
        <Categories />
        <Tags />
      </div>
    </div>
  );
};

export default CategoriesAndTags;
