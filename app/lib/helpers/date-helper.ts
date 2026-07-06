export const formatDateTime = (date: Date) => {
    return date.toLocaleString("en-US", {
        timeZone: "Asia/Manila",
    });
}

export const formatDate = (d: string | Date) =>
    new Date(d).toLocaleDateString('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
    });