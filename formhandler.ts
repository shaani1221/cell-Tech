const urlParams = new URLSearchParams(window.location.search);
const formId = urlParams.get("id");

const formTitleElement = document.getElementById("formTitle") as HTMLHeadingElement;
const dynamicForm = document.getElementById("dynamicForm") as HTMLFormElement;
const submitButton = document.getElementById("submitForm") as HTMLButtonElement;

const savedForms = JSON.parse(localStorage.getItem("forms") || "[]");

if (formId !== null && savedForms[formId]) {
    const form = savedForms[formId];
    formTitleElement.innerText = form.title;

    form.fields.forEach((field: { label: string; type: string }) => {
        const fieldWrapper = document.createElement("div");
        fieldWrapper.innerHTML = `<label>${field.label}</label> <input type="${field.type}" name="${field.label}" required />`;
        dynamicForm.appendChild(fieldWrapper);
    });
}

submitButton.addEventListener("click", () => {
    const formData = new FormData(dynamicForm);
    const responses = Object.fromEntries(formData.entries());

    localStorage.setItem(`responses_${formId}`, JSON.stringify(responses));
    alert("Form submitted successfully!");
});
