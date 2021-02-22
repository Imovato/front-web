interface LabelProps {
  for: string
  children: string
}

export function Label(props: LabelProps) {
  return (
    <label className="font-bold" htmlFor={props.for}>{props.children}</label>
  )
}