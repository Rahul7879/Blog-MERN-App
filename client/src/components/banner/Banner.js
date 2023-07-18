import styled from '@emotion/styled'
import { Box, Typography } from '@mui/material'
import React from 'react'

const Image = styled(Box)`
background : green ;
width: 100%;
height : 50vh;
display: flex;
align-items: center;
justify-content: center;
flex-direction: column

`;

const Heading = styled(Typography)`
font-size : 70px;
color: #FFFF;
line-height: 1;
`;

const SubHeading = styled(Typography)`
font-size: 20px;
background : #FFFFFFF;
`;



const Banner = () => {
  return (
    <Image>
    <Heading>Blog</Heading>
    <SubHeading> Code for Interview</SubHeading>
    </Image>
  )
}

export default Banner