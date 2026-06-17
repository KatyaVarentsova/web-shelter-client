import type { FC } from "react";
import style from "./header.module.css";
import logo from '../../assets/logo.svg';
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store";
import { accessTokenSelector, removeAccessToken } from "../../store/authSlice";

export const Header: FC = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const token = useAppSelector(accessTokenSelector);

    const handlerLogout = () => {
        dispatch(removeAccessToken());

        navigate("/");
    };

    return (
        <header className={style.blockBackground}>
            <div className={`container ${style.header}`}>
                <Link to="/">
                    <img src={logo} alt="Логотип приюта" />
                </Link>

                <nav className={style.nav}>
                    <Link className={style.link} to="/">О нас</Link>
                    <Link className={style.link} to="/pets">Каталог животных</Link>
                    <Link className={style.link} to="/form">Оставить заявку</Link>
                    {!token ? 
                    <Link className={style.link} to="/login">Вход</Link>
                    : 
                    <button className={style.link} onClick={handlerLogout}>Выход</button>
                    }
                </nav>

            </div>
        </header>
    )
}