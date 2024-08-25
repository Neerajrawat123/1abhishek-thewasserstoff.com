"use client";
import Carousal from "@/app/components/Carousal";
import { useAppDispatch, useAppSelector, useAppStore } from "@/lib/hook";
import Image from "next/image";
import React, { Suspense, useEffect, useRef, useState } from "react";
import styled, { css } from "styled-components";
import imgUrl from "../../../../public/img.webp";
import data from "../../../lib/data.json";
import Card from "@/app/components/Cards";
import reviews from "../../../lib/review";
import CardsReview from "@/app/components/CardsReview";
import { RootState } from "@reduxjs/toolkit/query";
import { useParams } from "next/navigation";
import { getProductDetails } from "../../../lib/features/product/productSlice";
import RelatedProductSec from "@/app/components/RelatedProductSec";
import RelatedProduct from "@/app/components/RelatedProductSec";

const Wrapper = styled.div`
  width: 100%;
  padding: 0 10px;
`;

const HeroSec = styled.div`
  height: 100vh;
  display: flex;
  padding: 6rem 0 0 4rem;
  gap: 3rem;
  border-bottom: 1px solid gray;
`;

const ImgSec = styled.div`
  width: 40%;
  position: relative;

  display: flex;
  gap: 2rem;
`;
const Img = styled(Image)`
  width: 100%;
  height: 100%;
  object-fit: contain;
`;

const ImgsCarousel = styled.div`
  width: 15%;

  display: flex;
  gap: 1rem;
  flex-direction: column;

  > ${Img} {
    border-radius: 20px;
    border: none;
  }
`;

const MainImg = styled.div`
  width: 80%;
  height: 100%;
`;

const InfoSec = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
`;

const Name = styled.div`
  font-size: 2rem;
  font-weight: 700;
`;

const Brand = styled.div`
  font-size: 2rem;
  font-weight: 700;
`;

const Price = styled.div`
  font-size: 1.2rem;
  font-weight: 700;
`;

const Description = styled.div`
  font-size: 1.1rem;
  font-weight: 600;
`;

const QuantitySec = styled.div`
  display: flex;
  gap: 1rem;
`;

const Quantity = styled.select`
  width: 10rem;
  padding: 8px 8px;
  border-radius: 8px;
  font-size: 1.2rem;
`;

const StockDetails = styled.div`
  font-size: 1.2rem;
  font-weight: 700;
`;

const ZoomImg = styled.div`
  left: 43%;
  top: 5%;
  width: 50%;
  height: 90%;
  position: absolute;
  z-index: 10;
`;

const ReviewSection = styled.div`
  max-width: 800px;
  margin: 4rem auto;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Filter = styled.select`
  width: 10rem;

  padding: 8px 8px;
  border-radius: 8px;
  font-size: 1.2rem;
`;

const Heading = styled.h2`
  font-size: 2.5rem;
  margin-bottom: 2rem;
  font-weight: 700;
`;

const LoadingText = styled.p`
font-size: 3rem;
font-weight: 800;
text-align: center;
margin-top: 5rem;`

function Product() {
  const { id } = useParams();

  const product = useAppSelector((state) => state.product.data);
  const [isHover, setIsHover] = useState(false);
  const [price, setPrice] = useState(product?.price);
  const [quantity, setQuantity] = useState(1);
  const [img, setImg] = useState(imgUrl);
  const [cordinates, setCordinates] = useState({ x: null, y: null });
  const imgRef = useRef(null);

  const store = useAppStore();
  const initialized = useRef(false);
  if (!initialized.current) {
    // store.dispatch(initializeProduct(product))
    initialized.current = true;
  }
  console.log(product);
  const productStatus = useAppSelector((state) => state.product.status);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getProductDetails(id));
  }, [id, dispatch]);

  const handlePriceChange = (e) => {
    const price = Math.floor(Number(e.target.value) * product?.price);

    setPrice(price);
  };

  const handleZoom = (e) => {
    const currentTarget = e.currentTarget;
    const x = (e.nativeEvent.offsetX / e.currentTarget.offsetWidth) * 100;
    const y = (e.nativeEvent.offsetY / e.currentTarget.offsetHeight) * 100;

    // setCordinates({x: x, y: y})

    imgRef.current.style.backgroundImage = `url(${img})`;
    imgRef.current.style.backgroundSize = "140%";
    imgRef.current.style.backgroundPosition = `${x}% ${y}%`;

    imgRef.current.style.backgroundRepeat = "no-repeat";
    imgRef.current.style.display = "block";
  };

  const handleLeave = (e) => {
    imgRef.current.style.display = "none";
  };

  if(productStatus === 'loading'){
    return (
      <LoadingText>Content is loading ....</LoadingText>
    )
  }

  return (
    <>
      
        <Wrapper>
        {product && (
          <Suspense fallback={<p>Images are loading...</p>}>
            <HeroSec>
              <ImgSec>
                <ImgsCarousel>
                  {product?.other_images.map((img, index) => (
                    <Img
                      key={index}
                      src={img}
                      alt="product"
                      width={40}
                      height={40}
                      loading="lazy"
                    />
                  ))}
                </ImgsCarousel>

                <MainImg>
                  <Img
                    src={product?.main_image}
                    onMouseMove={handleZoom}
                    onMouseLeave={handleLeave}
                    alt="product"
                    width={400}
                    height={400}
                    loading="lazy"
                  />
                </MainImg>
              </ImgSec>

              <ZoomImg $isHover={isHover} ref={imgRef}></ZoomImg>
              <InfoSec>
                <Name>{product?.name}</Name>
                <Description>{product?.description}</Description>
                <Price>{price}</Price>
                <StockDetails>
                  {product?.stock < 10 ? "low stock" : "IN Stocks"}
                </StockDetails>
                <QuantitySec>
                  <Quantity onChange={handlePriceChange}>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                  </Quantity>
                </QuantitySec>
              </InfoSec>
            </HeroSec>
          </Suspense>
                )}


          <Suspense fallback={<p>Related Products are loading</p>}>
            <RelatedProduct />
          </Suspense>

          <Suspense fallback={<p>Review are loading...</p>}>
            <ReviewSection>
              <Header>
                <Heading>Rating and Reviews</Heading>
                <Filter>
                  <option value="rating">Rating</option>
                  <option value="date">Date</option>
                  <option value="good">Good</option>
                  <option value="bad">Bad</option>
                </Filter>
              </Header>

              {reviews.map((review, index) => (
                <CardsReview key={index} review={review} />
              ))}
            </ReviewSection>
          </Suspense>
        </Wrapper>
    </>
  );
}

export default Product;
