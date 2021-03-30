interface DataProps {
    name: string
    value: any
  }
  
  export function PropertyData(props: DataProps) {
    return (
    <div>
        <p className="text-xl">{props.name}</p>
        <p className="text-lg font-light">{props.value}</p>
    </div>
    )
  }