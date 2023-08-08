# Note Management Application

This is a note management web application that allows users to create, edit, delete and archive notes. Users also have an overview of the distribution of notes by category.

The app is built using HTML, CSS, JavaScript and Bootstrap. It provides a convenient interface for managing notes.

## Screenshots

![First screen.](/img/first_screen.png "This is a sample image.")
![Modal window.](/img/modal_window.png "This is a sample image.")


## Features

* **View tables:** Notes are displayed as an Active Note Table with different columns. The Count Note Table displays the number of notes by category. The Archive Note Table is designed to display archived notes, initially hidden, visible only after clicking on the eye icon.
* **Create Notes:** Users can create new notes by specifying the name, category, content. The categories are predefined and are selected via a dropdown list.
* **The created and dates fields.** The note creation date is assigned automatically, and the dates field is filled with dates automatically from the content field.
* **Edit Notes:** Notes can be edited to update their name, category, and content. The created and dates fields change automatically.
* **Delete Notes:** An active note (not archived) can be deleted, and it will disappear from the Active Note Table.
* **Archive Notes:** Notes can be archived, moving them from the main table to the archive table. Archived notes can be unzipped and moved back.
* **Note Count Tracking:** The application tracks the number of notes in each category, both in the main table and the archive table. When you move or delete a note, the count is updated.