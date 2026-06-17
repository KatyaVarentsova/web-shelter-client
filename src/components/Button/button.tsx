import type { FC, ReactNode } from "react";
import style from "./button.module.css";

interface IProps {
    children: ReactNode;
    variant?: 'caramelButton'| 'brownButton' | 'whiteButton' | 'greenButton' | 'redButton';
    onClick?: () => void;
    type?: 'button' | 'submit' | 'reset';
}


export const Button: FC<IProps> = ({ children, variant = 'caramelButton', onClick, type }) => {

    return (
        <button className={`${style.button} ${style[variant]}`} type={type ?? 'button'} onClick={onClick}>{children}</button>
    )
}