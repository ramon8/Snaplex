import React from 'react';
import styled from 'styled-components';

const CreatureContainer = styled.div`
  width: 200px;
  height: 300px;
  background-color: white;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  overflow: hidden;
`;

const CreatureImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const CreatureName = styled.h2`
  font-size: 24px;
  font-weight: bold;
  margin: 16px;
  color: black;
`;

function Creature({ name, imageUrl }: any) {
    return (
        <CreatureContainer>
            <CreatureImage src={imageUrl} alt={name} />
            <CreatureName>{name}</CreatureName>
        </CreatureContainer>
    );
}

export default Creature;