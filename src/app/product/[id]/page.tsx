"use client";
import Carousal from "@/app/components/Carousal";
import { useAppDispatch, useAppSelector, useAppStore } from "@/lib/hook";
import Image from "next/image";
import React, { Suspense, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import imgUrl from "../../../../public/img.webp";
import { RootState } from "@reduxjs/toolkit/query";
import { useParams } from "next/navigation";
import { getProductDetails } from "../../../lib/features/product/productSlice";
import RelatedProduct from "@/app/components/RelatedProductSec";
import ReviewSec from "@/app/components/ReviewSec";

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

  @media only screen and (max-width: 768px) 
  {
  height: 120vh;
  flex-direction: column-reverse;
    padding: 0;

  }
`;

const ImgSec = styled.div`
  width: 40%;
  position: relative;
  display: flex;
  gap: 2rem;
  @media only screen and (max-width: 768px) 
  {
   flex-direction: column;
   width: 100%;
  padding: 0 10px;

  }
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

  @media only screen and (max-width: 768px) 
  {
   flex-direction: row;
   width: 100%;
  padding: 0 10px;

  }

  

  > ${Img} {
    border-radius: 20px;
    border: none;
    object-fit: contain;
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

  @media only screen and (max-width: 768px) 
  {
  // height: 50vh;
  justify-content: start;
  padding: 0 10px;

  }
`;

const Name = styled.div`
  font-size: 2rem;
  text-align: center;
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

  @media only screen and (max-width: 768px) 
  {
  display: none;
  

  }
`;

const LoadingText = styled.p`
  font-size: 3rem;
  font-weight: 800;
  text-align: center;
  margin-top: 5rem;
`;

function Product() {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const product = useAppSelector((state) => state.product.data);
  const productStatus = useAppSelector((state) => state.product.status);
  const imgRef = useRef<HTMLDivElement>(null);
  const [isHover, setIsHover] = useState(false);
  const [img, setImg] = useState(product?.main_image);
  const [price, setPrice] = useState(product?.price);
  console.log(product)
  console.log(img)

  useEffect(() => {
    dispatch(getProductDetails(id as string));
  }, [id, dispatch]);

  const handlePriceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newPrice = Math.floor(Number(e.target.value) * (product?.price || 0));
    setPrice(newPrice);
  };

  const handleZoom = (e: React.MouseEvent<HTMLImageElement, MouseEvent>) => {
    const x = (e.nativeEvent.offsetX / e.currentTarget.offsetWidth) * 100;
    const y = (e.nativeEvent.offsetY / e.currentTarget.offsetHeight) * 100;

    if (imgRef.current) {
      imgRef.current.style.backgroundImage = `url(${img})`;
      imgRef.current.style.backgroundSize = "120%";
      imgRef.current.style.backgroundPosition = `${x}% ${y}%`;
      imgRef.current.style.backgroundRepeat = "no-repeat";
      imgRef.current.style.display = "block";
    }
  };

  const handleLeave = () => {
    if (imgRef.current) {
      imgRef.current.style.display = "none";
    }
  };

  if (productStatus === "loading") {
    return <LoadingText>Content is loading ....</LoadingText>;
  }

  return (
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
                    onClick={() => setImg(img)}
                      width={40}
                      height={40}
                      loading="lazy"
                    
                   
                  />
                ))}
              </ImgsCarousel>

              <MainImg>
                <Img
                  src={img ? img : product.main_image}
                  onMouseMove={handleZoom}
                  onMouseLeave={handleLeave}
                  alt="product"
                  width={400}
                  height={400}
                  loading="lazy"
                />
              </MainImg>
            </ImgSec>

            <ZoomImg ref={imgRef}></ZoomImg>
            <InfoSec>
              <Name>{product?.name}</Name>
              <Description>{product?.description}</Description>
              <Price>{price ? price : product.price}</Price>
              <StockDetails>
                {product?.stock < 10 ? "low stock" : "In Stock"}
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
        <ReviewSec />
      </Suspense>
    </Wrapper>
  );
}

export default Product;
