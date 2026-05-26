interface ButtonProps {
    onClick?: () => void;
    className?: string;
    children?: React.ReactNode;
};

const Button = (props: ButtonProps) => {
    return (
        <button
            className={`border border-gray-300 rounded-md cursor-pointer hover:bg-gray-100 ${props.className}`}
            onClick={props.onClick}
        >
            {props.children}
        </button>
    );
};

const SubmitButton = (props: ButtonProps) => {
    return (
        <button
            className={`bg-blue-600 text-white font-semibold rounded-lg cursor-pointer hover:bg-blue-700 ${props.className}`}
            onClick={props.onClick}
        >
            {props.children}
        </button>
    );
};


Button.Submit = SubmitButton;

export default Button;