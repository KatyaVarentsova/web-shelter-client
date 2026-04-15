import type { FC } from "react";
import style from "./homePage.module.css";
import { Title } from "../../sections/Title/title";
import { ListCards } from "../../components/ListCards/listCards";


export const HomePage: FC = () => {

    return (
        <>
            <Title></Title>
            <div className={style.sectionText}>
                <p className={style.text}>Наш приют — это место, где бездомные животные получают заботу, безопасность и шанс на новую жизнь. Здесь кошки и собаки проходят социализацию, получают необходимый уход и учатся снова доверять людям.</p>
                <p className={style.text}>Мы существуем благодаря волонтёрам и неравнодушным людям. Наша цель — найти для каждого животного любящую семью и подарить ему дом, где его будут ждать и любить.</p>
            </div>
            <ListCards></ListCards>
        </>
    )
}