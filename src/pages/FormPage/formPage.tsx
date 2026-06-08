import { useState, type FC } from "react";
import formPicture from "../../assets/formPicture.png";
import style from "./fromPage.module.css";
import { Button } from "../../components/Button/button";
import { formatPhone } from "../../utils/formatPhone";
import type { ICreateRequest } from "../../types/types";
import { useAppDispatch } from "../../store";
import { createRequest } from "../../store/requestsSlice";

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
            console.log(err);
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

                <form
                    className={style.contactForm}
                    onSubmit={handleSubmit}
                >
                    <label className={style.labelForm}>
                        Как вас зовут?

                        <input
                            className={style.inputForm}
                            type="text"
                            placeholder="Катя"
                            value={form.name}
                            onChange={(e) =>
                                updateField("name", e.target.value)
                            }
                        />
                    </label>

                    <label className={style.labelForm}>
                        Ваш номер телефона

                        <input
                            className={style.inputForm}
                            type="text"
                            placeholder="+7 (900) 999 99 99"
                            value={form.contact}
                            onChange={handlePhone}
                        />
                    </label>

                    <div className={style.groupForm}>
                        <p className={style.titleForm}>
                            Желаемый способ связи
                        </p>

                        <label className={style.checkboxForm}>
                            <input
                                type="checkbox"
                                checked={form.by_phone}
                                onChange={(e) =>
                                    updateField(
                                        "by_phone",
                                        e.target.checked
                                    )
                                }
                            />

                            <span className={style.customCheckbox}></span>
                            <span>Звонок</span>
                        </label>

                        <label className={style.checkboxForm}>
                            <input
                                type="checkbox"
                                checked={form.on_messenger}
                                onChange={(e) =>
                                    updateField(
                                        "on_messenger",
                                        e.target.checked
                                    )
                                }
                            />

                            <span className={style.customCheckbox}></span>
                            <span>Мессенджер</span>
                        </label>
                    </div>

                    <label className={style.labelForm}>
                        Расскажите, кого вы ищите:

                        <textarea
                            className={style.textareaForm}
                            value={form.comment}
                            onChange={(e) =>
                                updateField(
                                    "comment",
                                    e.target.value
                                )
                            }
                        />
                    </label>

                    <label className={style.checkboxForm}>
                        <input type="checkbox" checked={form.consent}
                            onChange={(e) =>
                                setForm({
                                    ...form,
                                    consent: e.target.checked
                                })
                            } />

                        <span className={style.customCheckbox}></span>

                        <span>
                            Согласие на обработку персональных данных
                        </span>
                    </label>

                    <Button>
                        Отправить
                    </Button>
                </form>
            </section>
        </div>
    );
};