export default function InputError({ message, className = "", ...props }) {
    return (
        <p
            {...props}
            className={"text-sm text-red-600 inline-block px-5" + className}
            // si hay mensaje, es visible la x
            style={{ visibility: message ? "visible" : "hidden" }}
        >
            <span className="text-xl">x</span>
        </p>
    );
}
