import type { FC } from "react";
import type { IPetRow } from "../../types/types";
import style from "./petRow.module.css"
import { useAppDispatch } from "../../store";
import { formatAge } from "../../utils/petAge";
import { deletePetsTable } from "../../store/petsTableSlice";

interface Props {
    pet: IPetRow;
    category: string;
}

export const PetRow: FC<Props> = ({ pet, category }) => {
    const dispatch = useAppDispatch()
    function deleteHandler(id: string, category: string) {
        dispatch(deletePetsTable({id, category}))
    }
    return (
        <tr>
            <td><span><a className={style.link} href={`http://localhost:5173/pet/${pet.id}`} target="_blank" rel="noopener noreferrer">{pet.nickname}</a></span></td>
            <td>{formatAge(pet.birthday)}</td>
            <td>{pet.gender}</td>
            <td>{pet.last_name} {pet.first_name}</td>

            <td>
                {/* <button>✏️</button> */}
                <button onClick={() => deleteHandler(pet.id, category)}>🗑️</button>
            </td>
        </tr>
    );
};