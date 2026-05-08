import { useEffect, useState, type FC } from "react";
import style from "./filter.module.css";
import { Button } from "../Button/button";
import { useAppDispatch, useAppSelector } from "../../store";
import { isOpenFilterSelector, setIsOpenFilter } from "../../store/modalSlice";

interface IForm {
    type: string,
    size: string,
    character: string,
    age: string,
    gender: string,
    wool: string,
    other: string[],
}


export const Filter: FC = ({ }) => {
    const filtersRadio = [
        {
            type: 'radio',
            name: 'type',
            title: 'Вид животного',
            options: ['Кошка', 'Собака']
        },
        {
            type: 'radio',
            name: 'size',
            title: 'Размер',
            options: ['До 10 кг', 'От 10 до 30 кг', 'От 30 кг']
        },
        {
            type: 'radio',
            name: 'character',
            title: 'Характер',
            options: ['Спокойный', 'Активный']
        },
        {
            type: 'radio',
            name: 'age',
            title: 'Возраст',
            options: [
                'До 1 года',
                'От 1 года до 5 лет',
                'От 5 лет до 10 лет',
                'Старше 10 лет'
            ]
        },
        {
            type: 'radio',
            name: 'gender',
            title: 'Пол',
            options: ['Мальчик', 'Девочка']
        },
        {
            type: 'radio',
            name: 'wool',
            title: 'Тип шерсти',
            options: ['Короткая', 'Длинная']
        },
        {
            type: 'checkbox',
            name: 'other',
            title: 'Другие характеристики',
            options: [
                'Для семьи с детьми',
                'Ладит с собаками',
                'Ладит с кошками',
                'На передержке'
            ]
        }
    ];

    const filtersCheckbox: string[] = [
        'Для семьи с детьми',
        'Ладит с собаками',
        'Ладит с кошками',
        'На передержке'
    ];

    const dispatch = useAppDispatch();
    const isOpen = useAppSelector(isOpenFilterSelector);

    const [stateForm, setStateForm] = useState<IForm>({
        type: '',
        size: '',
        character: '',
        age: '',
        gender: '',
        wool: '',
        other: [],
    })

    const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        setStateForm({
            type: '',
            size: '',
            character: '',
            age: '',
            gender: '',
            wool: '',
            other: [],
        })
    }

    const changeHandler = (type: string, key: keyof IForm, value: string) => {
        type === 'radio' ?
            setStateForm({
                ...stateForm,
                [key]: value
            }) :
            setStateForm({
                ...stateForm,
                other: stateForm.other.includes(value) ? [...stateForm.other.filter(item => item != value)] : [...stateForm.other, value]
            })
    };

    const searchHandler = () => {
        dispatch(setIsOpenFilter(!isOpen))
    }

    const fateHandler = () => {
        dispatch(setIsOpenFilter(!isOpen))
    }

    const resetHandler = () => {
        setStateForm({
            type: '',
            size: '',
            character: '',
            age: '',
            gender: '',
            wool: '',
            other: [],
        })
    }

    useEffect(() => {
        console.log(stateForm)
    }, [stateForm])

    return (
        <div className={style.filter}>
            <div>
                <button
                    className={`${style.filterButton} ${isOpen && style.openButton}`}
                    onClick={() => dispatch(setIsOpenFilter(!isOpen))}
                >
                    {!isOpen && (
                        <span>
                            <svg width="58" height="58" viewBox="0 0 58 58" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M3 9.4L28.6 9.4M3 28.6H28.6M28.6 28.6V35M28.6 28.6V22.2M3 47.8H15.8M28.6 47.8L54.2 47.8M41.4 28.6H54.2M41.4 9.4L54.2 9.4M41.4 9.4V15.8M41.4 9.4V3M17.4 54.2V41.4" stroke="#FCFCFC" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </span>

                    )}
                    {isOpen && (
                        <span className={style.arroyButton}>
                            <svg width="49" height="44" viewBox="0 0 49 44" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M20.7778 40.3333L3 21.6667M3 21.6667L20.7778 3M3 21.6667L45.6667 21.6667" stroke="#FCFCFC" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </span>
                    )}

                </button>
            </div>

            <form className={`${style.panel} ${isOpen && style.open}`} onSubmit={(e) => submitHandler(e)}>
                {filtersRadio.map(filter => (
                    <fieldset key={filter.name} className={style.filterBlock}>
                        <legend className={style.filterTitle}>{filter.title}</legend>
                        {filter.options.map(option => (
                            <label key={option} className={style[filter.type]}>
                                <input
                                    type={filter.type}
                                    name={filter.name}
                                    value={option}
                                    checked={
                                        filter.type === 'radio'
                                            ? stateForm[filter.name as keyof IForm] === option
                                            : stateForm.other.includes(option)
                                    }
                                    onChange={() => changeHandler(filter.type, filter.name as keyof IForm, option)} />
                                <span className={
                                    filter.type === 'radio'
                                        ? style.customRadio
                                        : style.customCheckbox
                                }></span>
                                {option}
                            </label>
                        ))}

                    </fieldset>
                ))}

                <div className={style.blockButtons}>
                    <Button variant="brownButton" onClick={searchHandler}>Найти по фильтру</Button>
                    <Button variant="whiteButton" onClick={fateHandler}>Довериться судьбе</Button>
                    <button className={style.resetButton} onClick={resetHandler}>Сбросить фильтр</button>
                </div>

            </form>
        </div>
    )
}