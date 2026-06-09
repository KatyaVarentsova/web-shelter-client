import { useEffect, type FC } from "react";
import style from "./petPage.module.css"
import { useAppDispatch, useAppSelector } from "../../store";
import { useParams } from "react-router-dom";
import { getPetDetails, petDetailsSelector } from "../../store/petDetailsSlice";
import { SliderImages } from "../../components/SliderImages/sliderImages";
import { Button } from "../../components/Button/button";
import { formatAge } from "../../utils/petAge";
import { curatorSelector, getCuratorDetails } from "../../store/curatorDetailsSlice";
import mail from '../../assets/mail.svg';
import vk from '../../assets/vk.svg';
import telegram from '../../assets/telegram.svg';
import whatsapp from '../../assets/whatsapp.svg';
import { CarouselCards } from "../../components/CarouselCards/carouselCards";
import { isOpenFormSelector, setIsOpenForm } from "../../store/modalSlice";
import { Modal } from "../../components/Modal/modal";
import { RequestForm } from "../../components/RequestForm/requestForm";

export const PetPage: FC = () => {
    const messengerIcons: Record<string, string> = {
        telegram,
        whatsapp,
        vk
    };

    const pet = useAppSelector(petDetailsSelector)
    const curator = useAppSelector(curatorSelector)
    const isOpenForm = useAppSelector(isOpenFormSelector)

    const dispatch = useAppDispatch()

    const { id } = useParams<{ id: string }>();

    useEffect(() => {
        id && dispatch(getPetDetails(id))
    }, [id, dispatch])

    useEffect(() => {
        if (pet?.curator_id) {
            dispatch(getCuratorDetails(pet.curator_id));
        }
    }, [pet?.curator_id]);

    useEffect(() => {
        if (isOpenForm) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
    }, [isOpenForm])

    return (
        <>
            {isOpenForm && <div className={style.overlay}></div>}

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
                        <Button onClick={() => { dispatch(setIsOpenForm(true)) }}>Познакомиться</Button>
                    </div>
                </div>
            </section>

            <section className={style.section}>
                <p className={style.text}>{pet.description}</p>
            </section>

            <section className={style.sectionCurator}>
                <div className={`${style.section} ${style.blockCurator}`}>
                    <div>
                        <img className={style.imageCurator} src={curator.image} alt="Фото куратора" />
                    </div>
                    <div className={style.infoCurator}>
                        <h3 className={style.nameCurator}>Куратор: {curator.first_name} {curator.last_name}</h3>
                        {curator.messengers.map((item) => {
                            return item.messenger === 'mail' &&
                                <span className={style.mailCurator} key={item.id}>
                                    <img src={mail} alt='' /><span className={style.textCurator}>{item.nickname}</span>
                                </span>
                        })}
                        <p className={style.textCurator}>{curator.description}</p>
                    </div>
                    <div className={style.messengesCurator}>
                        {curator.messengers.map((item) => {
                            return item.messenger !== 'mail' &&
                                <a href={item.nickname} key={item.id} target='_blank' rel='noreferrer'><img className={style.linkCurator} src={messengerIcons[item.messenger]} alt='' /></a>
                        })}
                    </div>
                </div>
            </section>

            <section className={style.section}>
                <h3 className={style.titleCard}>Вам также могут подойти: </h3>
                <CarouselCards></CarouselCards>
                <Button>Перейти в каталог</Button>
            </section>

            <Modal isOpen={isOpenForm} onClose={() => {
                dispatch(setIsOpenForm(false))
            }}>
                <RequestForm petId={id} />
            </Modal>
        </>

    )
}