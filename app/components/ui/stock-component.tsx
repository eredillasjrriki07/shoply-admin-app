import { useEffect, useState } from "react";
import { InputField } from "~/components/ui/field-component";

interface StockViewProps {
    onUnitsChange: (value: number) => void;
};

interface StockCountDefaultProps extends StockViewProps {
    units: number;
};

export const StockCountDefault = ({ units, onUnitsChange }: StockCountDefaultProps) => {
    return (
        <div className="flex items-start">
            <InputField
                label="Units in stock"
                type="number"
                value={units}
                onChange={onUnitsChange}
            />
            <span className="block mt-4 ml-4 text-sm text-gray-500">Add sizes or colors above to track stock per variant.</span>
        </div>
    );
};

interface StockListViewProps extends StockViewProps {
    variants: Array<string>;
};

export const StockListView = ({ variants, onUnitsChange }: StockListViewProps) => {
    const [stocks, setStocks] = useState<Record<string, number>>({});

    useEffect(() => {
        setStocks((prev) => Object.fromEntries(variants.map((v) => [v, prev[v] ?? 0])));
    }, [variants]);

    useEffect(() => {
        const totalUnits = Object.values(stocks).reduce((prev, curr) => prev + curr, 0);
        onUnitsChange(totalUnits);
    }, [stocks]);

    return (
        <div className="flex flex-col gap-2">
            {Object.entries(stocks).map(([variant, value]) =>
                <div
                    key={variant}
                    className="flex-1 flex justify-between items-center border border-gray-200 rounded-lg bg-gray-100 p-2"
                >
                    <span className="text-sm font-semibold">{variant}</span>
                    <InputField
                        type="number"
                        className="bg-white text-end px-1"
                        value={value}
                        onChange={(v) => {
                            setStocks((prev) => ({ ...prev, [variant]: Number(v) }));
                        }
                        }
                    />
                </div>
            )}
        </div>
    );
};

interface StockGridViewProps extends StockViewProps {
    sizes: Array<string>;
    colors: Array<string>;
};

export const StockGridView = ({ sizes, colors, onUnitsChange }: StockGridViewProps) => {
    const [stocks, setStocks] = useState<Record<string, Record<string, number>>>({});

    useEffect(() => {
        setStocks((prev) => Object.fromEntries(colors.map((color) => [color, Object.fromEntries(sizes.map((size) => [size, prev[color]?.[size] ?? 0]))])));
    }, [sizes, colors]);

    useEffect(() => {
        const total = Object.values(stocks)
            .flatMap(Object.values)
            .reduce((sum, n) => sum + n, 0);
        onUnitsChange(total);
    }, [stocks]);


    return (
        <div className="overflow-x-auto bg-gray-200 border border-gray-300 rounded-lg space-y-px">
            <div className="grid grid-flow-col gap-px bg-gray-100">
                <div className="flex justify-start items-center w-full min-w-28 text-xs uppercase font-bold text-gray-500 py-3 px-2">size →<br />↓ colors</div>
                {sizes.map(size => <div key={size} className="flex justify-center items-center min-w-28 text-xs font-bold text-gray-500">{size}</div>)}
                <div className="flex justify-center items-center min-w-28 text-xs uppercase font-bold text-gray-500">total</div>
            </div>
            {Object.entries(stocks).map(([stockColor, stockSizes]) =>
                <div key={stockColor} className="grid grid-flow-col gap-px bg-gray-100 border-gray-300">
                    <div className="flex justify-start items-center w-full min-w-28 text-xs font-bold text-gray-500 justify-self-start px-2">{stockColor}</div>
                    {Object.entries(stockSizes).map(([stockSize, stockCount]) =>
                        <div key={`${stockSize}-${stockColor}`} className="flex justify-center items-center min-w-28 text-xs uppercase bg-gray-50 text-gray-500 py-3">
                            <InputField
                                type="number"
                                className="bg-white w-14"
                                value={stockCount}
                                onChange={(v) => {
                                    setStocks((prev) => ({
                                        ...prev,
                                        [stockColor]: { ...prev[stockColor], [stockSize]: Number(v) }
                                    }));
                                }
                                }
                            />
                        </div>
                    )}
                    <div className="flex justify-end items-center w-full min-w-28 uppercase font-bold bg-white text-gray-500 px-2">
                        {Object.values(stockSizes).reduce((sum, n) => sum + n, 0)}
                    </div>
                </div>
            )}
            <div className="grid grid-flow-col gap-px bg-gray-100">
                <div className="flex justify-start items-center w-full min-w-28 text-xs uppercase font-bold text-gray-500 justify-self-start px-2 py-3">Total</div>
                {sizes.map(size =>
                    <div key={`total-${size}`} className="flex justify-center items-center min-w-28 text-xs uppercase font-bold bg-gray-100 text-gray-500 py-1">
                        {Object.values(stocks).reduce((sum, row) => sum + row[size], 0)}
                    </div>
                )}
                <div className="flex justify-end items-center w-full min-w-28 uppercase font-bold bg-blue-600 text-white px-2">
                    {Object.values(stocks).flatMap(Object.values).reduce((sum, n) => sum + n, 0)}
                </div>
            </div>
        </div>
    );
};
