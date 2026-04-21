import { type FC } from "react";
import style from "./listCards.module.css"
import { Card } from "../Card/card";
import { listAnimals } from "../../mockData/animals";

export const ListCards: FC = () => {

    return (
        <div className={style.containerCards}>
            {
                listAnimals.map((item) => {
                    return <Card
                        key={item.id}
                        id={item.id}
                        name={item.name}
                        age={item.age}
                        gender={item.gender}
                        type={item.type}
                        image={item.image}
                    ></Card>
                })
            }
        </div>
    )
}