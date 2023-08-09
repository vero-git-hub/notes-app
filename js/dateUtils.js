export function getFormattedCurrentDate() {
    const currentDate = new Date();
    const createdOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return currentDate.toLocaleDateString('en-US', createdOptions);
}

export function formatDatesInContent(content) {
    const datesRegex = /\b\d{1,2}\/\d{1,2}\/\d{4}\b/g;
    const datesArray = content.match(datesRegex);

    let formattedDates = datesArray ? datesArray.map(dateStr => {
        const dateParts = dateStr.split('/');
        return `${dateParts[0]}/${dateParts[1]}/${dateParts[2]}`;
    }) : [];
    formattedDates = formattedDates.join(', ');

    return formattedDates;
}