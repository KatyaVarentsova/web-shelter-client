import type { FC } from "react";
import style from "./homePage.module.css";
import { CarouselCards } from "../../components/CarouselCards/carouselCards";
import { Button } from "../../components/Button/button";
import image from '../../assets/mainPicture.png';
import { useNavigate } from "react-router-dom";


export const HomePage: FC = () => {
    const navigate = useNavigate();

    return (
        <div className={style.homePage}>
            <section className={style.blockBackground}>
            <div className={`container ${style.section}`}>
                <div>
                    <h1 className={style.titleText}>Официальный сайт твоего приюта</h1>
                    <p className="textFatty">Здесь находят дом и любовь</p>
                    <Button onClick={() => {navigate("/pets")}}>Найти питомца</Button>
                </div>
                <div>
                    <img src={image} alt='Собаки и коты'></img>
                </div>
            </div>
        </section>
            <div className={style.sectionText}>
                <p className={style.text}>Наш приют — это место, где бездомные животные получают заботу, безопасность и шанс на новую жизнь. Здесь кошки и собаки проходят социализацию, получают необходимый уход и учатся снова доверять людям.</p>
                <p className={style.text}>Мы существуем благодаря волонтёрам и неравнодушным людям. Наша цель — найти для каждого животного любящую семью и подарить ему дом, где его будут ждать и любить.</p>
            </div>
            <CarouselCards></CarouselCards>
            <Button onClick={() => {navigate("/pets")}}>Посмотреть всех животных</Button>
        </div>
    )
}