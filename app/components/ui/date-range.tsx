interface DateRangeProps {
    range: string;
    setRange: (value: string) => void;
};


const DateRange = ({ range, setRange }: DateRangeProps) => {
    return (
        <>
            <div className="flex items-center gap-2 bg-white border border-gray-200 p-1 rounded-lg">
                <button
                    className={`${range === '7d' ? 'bg-gray-200' : ''} text-sm font-semibold px-3 py-1 rounded-lg cursor-pointer`}
                    onClick={() => setRange('7d')}
                >
                    7d
                </button>
                <button
                    className={`${range === '30d' ? 'bg-gray-200' : ''} text-sm font-semibold px-3 py-1 rounded-lg cursor-pointer`}
                    onClick={() => setRange('30d')}
                >
                    30d
                </button>
                <button
                    className={`${range === '90d' ? 'bg-gray-200' : ''} text-sm font-semibold px-3 py-1 rounded-lg cursor-pointer`}
                    onClick={() => setRange('90d')}
                >
                    90d
                </button>
            </div>
        </>
    );
};

export default DateRange;