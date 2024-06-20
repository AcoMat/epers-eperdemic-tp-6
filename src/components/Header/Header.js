import SignInGoogle from '../SignInGoogleBtn/SignInGoogleBtn';
import './Header.css'

function Header() {
    return (
        <header className="header">
            <img src="logo.png" alt="Eperdemic" className="logo" />
            <nav>
                <ul>
                    <SignInGoogle></SignInGoogle>
                </ul>
            </nav>
        </header>
    );
}

export default Header;