import type { FC } from "react";
import style from "./adminHeader.module.css";
import { Link } from "react-router-dom";

export const AdminHeader: FC = () => {
    return (
        <section className={style.blockBackground}>
            <div className={`container ${style.header}`}>
                <nav className={style.nav}>
                    <Link className={style.link} to="/info/requests">Заявки</Link>
                    <Link className={style.link} to="/info/dogs">Собаки</Link>
                    <Link className={style.link} to="/info/cats">Кошки</Link>
                </nav>
            </div>
        </section>
    )
}