import type { FC } from "react";
import style from "./footer.module.css";
import logo from '../../assets/logo.svg';
import { Link } from "react-router-dom";

export const Footer: FC = () => {

    return (
        <footer className={style.blockBackground}>
            <div className="container">
                <div className={style.footer}>

                    <div className={style.column}>
                        <h3 className={style.headerNav}>О приюте:</h3>
                        <nav className={style.nav}>
                            <Link className={style.link} to="/">О нас</Link>
                            <Link className={style.link} to="/pets">Каталог животных</Link>
                        </nav>
                    </div>

                    <div className={style.columnLogo}>
                        <Link to="/">
                            <img className={style.logo} src={logo} alt="Логотип приюта" />
                        </Link>
                    </div>

                    <div className={style.column}>
                        <h3 className={style.headerNav}>Мы в социальных сетях:</h3>
                        <a className={style.link} href="#" target="_blank" rel="noopener noreferrer">Телеграм</a>
                        <a className={style.link} href="#" target="_blank" rel="noopener noreferrer">ВКонтакте</a>
                        <a className={style.link} href="#" target="_blank" rel="noopener noreferrer">Одноклассники</a>
                    </div>

                </div>
            </div>
        </footer>
    )
}