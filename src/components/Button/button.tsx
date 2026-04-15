import type { FC, ReactNode } from "react";
import style from "./button.module.css";

interface IProps {
    children: ReactNode;
}


export const Button: FC<IProps> = ({ children }) => {

    return (
        <button className={style.button}>{children}</button>
    )
}