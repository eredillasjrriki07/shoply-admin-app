interface ButtonProps {
    onClick?: () => void;
    className?: string;
    children?: React.ReactNode;
    disabled?: boolean;
};

const Button = (props: ButtonProps) => {
    return (
        <button
            className={`border border-gray-300 rounded-md cursor-pointer enabled:hover:bg-gray-100 ${props.className} disabled:cursor-not-allowed disabled:opacity-50`}
            onClick={props.onClick}
            disabled={props.disabled}
        >
            {props.children}
        </button>
    );
};

const SubmitButton = (props: ButtonProps) => {
    return (
        <button
            className={`bg-blue-600 text-white font-semibold rounded-lg cursor-pointer enabled:hover:bg-blue-700 ${props.className} disabled:cursor-not-allowed disabled:opacity-50`}
            onClick={props.onClick}
            disabled={props.disabled}
        >
            {props.children}
        </button>
    );
};


Button.Submit = SubmitButton;

export default Button;