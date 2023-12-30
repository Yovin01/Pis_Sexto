import "bootstrap/dist/css/bootstrap.min.css";


const Footer = () => {
    return (
        <footer className="py-3 my-4">
            <ul className="nav justify-content-center border-bottom pb-3 mb-3">
                <li className="nav-item"><a href="#" className="nav-link px-2 text-muted">Preguntas frecuentes</a></li>
                <li className="nav-item"><a href="#" className="nav-link px-2 text-muted">Sobre nosotros</a></li>
            </ul>
            <p className="text-center text-muted">© 2024 API UV</p>
        </footer>

    );
}

export default Footer;