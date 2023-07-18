import styled from '@emotion/styled'
import { AppBar, Toolbar, Typography } from '@mui/material'
import React from 'react'
import {Link} from 'react-router-dom';

const Component = styled(AppBar)`
background: #ffff;
color: #000;

`;

const Container = styled(Toolbar)`
justify-content:center;
& > a {
    padding: 20px;
    color: #000;
    text-decoration:none;
}
`
const Header = () => {
  return (
    <div>
    <Component>
    <Container>
    <Link to='/'>Home</Link>
    <Link to='/about'>About</Link>
    <Link to='/contact'>Contact</Link>
    <Link to='/login'>LogOut</Link>
    

    </Container>
    </Component>
    </div>
  )
}

export default Header