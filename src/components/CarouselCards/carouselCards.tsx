import { useState, type FC } from "react";
import style from "./carouselCards.module.css"
import { Card } from "../Card/card";
import { Button } from "../Button/button";
import { listAnimals } from "../../mockData/animals";

export const CarouselCards: FC = () => {
    const [firstItem, setFirstItem] = useState(0)

    const visibleItems = listAnimals.slice(firstItem, firstItem + 4);

    const handlerArrow = (arrow: string) => {
        const step = arrow === 'left' ? 4 : -4;

        setFirstItem((prev) => {
            let newIndex = prev + step;
            if (newIndex >= listAnimals.length) return 0;
            if (newIndex < 0) return listAnimals.length - 4;
            return newIndex;
        })
    }

    return (
        <section className={style.sectionCards}>
            <div className={style.containerSlider}>
                <button onClick={() => handlerArrow('right')}>
                    <svg width="32" height="57" viewBox="0 0 32 57" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <line x1="28.2843" y1="2.82843" x2="2.82843" y2="28.2843" stroke="#3C2922" strokeWidth="4" strokeLinecap="round" />
                        <line x1="28.4558" y1="54.2843" x2="3" y2="28.8285" stroke="#3C2922" strokeWidth="4" strokeLinecap="round" />
                    </svg>
                </button>
                <div className={style.containerCards}>
                    {
                        visibleItems.map((item) => {
                            return <Card
                                key={item.id}
                                id={item.id}
                                name={item.name}
                                age={item.age}
                                gender={item.gender}
                                type={item.type}
                                image={item.image}
                            ></Card>
                        })
                    }
                </div>
                <button onClick={() => handlerArrow('left')}>
                    <svg width="32" height="57" viewBox="0 0 32 57" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <line x1="3" y1="53.4559" x2="28.4558" y2="28" stroke="#3C2922" strokeWidth="4" strokeLinecap="round" />
                        <line x1="2.82843" y1="2" x2="28.2843" y2="27.4558" stroke="#3C2922" strokeWidth="4" strokeLinecap="round" />
                    </svg>
                </button>
            </div >
            <Button>Посмотреть всех животных</Button>
        </section>
    )
}