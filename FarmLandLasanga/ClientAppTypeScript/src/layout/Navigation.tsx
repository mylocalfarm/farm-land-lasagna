import React, { useState } from 'react'
import { NavLink } from "react-router-dom";
import styled from 'styled-components';
import { themeColorDark, themeColorLight } from '../theme/theme';

const Navigation: React.FC = () => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <StyledNavigation className={isOpen ? "open" : "closed"}>
      <ul className="sidenav__list">
        <li className="sidenav__list-item">
          <NavLink exact to="/" activeClassName="active">Mapbox</NavLink>
        </li>
        <li className="sidenav__list-item">
          <NavLink to="/leaflet" activeClassName="active">Leaflet</NavLink>
        </li>
        <li className="sidenav__list-item">
          <NavLink to="/reactmap" activeClassName="active">ReactMap</NavLink>
        </li>
        <li className="sidenav__list-item">
          <a href="https://www.github.com/shaunluttin/my-local-farm">
            Contribute
            </a>
        </li>
      </ul>
      <StyledHandle onClick={e => setIsOpen(!isOpen)}></StyledHandle>
    </StyledNavigation>
  )
}

export default Navigation;

const StyledNavigation = styled.aside`
  display: flex;
  flex-direction: column;
  grid-area: sidenav;
  background-color: ${themeColorDark};
  height: 100vh;
  z-index: 50;
  position: relative;
  box-shadow: 2px 2px 6px 5px rgba(0,0,0,.3);
  transition: all .5s ease;

  &.closed {
    transform: translateX(-240px);
  }

  .sidenav__list {
        padding: 0;
      margin-top: 85px;
      list-style-type: none;
    }
  .sidenav__list-item {
      transition: all .2s ease;
      padding: 20px 20px 20px 40px;
      color: #ddd;
    }
  .sidenav__list-item:hover {
      background-color: ${themeColorLight};
      cursor: pointer;
    }
    a, a:link {
      color: inherit;
      text-decoration: none;
      display: block;
    }
`

const StyledHandle = styled.div`
  position: absolute;
  height: 30px;
  width: 30px;
  border-radius: 30px;
  text-align: center;
  color: white;
  background-color: ${themeColorDark};
  right: -30px;
  top: 50%;
  cursor: pointer;
  font-weight: bold;
  font-size: 2.4rem;
  box-shadow: 2px 2px 6px 5px rgba(0,0,0,.3);
  transform: translateX(-50%);
  transition: all .3s ease;

    &:hover {
      background-color: ${themeColorLight};
    }
`;