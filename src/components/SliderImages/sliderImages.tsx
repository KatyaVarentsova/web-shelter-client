import { useState, type FC } from 'react';
import style from "./sliderImages.module.css"
import type { IImage } from '../../types/types';

interface IProps {
    images: IImage[];
}

export const SliderImages: FC<IProps> = ({ images }) => {

    const [currentIndex, setCurrentIndex] = useState(0);

    return (
        <div>
            <div>
                <img
                    src={images[currentIndex].image}
                    alt="Фотография питомца"
                    className={style.bigPicture}
                />
            </div>
            <div className={style.pictures}>
                {images.map((image, index) => (
                    <img
                        key={image.id}
                        src={image.image}
                        alt=""
                        onClick={() => setCurrentIndex(index)}
                        className={style.smallPicture}
                        style={{
                            border:
                                currentIndex === index
                                    ? '2px solid black'
                                    : '2px solid transparent',
                            opacity:
                                currentIndex === index
                                    ? 1
                                    : 0.6
                        }}
                    />
                ))}
            </div>

        </div>
    );
};