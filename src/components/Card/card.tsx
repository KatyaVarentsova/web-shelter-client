import type { FC } from "react";
import style from "./card.module.css"

interface IProps {
    id: number,
    name: string,
    age: string,
    gender: string,
    type: string,
    image: string,
}

export const Card: FC<IProps> = (props) => {

    return (
        <div className={style.card}>
            <img className={style.cardImage} alt={props.type} src={props.image}></img>
            <div className={style.cardDescription}>
                <h3 className={style.cardTitle}>{props.name}</h3>
                <p className={style.cardText}>{props.age}, {props.gender}</p>
            </div>
        </div>
    )
}