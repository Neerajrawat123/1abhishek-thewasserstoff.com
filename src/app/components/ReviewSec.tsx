import React, { useEffect, useMemo, useState } from 'react'
import styled from 'styled-components';
import CardsReview from './CardsReview';
import reviews from "../../lib/review";
import ReviewForm from './ReviewForm';
import axios from 'axios';


interface Review  {
  id: number;
  reviewerName: string;
  avatarUrl: string;
  comment: string;
  date: Date
 review_images: string[];
 rating: number;


}
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

   @media only screen and (max-width: 508px) 
  {
   flex-direction: column;

  }
`;

const Filter = styled.select`
  width: 20rem;

  padding: 8px 8px;
  border-radius: 8px;
  font-size: 1.2rem;
`;

const Heading = styled.h2`
  font-size: 2.5rem;
  margin-bottom: 2rem;
  font-weight: 700;


`;


function ReviewSec() {
  const [loading, setLoading ] = useState(false)
  const [error, setError] = useState(null)

    const [review, setReview] = useState<Review([])
    const [filter, setFilter] = useState('')
    console.log(review)

    useEffect(() => {
      async function fetchData() {

        try {
          const response = await axios.get(process.env.NEXT_PUBLIC_REVIEW_URL as string)
          setLoading(true)
          if(response.status === 200){
  
            setReview(response.data)
            setLoading(false)
          }
          
        } catch (error: any) {
          console.log(error)
          setError(error)
          
        }
       
      }

      fetchData()
    },[])


    useMemo(() => {

        if(filter === 'rating'){
            setReview((prev) => prev.sort((a,b) => a.rating - b.rating))
        }else if(filter === 'date'){
            
            console.log('working')
            console.log(new Date(review[1].date).getTime())
           
            setReview((prev) => prev.sort((a,b) =>  new Date(b.date).getTime() -new Date(a.date).getTime()))


        }


    } , [filter])

   
  return (
<ReviewSection>
              <Header>
                <Heading>Rating and Reviews</Heading>
                <Filter onChange={(e) => setFilter(e.target.value)}>
                <option >Select any value</option>

                  <option value="rating">Rating</option>
                  <option value="date">Date</option>
                 
                </Filter>
              </Header>

              {review.map((review, index) => (
                <CardsReview key={index} review={review} />
              ))}

<ReviewForm />
             
            </ReviewSection>  )
}

export default ReviewSec