import { useState, type FC, type FormEvent } from "react";
import style from "./loginPage.module.css";
import { Button } from "../../components/Button/button";

interface IProps {
}

interface IState {
    login: string,
    password: string
}


export const LoginPage: FC<IProps> = () => {
    // const dispatch = useAppDispatch()

    const [state, setState] = useState<IState>({
        login: '',
        password: ''
    })

    function handlerLogin(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()

        // dispatch(loginRequest(state))

        setState({
            login: '',
            password: ''
        })

    }

    return (
        <form className={style.form} onSubmit={handlerLogin}>
            <h2 className={style.title}>Авторизация</h2>
            <input className={style.input} type="text" name="login" required placeholder="Логин" onInput={(e: React.ChangeEvent<HTMLInputElement>) => { setState({ ...state, login: e.target.value }) }}></input>
            <input className={style.input} type="password" name="password" required placeholder="Пароль" onInput={(e: React.ChangeEvent<HTMLInputElement>) => { setState({ ...state, password: e.target.value }) }}></input>
            <Button variant="brownButton">Войти</Button>
        </form>
    )
}