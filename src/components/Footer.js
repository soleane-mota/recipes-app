import { Link } from 'react-router-dom';
import drinkIcon from '../images/drinkIcon.svg';
import mealIcon from '../images/mealIcon.svg';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer data-testid="footer" className={ styles.container }>
      <Link to="/drinks">
        <img src={ drinkIcon } alt="bebidas" data-testid="drinks-bottom-btn" />
      </Link>

      <Link to="/meals">
        <img src={ mealIcon } alt="comidas" data-testid="meals-bottom-btn" />
      </Link>
    </footer>
  );
}
