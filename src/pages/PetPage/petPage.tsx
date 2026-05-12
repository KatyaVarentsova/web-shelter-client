import { useEffect, type FC } from "react";
import style from "./petPage.module.css"
import { useAppDispatch, useAppSelector } from "../../store";
import { useParams } from "react-router-dom";
import { getPetDetails, petDetailsSelector } from "../../store/petDetailsSlice";
import { SliderImages } from "../../components/SliderImages/sliderImages";
import { Button } from "../../components/Button/button";
import { formatAge } from "../../utils/petAge";

export const PetPage: FC = () => {
    const pet = useAppSelector(petDetailsSelector)

    const dispatch = useAppDispatch()
    const { id } = useParams<{ id: string }>();

    useEffect(() => {
        id && dispatch(getPetDetails(id))
    }, [id, dispatch])

    return (
        <>
            <section className={style.sectionFirst}>
                <h2 className={style.title}>{pet.nickname}</h2>
                <div className={style.basicInformation}>
                    <div>
                        <SliderImages images={pet.images} />
                    </div>
                    <div className={style.blockTexts}>
                        <div className={style.blockTags}>
                            {pet.for_family && <p className={style.tag}>Для большой семьи</p>}
                            {pet.for_dogs && <p className={style.tag}>Ладит с собаками</p>}
                            {pet.for_cats && <p className={style.tag}>Ладит с кошками</p>}
                            {pet.is_guest && <p className={style.tag}>На передержке</p>}
                        </div>

                        <div className={style.infoBlock}>

                            <div className={style.infoItem}>
                                <span className={style.label}>Пол:</span>
                                <span className={style.dots}></span>
                                <span className={style.value}>{pet.gender}</span>
                            </div>

                            <div className={style.infoItem}>
                                <span className={style.label}>Возраст:</span>
                                <span className={style.dots}></span>
                                <span className={style.value}>{formatAge(pet.birthday)}</span>
                            </div>

                            <div className={style.infoItem}>
                                <span className={style.label}>Вес:</span>
                                <span className={style.dots}></span>
                                <span className={style.value}>{pet.size} кг</span>
                            </div>

                            <div className={style.infoItem}>
                                <span className={style.label}>Тип шерсти:</span>
                                <span className={style.dots}></span>
                                <span className={style.value}>{pet.wool}</span>
                            </div>

                        </div>
                        <Button>Познакомиться</Button>
                    </div>
                </div>
            </section>

            <section className={style.section}>
                <p className={style.text}>{pet.description}</p>
            </section>
        </>

    )
}