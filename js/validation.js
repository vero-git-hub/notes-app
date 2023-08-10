export function validateNoteFields(name, content) {
    if (!name || !content) {
        alert("Please fill in both name and content fields.");
        return false;
    }

    const containsOnlyNumbersForName = /^\d+$/.test(name);
    const containsOnlyNumbersForContent = /^\d+$/.test(content);
    if (containsOnlyNumbersForName || containsOnlyNumbersForContent) {
        alert("Name and content cannot consist of only numbers.");
        return false;
    }

    return true;
}