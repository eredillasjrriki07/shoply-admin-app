import { PAGE_LIMIT } from "~/lib/constants/constants";
import Button from "./button-component";
import Card from "./card-component";

interface PageComponentProps {
    page: number;
    count: number;
    setPage: (value: number) => void;
};

export const PageComponent = ({ page, count, setPage }: PageComponentProps) => {

    const maxPage = Math.max(1, Math.ceil(count / PAGE_LIMIT));

    return (
        <Card className="p-3">
            <div className="flex justify-between items-center">
                <p className="text-sm text-gray-500">
                    {`Showing ${(page - 1) * PAGE_LIMIT + 1}–${Math.min(page * PAGE_LIMIT, count)} of ${count}`}
                </p>
                <div className="flex items-center gap-x-5 text-sm">
                    <Button
                        className="px-2 py-1"
                        disabled={page === 1}
                        onClick={() => setPage(page - 1)}
                    >
                        ← Prev
                    </Button>
                    <p className="font-semibold">Page {page} of {maxPage}</p>
                    <Button
                        className="px-2 py-1"
                        disabled={page === maxPage}
                        onClick={() => setPage(page + 1)}
                    >
                        Next →
                    </Button>
                </div>
            </div>
        </Card>
    );
};