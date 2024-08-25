import React from "react";
import { RiStarSLine } from "react-icons/ri";
import { RiStarSFill } from "react-icons/ri";
import { IoStarSharp } from "react-icons/io5"
import styled from "styled-components";

const Wrapper = styled.div`
margin-top: 1rem;`

function Stars({ noOfStars }) {
        return (
            <Wrapper>
    
    {
     Array(5).fill(null).map((_, index) => (
         <IoStarSharp key={index} fill={noOfStars > index ? 'gold' : "#D6DBDF"}/>
     ))
    }

</Wrapper>

        )
    }

export default Stars;

