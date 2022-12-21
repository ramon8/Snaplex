import { Reorder } from "framer-motion";
import styled from "styled-components";

export const ContainerSlots = styled(Reorder.Group)`
    display: grid;
    grid-auto-flow: column;
    gap: 1rem;
`