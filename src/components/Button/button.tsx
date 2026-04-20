import type { FC, ReactNode } from "react";
import style from "./button.module.css";

interface IProps {
    children: ReactNode;
    variant?: 'caramelButton'| 'brownButton' | 'greenButton' | 'redButton';
}


export const Button: FC<IProps> = ({ children, variant = 'caramelButton' }) => {

    return (
        <button className={`${style.button} ${style[variant]}`}>{children}</button>
    )
}