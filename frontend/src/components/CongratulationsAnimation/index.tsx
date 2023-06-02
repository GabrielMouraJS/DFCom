import React from 'react'
import Lottie from 'react-lottie'
import animationData from '../../assets/animations/congratulations-animation.json'

const CongratulationsAnimation: React.FC = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  }
  return (
    <Lottie
      options={defaultOptions}
      height={556}
      width={538}
      style={{ margin: 0 }}
    />
  )
}

export default CongratulationsAnimation
