import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
width: 100%;
height: 10vh;
background-color: #e2c868;
display: flex;
align-items: center;
`

const LogoContainer= styled.div`
padding: 0 10px;
color: white;
display: flex;
justify-content: center;
align-items: center;`

const Logo = styled.span`
font-size: 2rem;
font-weight: 700;`


function Header() {
  return (
    <Wrapper>
        <LogoContainer>
            <Logo>E-commerce</Logo>
        </LogoContainer>

    </Wrapper>
  )
}

export default Header