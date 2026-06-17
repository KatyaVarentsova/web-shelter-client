import { type FC } from "react";
import style from "./listCards.module.css"
import { Card } from "../Card/card";
import { useAppSelector } from "../../store";
import { petsSelector } from "../../store/petsSlice";

export const ListCards: FC = () => {
    const pets = useAppSelector(petsSelector)

    if (!pets.length) {
        return <p className={style.emptyMessage}>
            К сожалению, мы не нашли для вас питомца, попробуйте изменить фильтр
        </p>
    }

    return (
        <div className={style.containerCards}>
            {
                pets.map((item) => {
                    return <Card
                        key={item.id}
                        id={item.id}
                        nickname={item.nickname}
                        birthday={item.birthday}
                        gender={item.gender}
                        category={item.category}
                        image={item.image}
                    ></Card>
                })
            }
        </div>
    )
}