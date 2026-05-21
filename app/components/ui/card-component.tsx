import type React from "react";

interface CardProps {
    className?: string;
    children?: React.ReactNode;
};

const Card = ({ children, className }: CardProps) => {
    return (
        <div className={`card ${className}`}>
            {children}
        </div>
    );
};

const CardHeader = ({ className, children }: CardProps) => {
    return (
        <div className={`p-4 border-b border-gray-200 ${className}`}>
            {children}
        </div>
    );
};

const CardBody = ({ className, children }: CardProps) => {
    return (
        <div className={`p-5 ${className}`}>
            {children}
        </div>
    );
};

Card.Header = CardHeader;
Card.Body = CardBody;

export default Card;