import './Header.css'

function Header() {
    return (
        <header className="header">
            <img src="logo.png" alt="Eperdemic" className="logo" />
            <nav>
                <ul>
                    <li>Iniciar Sesion</li>
                </ul>
            </nav>
        </header>
    );
}

export default Header;