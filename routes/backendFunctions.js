module.exports = function formBuilder(
  formName,
  labelString,
  placeholderString,
  inputType,
  buttonString
) {
  const form = $("<form>");
  const formGroup = $("<div>");
  const inputLabel = $("<label>");
  const input = $("<input>");
  const button = $("<button>");

  form.addClass(formName);
  form.attr(`data-${formName}`);
  formGroup.addClass("form-group");
  inputLabel.attr("for", `${formName}-Input`);
  inputLabel.text(`${labelString}`);
  input.addClass("form-control");
  input.attr("type", `${inputType}`); //read about bootstrap class form-control
  input.attr("id", `${formName}-input`);
  input.attr("placeholder", `${placeholderString}`);
  button.addClass("btn btn-default");
  button.attr("type", "submit");
  button.text(`${buttonString}`);
  formGroup.append(inputLabel);
  formGroup.append(input);
  form.append(formGroup);
  form.append(alert);
  form.append(button);
  $(`.${formName}`).attr(`data-${formName}`, `${formName}`);
  return form;
};
