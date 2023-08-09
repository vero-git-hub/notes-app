import { getFormattedCurrentDate, formatDatesInContent } from './dateUtils.js';
import {
    addNoteModal,
    archiveTable,
    archiveTableBody, cancelEditNoteButton, cancelNoteButton,
    categories, closeEditModalButton, closeModalButton,
    contents,
    countTableBody, createNoteButton, editNoteCategorySelect,
    editNoteModal, hiddenMessage,
    icons, mainTable,
    names, noteCategorySelect, saveEditedNoteButton, saveNoteButton, showArchiveTableButton,
    tableBody
} from "./variables.js";

const rowData = [];
const archiveData = [];
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

function updateCountTable() {
    categories.forEach(category => {
        const row = Array.from(countTableBody.children).find(row => row.cells[0].textContent === category);
        if (row) {
            const noteCount = countNotesForCategory(category, rowData);
            const archiveNoteCount = countNotesForCategory(category, archiveData);
            row.cells[1].textContent = noteCount;
            row.cells[2].textContent = archiveNoteCount;
        }
    });
}

function countNotesForCategory(category, data) {
    return data.filter(data => data.category === category).length;
}

function createArchiveTableRow(data) {
    const row = document.createElement("tr");

    for (const key in data) {
        if(key!=="icons"){
            const cell = document.createElement("td");
            cell.textContent = data[key];
            row.appendChild(cell);
        }
    }

    const unarchiveIcon = document.createElement("i");
    unarchiveIcon.className = "bi bi-arrow-counterclockwise";
    unarchiveIcon.addEventListener("click", function() {
        const rowIndex = archiveData.indexOf(data);
        const unarchivedRow = archiveData.splice(rowIndex, 1)[0];
        rowData.push(unarchivedRow);
        updateTable();
        updateArchiveTable();
        updateCountTable();
    });

    const iconCell = document.createElement("td");
    iconCell.appendChild(unarchiveIcon);
    row.appendChild(iconCell);

    return row;
}

function updateArchiveTable() {
    archiveTableBody.innerHTML = "";

    archiveData.forEach((data, index) => {
        const row = createArchiveTableRow(data, index);
        archiveTableBody.appendChild(row);
    });
}

function createTableRow(data, index) {
    const row = document.createElement("tr");
    row.setAttribute("data-index", index);

    for (const key in data) {
        const cell = document.createElement("td");

        if (key === "icons") {
            data[key].forEach(iconClass => {
                const icon = document.createElement("i");
                icon.className = iconClass;

                if (iconClass.includes("bi-trash-fill")) {
                    icon.id = "deleteIcon";
                    icon.addEventListener("click", function() {
                        const parentRow = this.closest("tr");
                        const rowIndex = parentRow.getAttribute("data-index");
                        rowData.splice(rowIndex, 1);
                        updateTable();
                    });
                }

                if (iconClass.includes("bi-pencil-square")) {
                    icon.id = "editIcon";
                    icon.addEventListener("click", function() {
                        const parentRow = this.closest("tr");
                        const rowIndex = parentRow.getAttribute("data-index");
                        const noteData = rowData[rowIndex];

                        document.getElementById("editNoteName").value = noteData.name;
                        document.getElementById("editNoteCategory").value = noteData.category;
                        document.getElementById("editNoteContent").value = noteData.content;

                        editNoteModal._element.setAttribute("data-row-index", rowIndex);

                        editNoteModal.show();
                    });
                }

                if (iconClass.includes("bi-archive-fill")) {
                    icon.id = "archiveIcon";
                    icon.addEventListener("click", function() {
                        const parentRow = this.closest("tr");
                        const rowIndex = parentRow.getAttribute("data-index");
                        handleArchiveIconClick(rowIndex);
                    });
                }

                cell.appendChild(icon);
            });
        } else {
            cell.textContent = data[key];
        }

        row.appendChild(cell);
    }
    return row;
}

function updateTable() {
    tableBody.innerHTML = "";

    rowData.forEach((data, index) => {
        const row = createTableRow(data, index);
        tableBody.appendChild(row);
    });
}

function handleArchiveIconClick(rowIndex) {
    const archivedRow = rowData.splice(rowIndex, 1)[0];
    archiveData.push(archivedRow);

    updateTable();
    updateArchiveTable();
    updateCountTable();
}

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
            icons: [
                "bi bi-pencil-square",
                "bi bi-archive-fill",
                "bi bi-trash-fill"
            ]
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