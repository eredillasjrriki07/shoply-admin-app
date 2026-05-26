import { useState, type KeyboardEvent } from "react";
import Button from "~/components/ui/button-component";

interface TagInputProps {
    values: Array<string>;
    onChange: (values: Array<string>) => void;
};

const TagInput = ({ values, onChange }: TagInputProps) => {
    const [value, setValue] = useState<string>("");

    const handleAddSize = (value: string) => {
        const size = value.replace(/,/g, "").trim();
        setValue("");
        if (!size || values.some((v) => v.toLowerCase() === size.toLowerCase())) return;
        onChange([...values, size]);
    }

    const handleRemoveSize = (removedValue: string) => {
        const newSizes = values.filter(value => value !== removedValue);
        onChange(newSizes);
    };

    const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
        const separators = [',', 'Enter'];
        if (separators.includes(event.key)) {
            handleAddSize(event.currentTarget.value);
        } else if (event.key === 'Backspace' && (!value && values.length)) {
            onChange(values.slice(0, -1));
        }
    };

    return (
        <div className="border border-gray-200 rounded-lg p-2 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-100 mt-3">
            <div className="flex flex-wrap gap-2">
                {values.map(size =>
                    <div key={size} className="flex gap-2 items-center border border-gray-200 bg-gray-100 rounded-full px-3">
                        <span className="font-semibold">{size}</span>
                        <span
                            className="text-gray-500 cursor-pointer"
                            onClick={() => handleRemoveSize(size)}
                        >×</span>
                    </div>
                )}
            </div>
            <div className="flex gap-2">
                <input
                    type="text"
                    placeholder="e.g. S, M, L"
                    className="flex-1 border-none bg-transparent focus:outline-none focus:ring-0"
                    value={value}
                    onChange={(e) => setValue(e.currentTarget.value)}
                    onBlur={(e) => handleAddSize(e.currentTarget.value)}
                    onKeyDown={handleKeyDown}
                />
                <Button
                    className="bg-gray-100 text-sm font-semibold px-2 py-1 hover:bg-gray-200"
                    onClick={() => handleAddSize(value)}
                >
                    + Add
                </Button>
            </div>
        </div>
    );
};

export default TagInput;