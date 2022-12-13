export const mapRange = (value: number, istart: number, istop: number, ostart: number, ostop: number) => {
  return ostart + (ostop - ostart) * ((value - istart) / (istop - istart))
}
