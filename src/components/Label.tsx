interface LabelProps {
  for?: string
  children: string
  color?: string
  font?: string
}

export function Label(props: LabelProps) {
  return (
    <label className={`font-${props.font ? props.font : 'semibold'} ${props.color ? `text-`+props.color : `text-black`}`} htmlFor={props.for}>{props.children}</label>
  )
}
