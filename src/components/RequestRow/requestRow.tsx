import type { FC } from "react";
import type { IRequest } from "../../types/types";
import style from "./requestRow.module.css"
import { useAppDispatch } from "../../store";
import { deleteRequest } from "../../store/requestsSlice";

interface Props {
    request: IRequest;
}

export const RequestRow: FC<Props> = ({ request }) => {
    const dispatch = useAppDispatch()
    function deleteHandler(id: string) {
        dispatch(deleteRequest(id))
    }
    return (
        <tr>
            <td>{request.status}</td>
            <td>{request.name}</td>
            <td>{request.contact}</td>

            <td>
                {(request.by_phone && !request.on_messenger) && "звонок"}
                {(!request.by_phone && request.on_messenger) && "мессенджер"}
                {(request.by_phone && request.on_messenger) && "звонок, мессенджер"}
                
            </td>

            <td>
                <div className={style.blockComment}>
                    <span><a className={style.link} href={`http://localhost:5173/pet/${request.pet_id}`} target="_blank" rel="noopener noreferrer">{request.pet_nickname}</a></span>
                    <span>{request.comment}</span>
                </div>
            </td>

            <td>
                {/* <button>✏️</button> */}
                <button onClick={() => deleteHandler(request.id)}>🗑️</button>
            </td>
        </tr>
    );
};