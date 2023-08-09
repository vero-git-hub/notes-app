import {
    archiveTableBody, categories, countTableBody, editNoteModal, icons, tableBody
} from "./variables.js";
import {
    rowData,
    archiveData
} from "./script.js";

export function updateCountTable() {
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

export function countNotesForCategory(category, data) {
    return data.filter(data => data.category === category).length;
}

export function createArchiveTableRow(data) {
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

export function updateArchiveTable() {
    archiveTableBody.innerHTML = "";

    archiveData.forEach((data, index) => {
        const row = createArchiveTableRow(data, index);
        archiveTableBody.appendChild(row);
    });
}

export function createTableRow(data, index) {
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

export function updateTable() {
    tableBody.innerHTML = "";

    rowData.forEach((data, index) => {
        const row = createTableRow(data, index);
        tableBody.appendChild(row);
    });
}

export function handleArchiveIconClick(rowIndex) {
    const archivedRow = rowData.splice(rowIndex, 1)[0];
    archiveData.push(archivedRow);

    updateTable();
    updateArchiveTable();
    updateCountTable();
}