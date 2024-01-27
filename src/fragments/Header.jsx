import { borrarSesion } from '../utiles/SessionUtil';
import { useNavigate } from 'react-router';
import '../css/hilarystyle.css';
import 'boxicons';
import unlIcon from '../UNL.png';


const Header = () => {
  const navegation = useNavigate();

  const handleClick = () => {
    borrarSesion();
    navegation('/login');
    // EN revision xddddddddddddddddddddddddddddddddddddd
  }
  return ( <header className='header'>
  <nav className='navbar'>
      <a href="#">Home</a>
      <a href="#">Sobre el API</a>
      <a href="#">Contactos</a>
  </nav>
  {/** <form action="#" className="search-bar">
      <input type="text" placeholder='Buscar...' />
      <button type='submit'><i className='bx bx-search-alt-2'></i></button>
  </form> */}

</header>)
}

export default Header;