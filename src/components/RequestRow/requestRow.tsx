import { useState, type FC } from "react";
import type { IRequest } from "../../types/types";
import style from "./requestRow.module.css"
import { useAppDispatch, useAppSelector } from "../../store";
import { deleteRequest } from "../../store/requestsSlice";
import { accessTokenSelector } from "../../store/authSlice";

interface Props {
    request: IRequest;
}

const API_URL = import.meta.env.VITE_API_URL;

const statuses = [
    'новый',
    'в работе',
    'успешно завершено',
    'в архиве',
];

export const RequestRow: FC<Props> = ({ request }) => {
    const CLIENT_URL = import.meta.env.VITE_CLIENT_URL;
    const dispatch = useAppDispatch()
    const token = useAppSelector(accessTokenSelector);
    function deleteHandler(id: string) {
        dispatch(deleteRequest(id))
    }

    const [isEditing, setIsEditing] = useState(false);
    const [status, setStatus] = useState(request.status);

    const handleChangeStatus = async (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newStatus = e.target.value;
        setStatus(newStatus);
        setIsEditing(false);

        await fetch(`${API_URL}/api/requests/${request.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                authorization: token
            },
            credentials: "include",
            body: JSON.stringify({
                status: newStatus,
            }),
        });
    };

    return (
        <tr>
            <td>
                {isEditing ? (
                    <select
                        value={status}
                        className={style.statusSelect}
                        onChange={handleChangeStatus}
                        autoFocus
                    >
                        {statuses.map(item => (
                            <option key={item} value={item}>
                                {item}
                            </option>
                        ))}
                    </select>
                ) : (
                    <span
                        onClick={() => setIsEditing(true)}
                        style={{ cursor: 'pointer' }}
                    >
                        {status}
                    </span>
                )}
            </td>
            <td>{request.name}</td>
            <td>{request.contact}</td>

            <td>
                {(request.by_phone && !request.on_messenger) && "звонок"}
                {(!request.by_phone && request.on_messenger) && "мессенджер"}
                {(request.by_phone && request.on_messenger) && "звонок, мессенджер"}

            </td>

            <td>
                <div className={style.blockComment}>
                    <span><a className={style.link} href={`${CLIENT_URL}/pet/${request.pet_id}`} target="_blank" rel="noopener noreferrer">{request.pet_nickname}</a></span>
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