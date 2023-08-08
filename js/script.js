const mainTable = document.getElementById("mainTable");
const tableBody = mainTable.querySelector("tbody");
const addNoteModal = new bootstrap.Modal(document.getElementById("addNoteModal"));
const editNoteModal = new bootstrap.Modal(document.getElementById("editNoteModal"));

const names = ["Omelet", "Blog", "Programming", "Maldives"];
const currentDate = getFormattedCurrentDate();
const categories = ["Recipes", "Trips", "Studies", "Personal goals"];
const contents = [
    "Tomatoes are needed for an omelet, buy 12/10/2023",
    "Writing about my recent trip to Italy",
    "3 days a week to study of the new framework: 10/09/2023, 13/09/2023, 15/09/2023",
    "Buy 5/11/2023 or 7/11/2023 tickets to the Maldives",
];

const icons = [
    "bi bi-pencil-square",
    "bi bi-archive-fill",
    "bi bi-trash-fill"
];

const rowData = [];
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

const archiveData = [];

function getFormattedCurrentDate() {
    const currentDate = new Date();
    const createdOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return currentDate.toLocaleDateString('en-US', createdOptions);
}

function formatDatesInContent(content) {
    const datesRegex = /\b\d{1,2}\/\d{1,2}\/\d{4}\b/g;
    const datesArray = content.match(datesRegex);

    let formattedDates = datesArray ? datesArray.map(dateStr => {
        const dateParts = dateStr.split('/');
        return `${dateParts[0]}/${dateParts[1]}/${dateParts[2]}`;
    }) : [];
    formattedDates = formattedDates.join(', ');

    return formattedDates;
}

function updateCountTable() {
    const countTable = document.getElementById("countTable");
    const countTableBody = countTable.querySelector("tbody");

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

document.addEventListener("DOMContentLoaded", function() {
    const noteCategorySelect = document.getElementById("noteCategory");
    const editNoteCategorySelect = document.getElementById("editNoteCategory");
    const countTable = document.getElementById("countTable");
    const countTableBody  = countTable.querySelector("tbody");

    const showArchiveTableButton = document.getElementById("showArchiveTable");
    const archiveTable = document.getElementById("archiveTable");
    const hiddenMessage = document.getElementById("hiddenMessage");

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

    const createNoteButton = document.getElementById("create-note-btn");
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

    const saveNoteButton = document.getElementById("saveNoteBtn");
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

    const cancelNoteButton = document.getElementById("cancelNoteBtn");
    cancelNoteButton.addEventListener("click", function() {
        addNoteModal.hide();
    });

    const closeModalButton = document.getElementById("closeModalButton");
    closeModalButton.addEventListener('click', function() {
        addNoteModal.hide();
    })

    const cancelEditNoteButton = document.getElementById("cancelEditNoteButton");
    cancelEditNoteButton.addEventListener("click", function() {
        editNoteModal.hide();
    });

    const closeEditModalButton =  document.getElementById("closeEditModalButton");
    closeEditModalButton.addEventListener('click', function() {
        editNoteModal.hide();
    })

    const saveEditedNoteButton = document.getElementById("saveEditedNoteBtn");
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

    function createArchiveTableRow(data, index) {
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
        const archiveTable = document.getElementById("archiveTable");
        const archiveTableBody = archiveTable.querySelector("tbody");

        archiveTableBody.innerHTML = "";

        archiveData.forEach((data, index) => {
            const row = createArchiveTableRow(data, index);
            archiveTableBody.appendChild(row);
        });
    }

    updateTable();
    updateCountTable();
    updateArchiveTable();
});