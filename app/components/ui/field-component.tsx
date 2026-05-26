interface FieldProps {
    label?: string;
    id?: string;
    name?: string;
    className?: string;
    children?: React.ReactNode;
    value?: string | number;
    defaultValue?: string | number;
    onChange?: (value: any) => void;
};

interface InputFieldProps extends FieldProps {
    placeholder?: string;
    type?: React.HTMLInputTypeAttribute | undefined;
};

interface TextAreaProps extends FieldProps {
    cols?: number;
};

export const InputField = (props: InputFieldProps) => {
    return (
        <label className="block text-sm text-gray-600">{props.label}
            <input
                type={props.type}
                placeholder={props.placeholder}
                className={`input-field-general ${props.className}`}
                defaultValue={props.defaultValue}
                value={props.value}
                onChange={(e) => props.onChange?.(e.currentTarget.value)}
            />
        </label>
    );
};

export const TextArea = (props: TextAreaProps) => {
    return (
        <label className="block text-sm text-gray-600">{props.label}
            <textarea
                className={`input-field-general ${props.className}`}
            />
        </label>
    );
};

export const SelectField = (props: FieldProps) => {
    return (
        <div className="flex flex-col">
            <span className="text-sm text-gray-600">{props.label}</span>
            <select
                name={props.name}
                id={props.id}
                className={`border border-gray-200 w-full p-2 rounded-md ${props.className}`}
            >
                {props.children}
            </select>
        </div>
    );
};
