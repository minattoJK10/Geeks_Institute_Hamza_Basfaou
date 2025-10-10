// src/components/CarouselComponent.js
import React from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // styles du carousel
import { Carousel } from 'react-responsive-carousel';


import hongkong from '../assets/image/Honkong.jpg';
import macao from '../assets/image/Macao.webp';
import japan from '../assets/image/Japan.webp';
import lasvegas from '../assets/image/Las_Vegas.webp';

const CarouselComponent = () => {
    return (
        <div style={{ width: '70%', margin: '0 auto' }}> {/* centre le carousel dans la page */}
            <Carousel
                showThumbs={false}
                autoPlay={true}
                infiniteLoop={true}
                showStatus={false}
                dynamicHeight={true}
            >
                <div>
                    <img src={hongkong} alt="Hong Kong" />
                    <p className="legend">Hong Kong</p>
                </div>
                <div>
                    <img src={macao} alt="Macao" />
                    <p className="legend">Macao</p>
                </div>
                <div>
                    <img src={japan} alt="Japan" />
                    <p className="legend">Japan</p>
                </div>
                <div>
                    <img src={lasvegas} alt="Las Vegas" />
                    <p className="legend">Las Vegas</p>
                </div>
            </Carousel>
        </div>
    );
};

export default CarouselComponent;