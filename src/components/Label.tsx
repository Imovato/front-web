interface LabelProps {
  for?: string
  children: string
  color?: string
  font?: string
  className?: string
}

export function Label(props: LabelProps) {
  return (
    <label
      className={`
        dark:text-red-300
        font-${props.font ?? 'semibold'}
        text-${props.color ?? 'black'}
        ${props.className ?? ''}
      `}
      htmlFor={props.for}
    >
      {props.children}
    </label>
  )
}
