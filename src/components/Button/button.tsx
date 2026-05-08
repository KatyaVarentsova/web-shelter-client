import type { FC, ReactNode } from "react";
import style from "./button.module.css";

interface IProps {
    children: ReactNode;
    variant?: 'caramelButton'| 'brownButton' | 'whiteButton' | 'greenButton' | 'redButton';
    onClick?: () => void;
}


export const Button: FC<IProps> = ({ children, variant = 'caramelButton', onClick }) => {

    return (
        <button className={`${style.button} ${style[variant]}`} onClick={onClick}>{children}</button>
    )
}