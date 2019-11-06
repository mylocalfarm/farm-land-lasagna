import React from 'react'

export default function FarmIcon({ handleClick, farmName }) {
  return (
    <button className="marker" onClick={() => handleClick(farmName)}>
      <img src="/images/farm-icon.svg" alt="Farm Icon" />
    </button >
  )
}
