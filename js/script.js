import { getFormattedCurrentDate, formatDatesInContent } from './dateUtils.js';
import {
    addNoteModal,
    archiveTable,
    cancelEditNoteButton, cancelNoteButton,
    categories, closeEditModalButton, closeModalButton,
    contents,
    countTableBody, createNoteButton, editNoteCategorySelect,
    editNoteModal, hiddenMessage,
    icons, mainTable,
    names, noteCategorySelect, saveEditedNoteButton, saveNoteButton, showArchiveTableButton
} from "./variables.js";

import {
    updateCountTable,
    countNotesForCategory,
    updateArchiveTable,
    updateTable
} from './functions.js';

export const rowData = [];
export const archiveData = [];
const currentDate = getFormattedCurrentDate();

categories.forEach((category, index) => {
    const note = {
        name: names[index],
        created: currentDate,
        category: category,
        content: contents[index],
        dates: formatDatesInContent(contents[index]),
        icons: icons
    };
    rowData.push(note);
});

document.addEventListener("DOMContentLoaded", function() {
    let isArchiveTableVisible = false;

    showArchiveTableButton.addEventListener("click", function() {
        isArchiveTableVisible = !isArchiveTableVisible;

        if (isArchiveTableVisible) {
            archiveTable.style.display = "table";
            hiddenMessage.style.display = "none";
            showArchiveTableButton.classList.remove("bi-eye-fill");
            showArchiveTableButton.classList.add("bi-eye-slash-fill");
        } else {
            archiveTable.style.display = "none";
            hiddenMessage.style.display = "block";
            showArchiveTableButton.classList.remove("bi-eye-slash-fill");
            showArchiveTableButton.classList.add("bi-eye-fill");
        }
    });

    categories.forEach(category => {
        const option = document.createElement("option");
        option.value = category;
        option.textContent = category;
        noteCategorySelect.appendChild(option);
        editNoteCategorySelect.appendChild(option.cloneNode(true));

        const row = document.createElement("tr");
        const cell = document.createElement("td");
        cell.textContent = category;
        row.appendChild(cell);

        const noteCountCell = document.createElement("td");
        noteCountCell.textContent = countNotesForCategory(category, rowData);

        const archivedNoteCountCell = document.createElement("td");
        archivedNoteCountCell.textContent = countNotesForCategory(category, archiveData);

        row.appendChild(noteCountCell);
        row.appendChild(archivedNoteCountCell);

        countTableBody.appendChild(row);
    });

    createNoteButton.addEventListener("click", function() {
        document.getElementById("noteName").value = "";
        document.getElementById("noteContent").value = "";

        const noteCategorySelect = document.getElementById("noteCategory");
        let noteCategoryDefault = "";
        if (categories.length > 0) {
            noteCategoryDefault = categories[0];
        }
        noteCategorySelect.value = noteCategoryDefault;

        addNoteModal.show();
    });

    saveNoteButton.addEventListener("click", function() {
        const name = document.getElementById("noteName").value;
        const category = noteCategorySelect.value;
        const content = document.getElementById("noteContent").value;

        const newNote = {
            name: name,
            created: getFormattedCurrentDate(),
            category: category,
            content: content,
            dates: formatDatesInContent(content),
            icons: icons
        };
        rowData.push(newNote);
        updateTable();

        addNoteModal.hide();
    });

    cancelNoteButton.addEventListener("click", function() {
        addNoteModal.hide();
    });

    closeModalButton.addEventListener('click', function() {
        addNoteModal.hide();
    })

    cancelEditNoteButton.addEventListener("click", function() {
        editNoteModal.hide();
    });

    closeEditModalButton.addEventListener('click', function() {
        editNoteModal.hide();
    })

    saveEditedNoteButton.addEventListener("click", function() {
        const editedName = document.getElementById("editNoteName").value;
        const editedCategory = editNoteCategorySelect.value;
        const editedContent = document.getElementById("editNoteContent").value;

        const rowIndex = editNoteModal._element.getAttribute("data-row-index");

        rowData[rowIndex].name = editedName;
        rowData[rowIndex].category = editedCategory;
        rowData[rowIndex].content = editedContent;

        const datesRegex = /\b\d{1,2}\/\d{1,2}\/\d{4}\b/g;
        const datesArray = editedContent.match(datesRegex);

        const formattedDates = datesArray ? datesArray.map(dateStr => {
            const dateParts = dateStr.split('/');
            return `${dateParts[0]}/${dateParts[1]}/${dateParts[2]}`;
        }) : [];

        rowData[rowIndex].dates = formattedDates.join(', ');

        updateTable();

        editNoteModal.hide();
    });

    const observer = new MutationObserver(() => {
        updateCountTable();
    });

    const observerConfig = { childList: true, subtree: true };
    observer.observe(mainTable, observerConfig);

    updateTable();
    updateCountTable();
    updateArchiveTable();
});