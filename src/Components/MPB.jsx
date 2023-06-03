export default function PrimaryButton({
    className = "",
    disabled,
    children,
    ...props
}) {
    return (
        <button
            {...props}
            className={
                `inline-flex items-center px-4 my-2 py-3 border border-transparent rounded-md text-white tracking-widest focus:outline-none focus:ring-offset-2 transition ease-in-out duration-150 ${
                    disabled && "opacity-25"
                } ` + className
            }
            disabled={disabled}
        >
            {children}
        </button>
    );
}
