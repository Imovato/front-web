export function FormError({...props}) {
  return (
    <p className="text-sm mt-1 text-red-500 font-bold">{props.children}</p>
  )
}
