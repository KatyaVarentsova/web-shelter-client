import { useEffect, useState, type FC, type FormEvent } from 'react';
import style from './petFormPage.module.css';
import { useAppDispatch, useAppSelector } from '../../store';
import { getShortCurators, shortCuratorsSelector } from '../../store/curatorDetailsSlice';
import type { IPetForm } from '../../types/types';
import { createPet, updatePet } from '../../store/petsTableSlice';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '../../components/Button/button';
import { getPetDetails, petDetailsSelector } from '../../store/petDetailsSlice';


export const PetFormPage: FC = () => {
    let initialForm = {
        nickname: '',
        category: '',
        size: 0,
        character: '',
        birthday: '',
        gender: '',
        wool: '',
        for_family: false,
        for_dogs: false,
        for_cats: false,
        is_guest: false,
        description: '',
        curator_id: '',

        image_1: '',
        image_2: '',
        image_3: '',
        image_4: '',
        image_5: '',
    }

    const dispatch = useAppDispatch()
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const pet = useAppSelector(petDetailsSelector)

    useEffect(() => {
        id && dispatch(getPetDetails(id))
    }, [id]);

    useEffect(() => {
        if (!pet || !id) return;

        initialForm = {
            nickname: pet.nickname || '',
            category: pet.category || '',
            size: pet.size || 0,
            character: pet.character || '',
            birthday: pet.birthday
                ? new Date(pet.birthday)
                    .toISOString()
                    .split('T')[0]
                : '',
            gender: pet.gender || '',
            wool: pet.wool || '',
            for_family: pet.for_family || false,
            for_dogs: pet.for_dogs || false,
            for_cats: pet.for_cats || false,
            is_guest: pet.is_guest || false,
            description: pet.description || '',
            curator_id: pet.curator_id || '',

            image_1: pet.images?.[0]?.image || '',
            image_2: pet.images?.[1]?.image || '',
            image_3: pet.images?.[2]?.image || '',
            image_4: pet.images?.[3]?.image || '',
            image_5: pet.images?.[4]?.image || '',
        }

        setForm(initialForm);
    }, [pet, id]);

    useEffect(() => {
        dispatch(getShortCurators())
    }, [])

    const curators = useAppSelector(shortCuratorsSelector)

    const [form, setForm] = useState<IPetForm>(initialForm);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;

        setForm(prev => ({
            ...prev,
            [name]: name === 'size' ? Number(value) : value,
        }));
    };

    const handleCheckboxChange = (name: keyof IPetForm) => {
        setForm(prev => ({
            ...prev,
            [name]: !prev[name],
        }));
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        try {
            if (id) {
                await dispatch(updatePet({
                    id: id,
                    pet: form,
                    category: 'dogs'
                })).unwrap();
            } else {
                await dispatch(createPet({
                    pet: form,
                    category: 'dogs',
                })).unwrap();
            }

            setForm(initialForm);

            navigate(-1);
        } catch (err) {
            console.log(err);
            alert("Ошибка сохранения карточки питомца");
        }
    };

    const resetHandler = () => {
        setForm(initialForm);
    }

    const cancelHandler = () => {
        if (form.category === 'Собака') {
            navigate(`/info/dogs`);
        } else {
            navigate(`/info/cats`);
        }
    }

    return (
        <div className={style.background}>
            <section className={style.sectionForm}>
                <form
                    className={style.contactForm}
                    onSubmit={handleSubmit}
                >
                    <h2 className={style.pageTitle}>
                        Добавление питомца
                    </h2>

                    <div className={style.formRow}>
                        <label className={style.labelForm}>
                            Кличка
                            <input
                                className={style.inputForm}
                                type="text"
                                name="nickname"
                                value={form.nickname}
                                onChange={handleChange}
                                required
                            />
                        </label>

                        <label className={style.labelForm}>
                            Вес (кг)
                            <input
                                className={style.inputForm}
                                type="number"
                                min="0"
                                step="0.1"
                                name="size"
                                value={form.size || ''}
                                onChange={handleChange}
                            />
                        </label>

                        <label className={style.labelForm}>
                            Дата рождения
                            <input
                                className={style.inputForm}
                                type="date"
                                name="birthday"
                                value={form.birthday}
                                onChange={handleChange}
                            />
                        </label>

                        <label className={style.labelForm}>
                            Куратор

                            <select
                                className={style.selectForm}
                                name="curator_id"
                                value={form.curator_id}
                                onChange={handleChange}
                            >
                                <option value="">Выберите куратора</option>

                                {curators.map(curator => (
                                    <option key={curator.id} value={curator.id}>
                                        {curator.last_name} {curator.first_name} {curator.middle_name}
                                    </option>
                                ))}
                            </select>
                        </label>
                    </div>

                    <div className={style.formChoice}>
                        <fieldset className={style.filterBlock}>
                            <legend className={style.filterTitle}>
                                Вид животного
                            </legend>

                            {['Кошка', 'Собака'].map(option => (
                                <label
                                    key={option}
                                    className={style.radio}
                                >
                                    <input
                                        type="radio"
                                        name="category"
                                        value={option}
                                        checked={form.category === option}
                                        onChange={handleChange}
                                    />

                                    <span className={style.customRadio}></span>

                                    {option}
                                </label>
                            ))}
                        </fieldset>

                        <fieldset className={style.filterBlock}>
                            <legend className={style.filterTitle}>
                                Пол
                            </legend>

                            {['Мальчик', 'Девочка'].map(option => (
                                <label
                                    key={option}
                                    className={style.radio}
                                >
                                    <input
                                        type="radio"
                                        name="gender"
                                        value={option}
                                        checked={form.gender === option}
                                        onChange={handleChange}
                                    />

                                    <span className={style.customRadio}></span>

                                    {option}
                                </label>
                            ))}
                        </fieldset>

                        <fieldset className={style.filterBlock}>
                            <legend className={style.filterTitle}>
                                Характер
                            </legend>

                            {['Спокойный', 'Активный'].map(option => (
                                <label
                                    key={option}
                                    className={style.radio}
                                >
                                    <input
                                        type="radio"
                                        name="character"
                                        value={option}
                                        checked={form.character === option}
                                        onChange={handleChange}
                                    />

                                    <span className={style.customRadio}></span>

                                    {option}
                                </label>
                            ))}
                        </fieldset>

                        <fieldset className={style.filterBlock}>
                            <legend className={style.filterTitle}>
                                Тип шерсти
                            </legend>

                            {['Короткая', 'Длинная'].map(option => (
                                <label
                                    key={option}
                                    className={style.radio}
                                >
                                    <input
                                        type="radio"
                                        name="wool"
                                        value={option}
                                        checked={form.wool === option}
                                        onChange={handleChange}
                                    />

                                    <span className={style.customRadio}></span>

                                    {option}
                                </label>
                            ))}
                        </fieldset>

                        <fieldset className={style.filterBlock}>
                            <legend className={style.filterTitle}>
                                Другие характеристики
                            </legend>

                            <label className={style.checkbox}>
                                <input
                                    type="checkbox"
                                    checked={form.for_family}
                                    onChange={() =>
                                        handleCheckboxChange('for_family')
                                    }
                                />

                                <span className={style.customCheckbox}></span>

                                Для семьи с детьми
                            </label>

                            <label className={style.checkbox}>
                                <input
                                    type="checkbox"
                                    checked={form.for_dogs}
                                    onChange={() =>
                                        handleCheckboxChange('for_dogs')
                                    }
                                />

                                <span className={style.customCheckbox}></span>

                                Ладит с собаками
                            </label>

                            <label className={style.checkbox}>
                                <input
                                    type="checkbox"
                                    checked={form.for_cats}
                                    onChange={() =>
                                        handleCheckboxChange('for_cats')
                                    }
                                />

                                <span className={style.customCheckbox}></span>

                                Ладит с кошками
                            </label>

                            <label className={style.checkbox}>
                                <input
                                    type="checkbox"
                                    checked={form.is_guest}
                                    onChange={() =>
                                        handleCheckboxChange('is_guest')
                                    }
                                />

                                <span className={style.customCheckbox}></span>

                                На передержке
                            </label>
                        </fieldset>

                        <label className={style.labelForm}>
                            Описание

                            <textarea
                                className={style.textareaForm}
                                name="description"
                                value={form.description}
                                onChange={handleChange}
                            />
                        </label>
                    </div>

                    <fieldset className={style.filterBlock}>
                        <legend className={style.filterTitle}>
                            Изображения
                        </legend>

                        <label className={style.labelForm}>
                            Фото 1 *
                            <input
                                className={style.inputForm}
                                type="text"
                                name="image_1"
                                value={form.image_1}
                                onChange={handleChange}
                                required
                                placeholder="URL изображения"
                            />
                        </label>

                        <label className={style.labelForm}>
                            Фото 2
                            <input
                                className={style.inputForm}
                                type="text"
                                name="image_2"
                                value={form.image_2}
                                onChange={handleChange}
                                placeholder="URL изображения"
                            />
                        </label>

                        <label className={style.labelForm}>
                            Фото 3
                            <input
                                className={style.inputForm}
                                type="text"
                                name="image_3"
                                value={form.image_3}
                                onChange={handleChange}
                                placeholder="URL изображения"
                            />
                        </label>

                        <label className={style.labelForm}>
                            Фото 4
                            <input
                                className={style.inputForm}
                                type="text"
                                name="image_4"
                                value={form.image_4}
                                onChange={handleChange}
                                placeholder="URL изображения"
                            />
                        </label>

                        <label className={style.labelForm}>
                            Фото 5
                            <input
                                className={style.inputForm}
                                type="text"
                                name="image_5"
                                value={form.image_5}
                                onChange={handleChange}
                                placeholder="URL изображения"
                            />
                        </label>
                    </fieldset>

                    <div className={style.blockButtons}>
                        <Button type="submit" variant="greenButton">Сохранить</Button>
                        {id ?
                            <Button type="button" variant="whiteButton" onClick={cancelHandler}>Отмена</Button>
                            :
                            <Button type="button" variant="whiteButton" onClick={resetHandler}>Очистить форму</Button>
                        }
                    </div>

                </form>
            </section>
        </div>
    );
};