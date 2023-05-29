import "./Navbar.scss"

import { ReactComponent as Logo } from '../../../../public/assets/logo.svg'
import { Link, NavLink } from 'react-router-dom'
import Button from "../button/Button";

function Navbar() {
    return (
        <nav className="navbar">
            <div className="container">
                <div className="logo">
                    <Link to="/">
                        <Logo />
                    </Link>
                </div>
                <div className="nav-elements">
                    <ul>
                        <li>
                            <NavLink to="/games">Games</NavLink>
                        </li>
                        <li>
                            <NavLink to="/blog">Earn</NavLink>
                        </li>
                        <li>
                            <NavLink to="/projects">Stake</NavLink>
                        </li>
                        <li>
                            <NavLink to="/about">Referral</NavLink>
                        </li>
                        <li>
                            <NavLink to="/contact">Analytics</NavLink>
                        </li>
                        <li>
                            <Button label="Connect wallet" small onClick={() => {}} />
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;