const formTitleInput = document.getElementById("formTitle") as HTMLInputElement;
const fieldsContainer = document.getElementById("fields") as HTMLDivElement;
const addFieldButton = document.getElementById("addField") as HTMLButtonElement;
const saveFormButton = document.getElementById("saveForm") as HTMLButtonElement;
const savedFormsList = document.getElementById("savedFormsList") as HTMLUListElement;

let formFields: { label: string, type: string }[] = [];

addFieldButton.addEventListener("click", () => {
    const fieldLabel = prompt("Enter field label:");
    const fieldType = prompt("Enter field type (text, number, email):");

    if (fieldLabel && fieldType) {
        formFields.push({ label: fieldLabel, type: fieldType });

        const fieldElement = document.createElement("div");
        fieldElement.innerHTML = `<label>${fieldLabel}</label> <input type="${fieldType}" />`;
        fieldsContainer.appendChild(fieldElement);
    }
});

saveFormButton.addEventListener("click", () => {
    const formTitle = formTitleInput.value.trim();
    
    if (!formTitle) {
        alert("Please enter a form title.");
        return;
    }

    const savedForms = JSON.parse(localStorage.getItem("forms") || "[]");
    savedForms.push({ title: formTitle, fields: formFields });
    localStorage.setItem("forms", JSON.stringify(savedForms));

    alert("Form saved successfully!");
    window.location.reload();
});

// Load saved forms
const loadSavedForms = () => {
    const savedForms = JSON.parse(localStorage.getItem("forms") || "[]");
    savedFormsList.innerHTML = "";

    savedForms.forEach((form: { title: string }, index: number) => {
        const listItem = document.createElement("li");
        listItem.innerHTML = `<a href="form.html?id=${index}">${form.title}</a>`;
        savedFormsList.appendChild(listItem);
    });
};

loadSavedForms();
