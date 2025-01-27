var urlParams = new URLSearchParams(window.location.search);
var formId = urlParams.get("id");
var formTitleElement = document.getElementById("formTitle");
var dynamicForm = document.getElementById("dynamicForm");
var submitButton = document.getElementById("submitForm");
var savedForms = JSON.parse(localStorage.getItem("forms") || "[]");
if (formId !== null && savedForms[formId]) {
    var form = savedForms[formId];
    formTitleElement.innerText = form.title;
    form.fields.forEach(function (field) {
        var fieldWrapper = document.createElement("div");
        fieldWrapper.innerHTML = "<label>".concat(field.label, "</label> <input type=\"").concat(field.type, "\" name=\"").concat(field.label, "\" required />");
        dynamicForm.appendChild(fieldWrapper);
    });
}
submitButton.addEventListener("click", function () {
    var formData = new FormData(dynamicForm);
    var responses = Object.fromEntries(formData.entries());
    localStorage.setItem("responses_".concat(formId), JSON.stringify(responses));
    alert("Form submitted successfully!");
});
