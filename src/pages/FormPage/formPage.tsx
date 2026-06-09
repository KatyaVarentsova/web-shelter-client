import { useState, type FC } from "react";
import formPicture from "../../assets/formPicture.png";
import style from "./fromPage.module.css";
import { Button } from "../../components/Button/button";
import { formatPhone } from "../../utils/formatPhone";
import type { ICreateRequest } from "../../types/types";
import { useAppDispatch } from "../../store";
import { createRequest } from "../../store/requestsSlice";
import { RequestForm } from "../../components/RequestForm/requestForm";

export const FormPage: FC = () => {
    const dispatch = useAppDispatch();

    const [form, setForm] = useState<ICreateRequest & { consent: boolean }>({
        name: "",
        contact: "",
        by_phone: false,
        on_messenger: false,
        comment: "",
        consent: false
    });

    const updateField = <K extends keyof ICreateRequest>(
        field: K,
        value: ICreateRequest[K]
    ) => {
        setForm((prev) => ({
            ...prev,
            [field]: value
        }));
    };

    const handlePhone = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        const formatted = formatPhone(e.target.value);

        updateField("contact", formatted);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!form.by_phone && !form.on_messenger) {
            alert("Выберите хотя бы один способ связи");
            return;
        }

        if (!form.consent) {
            alert("Необходимо согласие на обработку данных");
            return;
        }

        try {
            const { consent, ...payload } = form;

            await dispatch(createRequest(payload)).unwrap();

            setForm({
                name: '',
                contact: '',
                by_phone: false,
                on_messenger: false,
                comment: '',
                consent: false,
            });

        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className={style.background}>
            <section className={style.sectionForm}>
                <div className={style.textBlockForm}>
                    <h2 className={style.headerForm}>
                        Не смогли определиться с&nbsp;выбором?
                    </h2>

                    <p className={style.textForm}>
                        Мы вас понимаем! Так сложно остановиться
                        на одной из сотен очаровательных мордочек.
                    </p>

                    <p className={style.textForm}>
                        Опытные волонтёры готовы помочь и подобрать
                        кандидатов на роль вашего питомца, просто
                        <span className={style.textUnderliningForm}>
                            {" "}
                            расскажите нам максимально подробно,
                        </span>
                        кого вы ищите.
                    </p>

                    <p className={style.textForm}>
                        <span className={style.textAllocationForm}>
                            Животные из приюта не имеют породы!
                        </span>
                        {" "}На запрос по породе мы не сможем никого
                        предложить. Вам лучше обратиться к заводчикам.
                    </p>

                    <img
                        className={style.imageForm}
                        src={formPicture}
                        alt="Фото пушистых"
                    />
                </div>

                <RequestForm></RequestForm>
                
            </section>
        </div>
    );
};