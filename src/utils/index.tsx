export const showFormattedDate = (dateInput: Date | string): string => {
    const date = new Date(dateInput);
    const options: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: 'long',
        day: '2-digit',
    };
    return new Intl.DateTimeFormat('en-US', options).format(date);
};