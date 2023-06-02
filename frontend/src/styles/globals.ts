import { createGlobalStyle } from 'styled-components'

export default createGlobalStyle`
  :root {
    --color-primary: #40919D;
    --color-secondary: #B9D944;
    --color-background: #F0F0F5;
    --color-text: #737380;
    --color-margin: #e1e3e5;
    --color-inputBorder: #dcdce5;
    --color-neutral100: #ffffff;
    --color-invalid: #e70000;
  }
  * {
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box;
  }

a {
  text-decoration: none;
  cursor: pointer;
}
body {
  font: 400 14px Roboto, sans-serif;
  background: var(--color-background);
  -webkit-font-smoothing: antialiased;
}

input,
button {
  font: 400 18px Roboto, sans-serif !important;
}

button {
  cursor: pointer;
}

.flex {
  display: flex;
}

@media (max-width: 1080px) {
  html {
    font-size: 93.75%; /* 15px */
  }
}

@media (max-width: 970px) {
  html {
    font-size: 87.5%; /* 14px */
  }
}

@media (max-width: 700px) {
  :root {
    font-size: 75%; /* 12px */
  }
}

@media (max-width: 590px) {
  :root {
    font-size: 62.25%; /* 10px */
  }
}

@keyframes up {
  from {
    opacity: 0;
    transform: translateY(35px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes pop {
  from {
    opacity: 0;
    transform: scale(0);
  }

  to {
    opacity: 1;
    transform: scale(1);
  }
}

.animate-up {
  transform: translateY(35px);
  opacity: 0;

  animation: up 200ms forwards;
}

.delay-1 {
  animation-delay: 100ms;
}

.delay-2 {
  animation-delay: 200ms;
}

#logo {
  width: 13rem;
  height: 3rem;
}

#top {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.relative {
  position: relative;
}
`
