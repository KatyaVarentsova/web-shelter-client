import { useState, type FC } from "react";
import style from "./requestForm.module.css";
import { Button } from "../Button/button";
import { formatPhone } from "../../utils/formatPhone";
import { useAppDispatch } from "../../store";
import { createRequest } from "../../store/requestsSlice";
import type { ICreateRequest } from "../../types/types";
import { setIsOpenForm } from "../../store/modalSlice";

interface RequestFormProps {
    petId?: string;
}

type RequestFormState = ICreateRequest & {
    consent: boolean;
};

export const RequestForm: FC<RequestFormProps> = ({
    petId,
}) => {
    const dispatch = useAppDispatch();

    const initialForm: RequestFormState = {
        pet_id: petId,
        name: "",
        contact: "",
        by_phone: false,
        on_messenger: false,
        comment: "",
        consent: false,
    };

    const [form, setForm] =
        useState<RequestFormState>(initialForm);

    const updateField = <
        K extends keyof RequestFormState
    >(
        field: K,
        value: RequestFormState[K]
    ) => {
        setForm((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const handlePhone = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        updateField(
            "contact",
            formatPhone(e.target.value)
        );
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (
            !form.by_phone &&
            !form.on_messenger
        ) {
            alert(
                "Выберите хотя бы один способ связи"
            );
            return;
        }

        if (!form.consent) {
            alert(
                "Необходимо согласие на обработку персональных данных"
            );
            return;
        }

        if (
            !petId &&
            !form.comment?.trim()
        ) {
            alert(
                "Опишите, какого питомца вы ищете"
            );
            return;
        }

        try {
            const {
                consent,
                ...payload
            } = form;

            await dispatch(
                createRequest(payload)
            ).unwrap();

            setForm({
                pet_id: petId,
                name: "",
                contact: "",
                by_phone: false,
                on_messenger: false,
                comment: "",
                consent: false,
            });

            dispatch(setIsOpenForm(false))

        } catch (err) {
            console.error(err);
        }
    };

    return (
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
                        updateField(
                            "name",
                            e.target.value
                        )
                    }
                    required
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
                    required
                />
            </label>

            <div className={style.groupForm}>
                <p className={style.titleForm}>
                    Желаемый способ связи
                </p>

                <label
                    className={style.checkboxForm}
                >
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

                    <span
                        className={
                            style.customCheckbox
                        }
                    />

                    <span>Звонок</span>
                </label>

                <label
                    className={style.checkboxForm}
                >
                    <input
                        type="checkbox"
                        checked={
                            form.on_messenger
                        }
                        onChange={(e) =>
                            updateField(
                                "on_messenger",
                                e.target.checked
                            )
                        }
                    />

                    <span
                        className={
                            style.customCheckbox
                        }
                    />

                    <span>Мессенджер</span>
                </label>
            </div>

            {!petId && (
                <label
                    className={style.labelForm}
                >
                    Расскажите, кого вы ищете:

                    <textarea
                        className={
                            style.textareaForm
                        }
                        value={form.comment}
                        onChange={(e) =>
                            updateField(
                                "comment",
                                e.target.value
                            )
                        }
                    />
                </label>
            )}

            <Button type="submit">Отправить</Button>

            <label
                className={style.checkboxForm}
            >
                <input
                    type="checkbox"
                    checked={form.consent}
                    onChange={(e) =>
                        updateField(
                            "consent",
                            e.target.checked
                        )
                    }
                />

                <span
                    className={
                        style.customCheckbox
                    }
                />

                <span>
                    Согласие на обработку персональных данных
                </span>
            </label>

        </form>
    );
};