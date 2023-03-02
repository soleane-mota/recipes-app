import drinkIcon from '../images/drinkIcon.svg';
import mealIcon from '../images/mealIcon.svg';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer data-testid="footer" className={ styles.container }>
      <button type="button">
        <img src={ drinkIcon } alt="bebidas" data-testid="drinks-bottom-btn" />
      </button>
      <button type="button">
        <img src={ mealIcon } alt="comidas" data-testid="meals-bottom-btn" />
      </button>
    </footer>
  );
}
