import { useEffect, type FC } from "react";
import style from "./petsTablePage.module.css"
import { useAppDispatch, useAppSelector } from "../../store";
import { getPetsTable, petsTableSelector } from "../../store/petsTableSlice";
import { PetRow } from "../../components/PetRow/petRow";

interface IProps {
    category: string
}

export const PetsTablePage: FC<IProps> = ({category}) => {
    const dispatch = useAppDispatch()
    const pets = useAppSelector(petsTableSelector)

    useEffect(() => {
        dispatch(getPetsTable(category))
    }, [category])

    return (
        <div className={style.container}>
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
                     <PetRow key={pet.id} pet={pet} category={category}/>
                    ))}
                </tbody>
            </table>
        </div>
    )
}