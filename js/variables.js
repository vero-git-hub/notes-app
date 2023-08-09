export const mainTable = document.getElementById("mainTable");
export const tableBody = mainTable.querySelector("tbody");
export const noteCategorySelect = document.getElementById("noteCategory");
export const editNoteCategorySelect = document.getElementById("editNoteCategory");
export const countTable = document.getElementById("countTable");
export const countTableBody  = countTable.querySelector("tbody");
export const showArchiveTableButton = document.getElementById("showArchiveTable");
export const archiveTable = document.getElementById("archiveTable");
export const hiddenMessage = document.getElementById("hiddenMessage");
export const createNoteButton = document.getElementById("create-note-btn");
export const saveNoteButton = document.getElementById("saveNoteBtn");
export const cancelNoteButton = document.getElementById("cancelNoteBtn");
export const closeModalButton = document.getElementById("closeModalButton");
export const cancelEditNoteButton = document.getElementById("cancelEditNoteButton");
export const closeEditModalButton =  document.getElementById("closeEditModalButton");
export const saveEditedNoteButton = document.getElementById("saveEditedNoteBtn");
export const archiveTableBody = archiveTable.querySelector("tbody");

export const addNoteModal = new bootstrap.Modal(document.getElementById("addNoteModal"));
export const editNoteModal = new bootstrap.Modal(document.getElementById("editNoteModal"));

export const names = ["Omelet", "Blog", "Programming", "Maldives"];

export const categories = ["Recipes", "Trips", "Studies", "Personal goals"];
export const contents = [
    "Tomatoes are needed for an omelet, buy 12/10/2023",
    "Writing about my recent trip to Italy",
    "3 days a week to study of the new framework: 10/09/2023, 13/09/2023, 15/09/2023",
    "Buy 5/11/2023 or 7/11/2023 tickets to the Maldives",
];
export const icons = [
    "bi bi-pencil-square",
    "bi bi-archive-fill",
    "bi bi-trash-fill"
];