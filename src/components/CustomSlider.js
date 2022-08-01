import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import styles from './css/CustomSlider.module.css';

import Content from '../components/Content';

const CustomSlider = ({ contents, userObj, game }) => {
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div>
      <Slider {...settings} className={styles.slider}>
        {contents.map((content) => (
          <Content
            contentObj={content}
            key={content.id}
            isOwner={content.createdId === userObj.uid}
            game={game}
          />
        ))}
      </Slider>
    </div>
  );
};

export default CustomSlider;
