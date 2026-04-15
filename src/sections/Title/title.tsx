import type { FC } from "react";
import style from "./title.module.css";
import image from '../../assets/mainPicture.png';
import { Button } from "../../components/Button/button";


export const Title: FC = () => {

    return (
        <section className={style.blockBackground}>
            <div className={`container ${style.section}`}>
                <div>
                    <h1 className={style.titleText}>Официальный сайт твоего приюта</h1>
                    <p className="textFatty">Здесь находят дом и любовь</p>
                    <Button>Найти питомца</Button>
                </div>
                <div>
                    <img src={image} alt='Собаки и коты'></img>
                </div>
            </div>
        </section>
    )
}