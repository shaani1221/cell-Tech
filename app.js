var formTitleInput = document.getElementById("formTitle");
var fieldsContainer = document.getElementById("fields");
var addFieldButton = document.getElementById("addField");
var saveFormButton = document.getElementById("saveForm");
var savedFormsList = document.getElementById("savedFormsList");
var formFields = [];
addFieldButton.addEventListener("click", function () {
    var fieldLabel = prompt("Enter field label:");
    var fieldType = prompt("Enter field type (text, number, email):");
    if (fieldLabel && fieldType) {
        formFields.push({ label: fieldLabel, type: fieldType });
        var fieldElement = document.createElement("div");
        fieldElement.innerHTML = "<label>".concat(fieldLabel, "</label> <input type=\"").concat(fieldType, "\" />");
        fieldsContainer.appendChild(fieldElement);
    }
});
saveFormButton.addEventListener("click", function () {
    var formTitle = formTitleInput.value.trim();
    if (!formTitle) {
        alert("Please enter a form title.");
        return;
    }
    var savedForms = JSON.parse(localStorage.getItem("forms") || "[]");
    savedForms.push({ title: formTitle, fields: formFields });
    localStorage.setItem("forms", JSON.stringify(savedForms));
    alert("Form saved successfully!");
    window.location.reload();
});
// Load saved forms
var loadSavedForms = function () {
    var savedForms = JSON.parse(localStorage.getItem("forms") || "[]");
    savedFormsList.innerHTML = "";
    savedForms.forEach(function (form, index) {
        var listItem = document.createElement("li");
        listItem.innerHTML = "<a href=\"form.html?id=".concat(index, "\">").concat(form.title, "</a>");
        savedFormsList.appendChild(listItem);
    });
};
loadSavedForms();
