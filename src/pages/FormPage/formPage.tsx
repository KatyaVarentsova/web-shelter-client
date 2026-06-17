import { type FC } from "react";
import formPicture from "../../assets/formPicture.png";
import style from "./fromPage.module.css";
import { RequestForm } from "../../components/RequestForm/requestForm";

export const FormPage: FC = () => {
    return (
        <div className={style.background}>
            <section className={style.sectionForm}>
                <div className={style.textBlockForm}>
                    <h2 className={style.headerForm}>
                        Не смогли определиться с&nbsp;выбором?
                    </h2>

                    <p className={style.textForm}>
                        Мы вас понимаем! Так сложно остановиться
                        на одной из сотен очаровательных мордочек.
                    </p>

                    <p className={style.textForm}>
                        Опытные волонтёры готовы помочь и подобрать
                        кандидатов на роль вашего питомца, просто
                        <span className={style.textUnderliningForm}>
                            {" "}
                            расскажите нам максимально подробно,
                        </span>
                        кого вы ищите.
                    </p>

                    <p className={style.textForm}>
                        <span className={style.textAllocationForm}>
                            Животные из приюта не имеют породы!
                        </span>
                        {" "}На запрос по породе мы не сможем никого
                        предложить. Вам лучше обратиться к заводчикам.
                    </p>

                    <img
                        className={style.imageForm}
                        src={formPicture}
                        alt="Фото пушистых"
                    />
                </div>

                <RequestForm></RequestForm>
                
            </section>
        </div>
    );
};