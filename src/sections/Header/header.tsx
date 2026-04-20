import type { FC } from "react";
import style from "./header.module.css";
import logo from '../../assets/logo.svg';
import { Link } from "react-router-dom";

export const Header: FC = () => {

    return (
        <header className={style.blockBackground}>
            <div className={`container ${style.header}`}>
                <Link to="/">
                    <img src={logo} alt="Логотип приюта" />
                </Link>

                <nav className={style.nav}>
                    <Link className={style.link} to="/">О нас</Link>
                    <Link className={style.link} to="/login">Вход</Link>
                </nav>

            </div>
        </header>
    )
}