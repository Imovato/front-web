interface ButtonProps {
    children: string
    type?: "submit" | "reset"
    color?: string
}

export function Button({ children, color, type }: ButtonProps) {
    return (
        <button className={`w-1/2 transition duration-150 ease-in-out hover:bg-opacity-70 bg-${color ?? "red"}-500 rounded-lg h-10 text-white`} type={type}>
            {children}
        </button>
    )
}
