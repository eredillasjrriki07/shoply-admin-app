export interface PromoCodeEntryProps {
    code: string;
    type: string;
    value: string;
    label: string;
};

export const PromoCodesTableHeaders = [
    { label: 'code', span: 'col-span-3' },
    { label: 'type', span: 'col-span-3' },
    { label: 'value', span: 'col-span-3' },
    { label: 'label', span: 'col-span-3' }
];