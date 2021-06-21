interface LabelProps {
  for?: string
  children: string
  color?: string
  font?: string
  className?: string
}

export function Label(props: LabelProps) {
  return (
    <label className={`${props.className ? props.className + ' ' : ''}dark:text-red-300 font-${props.font ? props.font : 'semibold'} ${props.color ? `text-` + props.color : `text-black`}`}
      htmlFor={props.for}
    >
      {props.children}
    </label>
  )
}
