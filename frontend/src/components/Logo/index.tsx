import Image from 'next/image'
import React from 'react'
import logoSvg from '../../assets/logo.svg'
import { LogoContainer } from './styles'
// import { Container } from './styles';

const Logo: React.FC = () => {
  return (
    <LogoContainer>
      <Image src={logoSvg} alt="DFCOM"></Image>
    </LogoContainer>
  )
}

export default Logo
