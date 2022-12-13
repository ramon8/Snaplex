import styled from "styled-components";
import { Text, TextProps } from './../text'

export const ContainerSite = styled.div`
    display: grid;
    place-items: center;
    gap: 2rem;
    width: 120px;
`

export const SiteInfoContainer = styled.div`
    display: grid;
    place-items: center;

    background: #212121;
    border-radius: .5rem;
    border: 2px solid black;
    box-shadow: 0 4px black;
    text-align: center;

    width: 120px;
    height: 88px;

    padding: 0 1rem;

    position: relative;
    box-sizing: border-box;
`

export const SiteName = styled(Text)`
`

export const SiteDescription = styled.div`
`

export const SiteCardsCotnainer = styled.div((props: any) => `
  display: grid;
  grid-template-columns: 1fr 1fr;
  place-items: center;
  border-radius: 1rem;

  border: 4px solid transparent;
  background: transparent;
  background: ${props['data-cardisdragging'] && '#494949'};
  border-color: ${props['data-hovered'] && '#EEC408'};
  /* background: ${props['data-hovered'] && '#404040'}; */
  transition: .1s;

  height: 137px;
  width: 100%;
`)

export const StyledPower = styled(Text)`
    position: absolute;
    color: #B7B7B7;
`

export const StyledOponentPower = styled(StyledPower)((props: TextProps) => `
    color: ${props.color && props.color};
    top: -25px;
    rotate: 8deg;
`)

export const StyledPlayerPower = styled(StyledPower)((props: TextProps) => `
    color: ${props.color && props.color};
    bottom: -25px;
    rotate: -8deg;
`)
