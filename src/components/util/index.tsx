export const showFormattedDate = (dateInput: Date | string): string => {
    if (!dateInput) {
        return 'N/A'; // or any placeholder text you prefer
    }

    const date = new Date(dateInput);
    if (isNaN(date.getTime())) {
        return 'Invalid Date'; // This will handle cases where dateInput is not a valid date string
    }

    const options: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: 'long',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true // Use 24-hour format
    };
    return new Intl.DateTimeFormat('en-US', options).format(date);
};