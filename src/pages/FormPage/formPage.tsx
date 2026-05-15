import { useState, type FC } from "react";
import formPicture from "../../assets/formPicture.png"
import style from "./fromPage.module.css"
import { Button } from "../../components/Button/button";
import { formatPhone } from "../../utils/formatPhone";

export const FormPage: FC = () => {
    const [phone, setPhone] = useState('');

    const handlePhone = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {

        const formatted = formatPhone(e.target.value);

        setPhone(formatted);
    };

    return (
        <div className={style.background}>
            <section className={style.sectionForm}>
                <div className={style.textBlockForm}>
                    <h2 className={style.headerForm}>Не смогли определиться с&nbsp;выбором?</h2>
                    <p className={style.textForm}>Мы вас понимаем! Так сложно остановиться на одной из сотен очаровательных мордочек.</p>
                    <p className={style.textForm}>Опытные волонтёры готовы помочь и подобрать кандидатов на роль вашего питомца, просто <span className={style.textUnderliningForm}>расскажите нам максимально подробно,</span> кого вы ищите.</p>
                    <p className={style.textForm}><span className={style.textAllocationForm}>Животные из приюта не имеют породы!</span> На запрос по породе мы не сможем никого предложить. Вам лучше обратиться к заводчикам.</p>
                    <img className={style.imageForm} src={formPicture} alt="Фото пушистых" />
                </div>
                <form className={style.contactForm}>
                    <label className={style.labelForm}>
                        Как вас зовут?
                        <input className={style.inputForm} type="text" placeholder="Катя" />
                    </label>
                    <label className={style.labelForm}>
                        Ваш номер телефона
                        <input className={style.inputForm} type="text" placeholder="+7 (900) 999 99 99" value={phone} onChange={handlePhone}/>
                    </label>
                    <div className={style.groupForm}>
                        <p className={style.titleForm}>Желаемый способ связи</p>
                        <label className={style.checkboxForm}>
                            <input type="checkbox" />
                            <span className={style.customCheckbox}></span>
                            <span>Звонок</span>
                        </label>
                        <label className={style.checkboxForm}>
                            <input type="checkbox" />
                            <span className={style.customCheckbox}></span>
                            <span>Мессенджер</span>
                        </label>
                    </div>
                    <label className={style.labelForm}>
                        Расскажите, кого вы ищите:
                        <textarea className={style.textareaForm}></textarea>
                    </label>
                    <label className={style.checkboxForm}>
                        <input type="checkbox" />
                        <span className={style.customCheckbox}></span>
                        <span>Согласие на обработку персональных данных</span>
                    </label>
                    <Button>Отправить</Button>
                </form>
            </section>
        </div>
    )
}