import { useState, type FC } from "react";
import style from "./listCards.module.css"
import { Card } from "../Card/card";
import { Button } from "../Button/button";

export const ListCards: FC = () => {
    const listAnimals = [
        { id: 1, name: "Айди", age: "1 год", gender: "мальчик", type: "dog", image: "https://petsi.net/images/dogbreed/pomeranian.jpg" },
        { id: 2, name: "Мурка", age: "2 года", gender: "девочка", type: "cat", image: "https://upload.wikimedia.org/wikipedia/commons/3/3a/Cat03.jpg" },
        { id: 3, name: "Бим", age: "3 года", gender: "мальчик", type: "dog", image: "https://upload.wikimedia.org/wikipedia/commons/6/6e/Golde33443.jpg" },
        { id: 4, name: "Снежок", age: "8 месяцев", gender: "мальчик", type: "cat", image: "https://upload.wikimedia.org/wikipedia/commons/b/b6/Felis_catus-cat_on_snow.jpg" },
        { id: 5, name: "Луна", age: "1.5 года", gender: "девочка", type: "cat", image: "https://storage.yandexcloud.net/yac-wh-sb-prod-s3-media-03007/uploads/article/49/4dd700a9511ae92194857f08009cae39.webp" },
        { id: 6, name: "Рекс", age: "4 года", gender: "мальчик", type: "dog", image: "https://vetandlife.ru/wp-content/uploads/2023/09/noemi-macavei-katocz-c7bUIRBqapA-unsplash.jpg" },

        { id: 7, name: "Тоша", age: "2 года", gender: "мальчик", type: "dog", image: "https://cdn5.vedomosti.ru/image/2025/51/ssa79/original-11b2.jpg" },
        { id: 8, name: "Белка", age: "1 год", gender: "девочка", type: "dog", image: "https://storage.yandexcloud.net/yac-wh-sb-prod-s3-media-03005/uploads/article/1598/abce4a3bc3a9f343180cc20b81fbbeb4.webp" },
        { id: 9, name: "Барсик", age: "3 года", gender: "мальчик", type: "cat", image: "https://storage.yandexcloud.net/moskvichmag/uploads/2024/08/shutterstock_2386006989.jpg" },
        { id: 10, name: "Нюша", age: "6 месяцев", gender: "девочка", type: "cat", image: "https://upload.wikimedia.org/wikipedia/commons/4/4c/Push_van_cat.jpg" },

        { id: 11, name: "Грей", age: "5 лет", gender: "мальчик", type: "dog", image: "https://s1.stc.all.kpcdn.net/family/wp-content/uploads/2023/02/top-v-luchshie-porody-krupnykh-sobak-960x540-1-960x540.jpg" },
        { id: 12, name: "Дина", age: "2 года", gender: "девочка", type: "dog", image: "https://www.stribuna.ru/upload/resize_cache/iblock/04d/768_512_1/xm6mc1sr0vxs83xpd4k55jynxphsetag.jpg" },
        { id: 13, name: "Сима", age: "1 год", gender: "девочка", type: "cat", image: "https://upload.wikimedia.org/wikipedia/commons/5/5e/Sleeping_cat_on_her_back.jpg" },
        { id: 14, name: "Оскар", age: "4 года", gender: "мальчик", type: "cat", image: "https://icdn.lenta.ru/images/2024/04/10/11/20240410114225773/square_1280_ce4e213dafea5cc66ab7dc1e9ba2a71a.jpg" },

        { id: 15, name: "Макс", age: "3 года", gender: "мальчик", type: "dog", image: "https://progorod43.ru/userfiles/images/image-06-2014/j0syy9lz9zc.jpg" },
        { id: 16, name: "Рада", age: "1.5 года", gender: "девочка", type: "dog", image: "https://api.zapovednik96.ru/upload/iblock/f0e/mops-dlya-nachinayushchih.png" },
        { id: 17, name: "Персик", age: "7 месяцев", gender: "мальчик", type: "cat", image: "https://urmall.ru/upload/medialibrary/cad/1p1oxndvy7dq7prt9me6erco999ey14b.jpg" },
        { id: 18, name: "Кнопка", age: "2 года", gender: "девочка", type: "cat", image: "https://static.tildacdn.com/tild3935-6131-4434-a539-353338383133/shallow-focus-shot-o.jpg" },

        { id: 19, name: "Арчи", age: "6 лет", gender: "мальчик", type: "dog", image: "https://static.insales-cdn.com/files/1/2278/35317990/original/mceu_288641621718726728282-1718726728309.png" },
        { id: 20, name: "Мия", age: "1 год", gender: "девочка", type: "cat", image: "https://urmall.ru/upload/medialibrary/c6b/moofur2dh6v9dro2d30hjbolm22p5zvj.jpg" },

    ]

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