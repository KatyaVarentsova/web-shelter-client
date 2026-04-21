import type { FC } from "react";
import style from "./listCardsPage.module.css";
import { ListCards } from "../../components/ListCards/listCards";

export const ListCardsPage: FC = () => {

    return (
        <section className={style.sectionCards}>
            <h2 className={style.title}>Каталог собак и кошек </h2>
            <div className={style.sectionText}>
                <p className={style.text}>Подберите себе питомца по фильтрам на странице или доверьтесь судьбе, а кураторы познакомят вас лично и помогут в период адаптации дома.</p>
                <p className={style.text}>А если вы затрудняетесь с выбором, расскажите нам, кого вы ищите и мы подберём животных, которые могут подойти по описанию.</p>
                <p className={style.text}>Все животные привиты, стерилизованы, чипированы и отдаются бесплатно в заботливые руки.</p>
            </div>
            <ListCards></ListCards>
        </section>
    )
}