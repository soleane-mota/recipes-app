import { useHistory } from 'react-router-dom';
import drinkIcon from '../images/drinkIcon.svg';
import mealIcon from '../images/mealIcon.svg';
import styles from '../styles/Footer.module.css';

export default function Footer() {
  const history = useHistory();

  return (
    <footer data-testid="footer" className={ styles.container }>
      <img
        src={ drinkIcon }
        alt="bebidas"
        data-testid="drinks-bottom-btn"
        onClick={ () => history.push('/drinks') }
        aria-hidden="true"
      />

      <img
        src={ mealIcon }
        alt="comidas"
        data-testid="meals-bottom-btn"
        onClick={ () => history.push('/meals') }
        aria-hidden="true"
      />
    </footer>
  );
}
