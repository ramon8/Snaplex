import { motion } from 'framer-motion';
import React from 'react';
import styled from 'styled-components';

const CardContainer = styled.div`
  width: 200px;
  height: 300px;
  background-color: white;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  overflow: hidden;
`;

const CardTitle = styled.h2`
  font-size: 24px;
  font-weight: bold;
  margin: 16px;
  color: black;
`;

const CardDescription = styled.p`
  font-size: 16px;
  margin: 16px;
  color: gray;
`;
function Card({ title, description }: any) {
    return (
        <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            drag
            dragElastic={1}
            dragConstraints={{ left: 0, top: 0, right: 0, bottom: 0 }}
        >
            <CardContainer>
                <CardTitle>{title}</CardTitle>
                <CardDescription>{description}</CardDescription>
            </CardContainer>
        </motion.div>
    );
}

export default Card;
