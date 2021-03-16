interface LabelProps {
  for?: string
  children: string
  color?: string
}

export function Label(props: LabelProps) {
  return (
    <label className={`font-bold ${props.color ? `text-`+props.color : `text-black`}`} htmlFor={props.for}>{props.children}</label>
  )
}
