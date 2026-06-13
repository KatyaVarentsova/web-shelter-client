import { useEffect, type FC } from "react";
import style from "./requestsPage.module.css"
import { useAppDispatch, useAppSelector } from "../../store";
import { getRequests, requestsSelector } from "../../store/requestsSlice";
import { RequestRow } from "../../components/RequestRow/requestRow";

export const RequestsPage: FC = () => {
    const dispatch = useAppDispatch()
    const requests = useAppSelector(requestsSelector)

    useEffect(() => {
        dispatch(getRequests())
    }, [])

    return (
        <div className={style.container}>
            <table className={style.requestsTable}>
                <thead>
                    <tr>
                        <th>Статус</th>
                        <th>Имя</th>
                        <th>Телефон</th>
                        <th>Тип связи</th>
                        <th>Комментарий</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {requests.map((req) => (
                        <RequestRow key={req.id} request={req} />
                    ))}
                </tbody>
            </table>
        </div>
    )
}