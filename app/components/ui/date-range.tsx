const DateRange = () => {
    return (
        <>
            <div className="flex items-center gap-2 bg-white border border-gray-200 p-1 rounded-lg">
                <button className="bg-gray-200 text-sm font-semibold px-3 py-1 rounded-lg cursor-pointer">7d</button>
                <button className="text-sm px-3 py-1 rounded-lg cursor-pointer">30d</button>
                <button className="text-sm px-3 py-1 rounded-lg cursor-pointer">90d</button>
            </div>
        </>
    );
};

export default DateRange;