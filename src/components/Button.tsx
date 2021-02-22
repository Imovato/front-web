interface ButtonProps {
    children: string
    type?: "submit" | "reset"
}

export function Button(props: ButtonProps) {
    return (
        <button className="w-1/2 transition duration-150 ease-in-out hover:bg-opacity-60 bg-red-500 rounded-lg h-10 text-white" type={props.type}>
            {props.children}
        </button>
    )
}