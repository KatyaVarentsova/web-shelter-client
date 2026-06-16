import { useEffect, type FC } from "react";
import style from "./petsTablePage.module.css"
import { useAppDispatch, useAppSelector } from "../../store";
import { getPetsTable, petsTableSelector } from "../../store/petsTableSlice";
import { PetRow } from "../../components/PetRow/petRow";
import { Button } from "../../components/Button/button";
import { useNavigate } from "react-router-dom";

interface IProps {
    category: string
}

export const PetsTablePage: FC<IProps> = ({ category }) => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate();
    const pets = useAppSelector(petsTableSelector)

    useEffect(() => {
        dispatch(getPetsTable(category))
    }, [category])

    const handlerClick = () => {
        navigate("/info/pet/create");
    };

    return (
        <div className={style.container}>
            <h2 className={style.pageTitle}>{category === "dogs" ? "Собаки" : "Коты" }</h2>
            <div className={style.blockButton}>
                <Button onClick={handlerClick} variant="greenButton">Добавить питомца</Button>
            </div>
            <table className={style.requestsTable}>
                <thead>
                    <tr>
                        <th>Кличка</th>
                        <th>Возраст</th>
                        <th>Пол</th>
                        <th>Ответственный</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {pets.map((pet) => (
                        <PetRow key={pet.id} pet={pet} category={category} />
                    ))}
                </tbody>
            </table>
        </div>
    )
}