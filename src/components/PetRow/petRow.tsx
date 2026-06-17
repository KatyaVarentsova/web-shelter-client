import type { FC } from "react";
import type { IPetRow } from "../../types/types";
import style from "./petRow.module.css"
import { useAppDispatch } from "../../store";
import { formatAge } from "../../utils/petAge";
import { deletePetsTable } from "../../store/petsTableSlice";
import { useNavigate } from "react-router-dom";

interface Props {
    pet: IPetRow;
    category: string;
}

export const PetRow: FC<Props> = ({ pet, category }) => {
    const CLIENT_URL = import.meta.env.VITE_CLIENT_URL;
    const dispatch = useAppDispatch()
    const navigate = useNavigate();

    function deleteHandler(id: string, category: string) {
        dispatch(deletePetsTable({ id, category }))
    }
    return (
        <tr>
            <td><span><a className={style.link} href={`${CLIENT_URL}/pet/${pet.id}`} target="_blank" rel="noopener noreferrer">{pet.nickname}</a></span></td>
            <td>{formatAge(pet.birthday)}</td>
            <td>{pet.gender}</td>
            <td>{pet.last_name} {pet.first_name}</td>

            <td>
                <button onClick={() => navigate(`/info/pet/edit/${pet.id}`)}>✏️</button>
                <button onClick={() => deleteHandler(pet.id, category)}>🗑️</button>
            </td>
        </tr>
    );
};