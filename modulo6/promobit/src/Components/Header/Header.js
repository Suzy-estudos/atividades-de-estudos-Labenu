import React from 'react';
import logo from '../../Assets/logo.jpg';
import { Container } from './style';
import { useNavigate } from 'react-router-dom';

export default function Header() {
  const history = useNavigate()
  return (
    <Container>
      <header>
        <img className='logo' src={logo} alt="logo TMDB" />
      </header>
    </Container>
  )
}