import React, { ReactNode } from "react";
import Slider from "react-slick";
import styled from "styled-components";
import ProductsCard from "./ProductsCard";
import data from "../../lib/data.json";


const NextArrow = styled(SampleNextArrow)`
width: 3rem;
height: 3rem;

&:before {
color: green;
font-size: 3rem;} `


const PrevArrow = styled(SamplePrevArrow)`
width: 3rem;
height: 3rem;


&:before {
color: green;
font-size: 3rem;} `

const Slide = styled(Slider)`
& .slick-list{
margin: 0 1rem 0 2rem;}
`

function SampleNextArrow(props: any) {
  console.log(props)
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", }}
      onClick={onClick}
    />
  );
}

function SamplePrevArrow(props: any) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block",}}
      onClick={onClick}
    />
  );
}

interface CarousalProps {
  children: React.ReactNode;
}

export default function Carousal({children}: CarousalProps  ) {
  var settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 2,
    initialSlide: 0,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };
  return (
    <Slide {...settings}>
      {children}
    </Slide>
  );
}