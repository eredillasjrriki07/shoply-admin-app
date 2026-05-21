
interface TableProps {
    className?: string;
    children?: React.ReactNode;
};

const Table = ({ className, children }: TableProps) => {
    return (
        <div className={`border border-gray-200 rounded-xl overflow-auto ${className}`}>
            {children}
        </div>
    );
};

const TableHeader = ({ className, children }: TableProps) => {
    return (
        <div className={`grid bg-gray-100 border-b border-gray-200 p-3 ${className}`}>
            {children}
        </div>
    );
};

const TableBody = ({ className, children }: TableProps) => {
    return (
        <div className={`grid bg-white p-3 ${className}`}>
            {children}
        </div>
    );
};

Table.Header = TableHeader;
Table.Body = TableBody;

export default Table;