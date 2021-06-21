interface FormErrorProps {
  className?: string
  children: string
}

export function FormError({ ...props }: FormErrorProps) {
  return (
    <p className={`${props.className} text-sm mt-1 text-red-500 dark:text-red-200 font-bold`}>{props.children}</p>
  )
}
