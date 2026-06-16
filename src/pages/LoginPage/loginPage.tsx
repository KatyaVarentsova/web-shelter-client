import { useEffect, useState, type FC, type FormEvent } from "react";
import style from "./loginPage.module.css";
import { Button } from "../../components/Button/button";
import { useAppDispatch, useAppSelector } from "../../store";
import { accessTokenSelector, loginRequest } from "../../store/authSlice";
import { useNavigate } from "react-router-dom";

interface IState {
    login: string,
    password: string
}


export const LoginPage: FC = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const token = useAppSelector(accessTokenSelector);

    const [state, setState] = useState<IState>({
        login: '',
        password: ''
    })

    useEffect(() => {
        if (token) {
            navigate("/info/requests");
        }
    }, [token]);

    async function handlerLogin(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()

        try {
            await dispatch(loginRequest(state)).unwrap()

            setState({
                login: "",
                password: ""
            });
        } catch (err) {
            console.log(err);
            alert("Неверный логин или пароль");
        }

    }

    return (
        <>
            <form className={style.form} onSubmit={handlerLogin}>
                <h2 className={style.title}>Авторизация</h2>
                <input className={style.input} type="text" name="login" required placeholder="Логин" onInput={(e: React.ChangeEvent<HTMLInputElement>) => { setState({ ...state, login: e.target.value }) }}></input>
                <input className={style.input} type="password" name="password" required placeholder="Пароль" onInput={(e: React.ChangeEvent<HTMLInputElement>) => { setState({ ...state, password: e.target.value }) }}></input>
                <Button type='submit' variant="brownButton">Войти</Button>
            </form>
        </>

    )
}