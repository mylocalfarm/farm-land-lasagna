import React from 'react'
import styled from 'styled-components'

interface IFarm {
  name: string;
  coordinates: number[];
  area: number;
  length: number;
  status: string;
}

export default function FarmDetails({ farm }: { farm: IFarm }) {
  return (
    <StyledFarmDetails>
      <h2>{farm.name}</h2>
      <div className="details">
        <p>
          <strong>Area:</strong> {farm.area}
        </p>
        <p>
          <strong>Perimeter:</strong> {farm.length}
        </p>
        <p>
          <strong>Status:</strong> {farm.status}
        </p>
      </div>
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