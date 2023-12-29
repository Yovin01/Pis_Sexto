import { borrarSesion } from '../utiles/SessionUtil';
import { useNavigate } from 'react-router';


const Header = () => {
  const navegation = useNavigate();

  const handleClick = () => {
    borrarSesion();
    navegation('/login');
    // EN revision xddddddddddddddddddddddddddddddddddddd
  }
  return (<header id="header" className="fixed-top header-inner-pages">
    <div className="container d-flex align-items-center justify-content-between">

      <h1 className="logo"><a href="index.html">Laboratorio remoto</a></h1>
      <a href="index.html" classNameName="logo">
        <image src="assets/img/logo.png" alt="" className="img-fluid" IM> </image></a>

      <nav id="navbar" className="navbar">
        <ul>
          <li><a className="nav-link scrollto active" href="/principal">Inicio</a></li>
          <li><a className="nav-link scrollto" href="/modificar">Cambiar estado</a></li>
          <li><a className="nav-link scrollto" href="/modificar">Resultados</a></li>
          <li><a className="nav-link  scrollto" href="#portfolio">Sobre nosotros</a></li>
          <li><a className="nav-link scrollto" href="#contact">Contact</a></li>
          <li><a className="nav-link scrollto" onClick={handleClick}>Salir</a></li>
        </ul>
        <i className="bi bi-list mobile-nav-toggle"></i>
      </nav>

    </div>
  </header>)
}

export default Header;