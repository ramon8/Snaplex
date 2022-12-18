import { Main } from "@components/main";
import { useEffect, useRef, useState } from "react";

const ZOOM = {
  INITIAL: 1,
  MAX: 1.5,
  MIN: .5,
  INCREMENT: .1,
}

export function App() {
  const [zoom, setZoom] = useState<number>(ZOOM.INITIAL);

  const isUp = (deltaY: number) => deltaY < 0;
  const canZoomUp = (zoom: number) => zoom < ZOOM.MAX;
  const canZoomDown = (zoom: number) => zoom > ZOOM.MIN;

  const handleWheelUp = (event: any) => {
    setZoom((prevState: number) => {
      if (!isUp(event.deltaY) && canZoomDown(prevState)) return prevState - ZOOM.INCREMENT;
      else if (isUp(event.deltaY) && canZoomUp(prevState)) return prevState + ZOOM.INCREMENT;
      return prevState;
    });
  }

  useEffect(() => document.addEventListener("wheel", handleWheelUp), [])

  useEffect(() => { document.getElementsByTagName('html')[0].style['zoom' as any] = zoom.toString() }, [zoom])


  return <Main />;
}

export default App;