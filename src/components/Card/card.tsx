import type { FC } from "react";
import style from "./card.module.css"
import { Link } from "react-router-dom";
import { formatAge } from "../../utils/petAge";

interface IProps {
    id: string,
    nickname: string,
    birthday: string,
    gender: string,
    category: string,
    image: string,
}

export const Card: FC<IProps> = (props) => {
    
    return (
        <Link to={`/pet/${props.id}`} className={style.card}>
            <img className={style.cardImage} alt={props.category} src={props.image}></img>
            <div className={style.cardDescription}>
                <h3 className={style.cardTitle}>{props.nickname}</h3>
                <p className={style.cardText}>{formatAge(props.birthday)}, {props.gender}</p>
            </div>
        </Link>
    )
}