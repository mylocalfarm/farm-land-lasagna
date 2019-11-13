import React from 'react'
import Navigation from './Navigation'
import styled from 'styled-components'

const Layout: React.FC = ({ children }) => {
  return (
    <StyledLayout>
      <Navigation />
      <StyledMain>
        {children}
      </StyledMain>
    </StyledLayout>
  )
}
export default Layout

const StyledLayout = styled.div`
  display: grid;
  grid-template-columns: 240px 1fr;
  grid-template-rows: 100vh;
  grid-template-areas:
    "sidenav main";
`;

const StyledMain = styled.main`
  grid-area: main;
  background-color: black;

`;