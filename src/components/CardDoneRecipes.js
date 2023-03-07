import React, { useState } from 'react';
import clipboardCopy from 'clipboard-copy';
import { useHistory } from 'react-router-dom';
import shareIcon from '../images/shareIcon.svg';

function CardDoneRecipes() {
  const recipes = [
    {
      id: '52771',
      type: 'meal',
      nationality: 'Italian',
      category: 'Vegetarian',
      alcoholicOrNot: '',
      name: 'Spicy Arrabiata Penne',
      image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
      doneDate: '23/06/2020',
      tags: ['Pasta', 'Curry'],
    },
    {
      id: '178319',
      type: 'drink',
      nationality: '',
      category: 'Cocktail',
      alcoholicOrNot: 'Alcoholic',
      name: 'Aquamarine',
      image: 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg',
      doneDate: '23/06/2020',
      tags: [],
    },
  ];

  localStorage.setItem('doneRecipes', JSON.stringify(recipes));

  // tudo o que está acima é pra deletar no push
  const [copy, setCopy] = useState({});
  const history = useHistory();
  const pathname = history.location.pathname.split('/');
  const path = pathname[1];
  const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));

  const variableDataTestID = (type, nationality, category, alcoholicOrNot) => {
    if (type === 'meal') {
      return `${nationality} - ${category}`;
    }
    if (type === 'drink') {
      return `${alcoholicOrNot}`;
    }
  };

  const share = (name, id) => {
    clipboardCopy(`http://localhost:3000/${path}/${id}`);
    setCopy({ name });
  };

  // const filter = () => {

  // };

  return (
    <div>
      { doneRecipes
        .map(
          (
            {
              id,
              type,
              nationality,
              category,
              alcoholicOrNot,
              name,
              image,
              tags,
              doneDate },
            index,
          ) => (
            <div key={ index }>
              <h3 data-testid={ `${index}-horizontal-name` }>{name}</h3>
              <h4 data-testid={ `${index}-horizontal-top-text` }>{category}</h4>
              <h4 data-testid={ `${index}-horizontal-done-date` }>{doneDate}</h4>
              {tags.map((tag, i) => (
                <h5
                  key={ i }
                  data-testid={ `${index}-${tag}-horizontal-tag` }
                >
                  {tag}

                </h5>))}
              <h5
                data-testid={ `${index}-horizontal-top-text` }
              >
                {variableDataTestID(type, nationality, category, alcoholicOrNot)}
              </h5>
              { variableDataTestID() }
              <img
                src={ shareIcon }
                alt="compartilhar"
                aria-hidden="true"
                data-testid={ `${index}-horizontal-share-btn` }
                onClick={ () => share(name, id) }
              />
              {copy.name === name ? <p>Link copied!</p> : ''}
              <img
                alt={ name }
                src={ image }
                data-testid={ `${index}-horizontal-image` }
                style={ { maxWidth: '100px' } }
              />
            </div>),
        ) }
    </div>
  );
}

export default CardDoneRecipes;
