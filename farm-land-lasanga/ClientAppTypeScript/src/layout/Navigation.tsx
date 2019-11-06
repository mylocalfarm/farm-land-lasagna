import React from 'react'
import { NavLink } from "react-router-dom";

export default function Navigation() {
  return (
    <ul className="list-horizontal">
      <li>
        <NavLink exact to="/" activeClassName="active">Mapbox</NavLink>
      </li>
      <li>
        <NavLink to="/leaflet" activeClassName="active">Leaflet</NavLink>
      </li>
      <li>
        <NavLink to="/reactmap" activeClassName="active">ReactMap</NavLink>
      </li>
      <li>
        <a href="https://www.github.com/shaunluttin/my-local-farm">
          Contribute
            </a>
      </li>
    </ul>
  )
}
