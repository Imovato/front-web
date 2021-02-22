interface InputProps {
  name: string
  type: string
}

export function Input(props: InputProps) {
  return (
    <input className="focus:ring focus:ring-red-200 w-full h-10 px-3 rounded-lg bg-gray-200 mt-2" type={props.type} name={props.name} id={props.name}/>
    )
  }