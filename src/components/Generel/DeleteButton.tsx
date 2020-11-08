import React, {
  ButtonHTMLAttributes,
  FC,
  useCallback,
  useRef,
  useState,
} from "react"
import styled from "styled-components"

export interface IDeleteButtonProp
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  onDeleteClickRelease: () => void
}

let timer = 0
const DeleteButton: FC<IDeleteButtonProp> = ({
  onDeleteClickRelease,
  ...rest
}) => {
  const [percent, setPercent] = useState(0)
  const ref = useRef(0)
  ref.current = percent
  const clear = useCallback(() => {
    clearTimeout(timer)
    setPercent(0)
  }, [])
  const timerLoop = useCallback(() => {
    setPercent(ref.current + 5)
    if (ref.current > 95) {
      clear()
      onDeleteClickRelease()
    }
  }, [clear, onDeleteClickRelease])

  const startAnimation = useCallback(() => {
    timer = setInterval(timerLoop, 50)
  }, [timerLoop])

  return (
    <ButtonStyled
      {...rest}
      onMouseDown={startAnimation}
      onMouseUp={clear}
      onMouseLeave={clear}
    >
      {rest.children}
      <IndicatorStyled style={{ width: `${percent}%` }} />
    </ButtonStyled>
  )
}

const IndicatorStyled = styled.div`
  position: absolute;
  background: red;
  left: 0px;
  bottom: 0px;
  height: 2px;
`
const ButtonStyled = styled.button`
  position: relative;
`

export default DeleteButton
