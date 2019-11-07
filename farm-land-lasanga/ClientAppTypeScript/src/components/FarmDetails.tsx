import React from 'react'
import styled from 'styled-components'

export default function FarmDetails({ farm }: { farm: any }) {
  return (
    <StyledFarmDetails>
      {/*       <h2>{farm.properties.NAME}</h2>
      <p>
        <strong>Area:</strong> {farm.properties.SHAPE_Area}
      </p>
      <p>
        <strong>Perimeter:</strong> {farm.properties.SHAPE_Leng}
      </p>
      <p>
        <strong>Status:</strong> {farm.properties.STATUS}
      </p> */}
    </StyledFarmDetails>
  )
}

const StyledFarmDetails = styled.div`
  font-size: 1.6rem;

  h2 {
    font-size: 1.8rem;
  }

  p {

  }
`