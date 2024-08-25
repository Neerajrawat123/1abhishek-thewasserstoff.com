import Image from 'next/image'
import React from 'react'
import styled from 'styled-components'
import { RiStarSFill } from "react-icons/ri";
import Stars from './Stars';

const Wrapper = styled.div`

`

const Profile = styled.div`
display: flex;
gap: 1.5rem;
align-items: center;
`

const ImgWrapper = styled.div`
width: 40px;
height: 40px;
overflow: hidden;
border-radius: 50%;
`

const Name = styled.div`
font-size: 1.4rem;
font-weight: 600;
`

const Comment = styled.div`
padding: 20px 0;
font-size: 1.2rem;
line-height: 1.2rem;`


function CardsReview({review}) {
    const { id, rating, avatarUrl, date, reviewText, reviewerName} = review
  return (
    <Wrapper>
        <Profile>
            <ImgWrapper>
            <Image src={avatarUrl} width={40} height={40} />
            </ImgWrapper>
            <Name>
{reviewerName}
            </Name>

        </Profile>
        <Stars noOfStars={rating} />
       
        <Comment>
            {reviewText}


        </Comment>
    </Wrapper>
  )
}

export default CardsReview