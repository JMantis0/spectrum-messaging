$(document).ready(() => {
  const page = $("#mother");
  let account;
  //  Objects is designed for use as arguments for function createInputForm.
  const accountSearchFormData = {
    formName: "accountSearch",
    labelString: "Email address",
    placeholderString: "Email",
    inputType: "email",
    buttonString: "Recover Password"
  };
  const recoveryAnswerFormData = {
    formName: "recoveryAnswer",
    labelString: "",
    placeholderString: "Your Answer",
    inputType: "password",
    buttonString: "Submit Answer"
  };
  const newPasswordFormData = {
    formName: "newPassword",
    labelString: "Enter new password",
    placeholderString: "New password",
    inputType: "password",
    buttonString: "Reset Password"
  };
  const passwordConfirmFormData = {
    formName: "passwordConfirm",
    labelString: "Re-enter new password.",
    placeholderString: "Confirm new password",
    inputType: "password",
    buttonString: "Reset Password"
  };

  function createInputForm(
    formName,
    labelString,
    placeholderString,
    inputType,
    buttonString
  ) {
    //  create form elements
    const form = $("<form>");
    const formGroup = $("<div>");
    const inputLabel = $("<label>");
    const input = $("<input>");
    const alert = $("<div>");
    const alertGlyph = $("<span>");
    const alertError = $("<span>");
    const alertMessage = $("<span>)");
    const button = $("<button>");

    //  assign attributes
    form.addClass(formName);
    form.attr("id", formName);
    form.attr(`data-${formName}`);

    formGroup.addClass("form-group");
    formGroup.attr("id", `${formName}-formGroup`);

    inputLabel.attr("id", `${formName}-inputLabel`);
    inputLabel.attr("for", `${formName}-input`);
    inputLabel.text(`${labelString}`);

    input.addClass("form-control");
    input.attr("id", `${formName}-input`);
    input.attr("type", `${inputType}`);
    input.attr("placeholder", `${placeholderString}`);

    alert.addClass("alert alert-danger");
    alert.attr("id", `${formName}-alert`);
    alert.attr("style", "display:none");
    alert.attr("role", "alert");

    alertGlyph.addClass("glyphicon glyphicon-exclamation-sign");
    alertGlyph.attr("id", `${formName}-alertGlyph`);
    alertGlyph.attr("aria-hidden", "true");

    alertError.addClass("sr-only");
    alertError.attr("id", `${formName}-alertError`);

    alertMessage.addClass("msg");
    alertMessage.attr("id", `${formName}-alertMessage`);

    button.addClass("btn btn-default");
    button.attr("id", `${formName}-button`);
    button.attr("type", "submit");
    button.text(`${buttonString}`);

    //  Append elements into a form component.
    alert.append(alertGlyph);
    alert.append(alertError);
    alert.append(alertMessage);

    formGroup.append(inputLabel);
    formGroup.append(input);

    form.append(formGroup);
    form.append(alert);
    form.append(button);

    $(`.${formName} *`).attr(`data-${formName}`, `${formName}`);
    return form;
  }
  //  Create forms using ...rest syntax on the values of data objects
  const accountSearchFormElement = createInputForm(
    ...Object.values(accountSearchFormData)
  );
  const recoveryAnswerFormElement = createInputForm(
    ...Object.values(recoveryAnswerFormData)
  );
  const newPasswordFormElement = createInputForm(
    ...Object.values(newPasswordFormData)
  );
  const passwordConfirmFormElement = createInputForm(
    ...Object.values(passwordConfirmFormData)
  );

  page.append(accountSearchFormElement);

  //  Add listers to the forms
  accountSearchFormElement.on("submit", (event) => {
    event.preventDefault();
    $(".alert").hide();
    getRecoveryQuestionIfAccountExists();
  });

  recoveryAnswerFormElement.on("submit", (event) => {
    event.preventDefault();
    $(".alert").hide();
    validateUserAnswerAgainstRegisteredRecoveryAnswer();
  });

  newPasswordFormElement.on("submit", (event) => {
    event.preventDefault();
    $(".alert").hide();
    ensureNewPasswordSatisfiesRequirements();
  });

  passwordConfirmFormElement.on("submit", (event) => {
    event.preventDefault();
    $(".alert").hide();
    validateThatUserTypedSamePasswordTwiceAndStoreNewPasswordIntoDatabase();
  });

  // definitions for RESTful functions
  function getRecoveryQuestionIfAccountExists() {
    const searchForThisAccount = $("#accountSearch-input").val();
    account = searchForThisAccount;
    $.post("/api/passwordRecovery/accountSearch", {
      account: searchForThisAccount
    })
      .then((recoveryQuestion) => {
        renderRecoveryQuestionForm(recoveryQuestion);
      })
      .catch(handleError);
  }

  function validateUserAnswerAgainstRegisteredRecoveryAnswer() {
    const userAnswer = $("#recoveryAnswer-input").val();
    $.post("/api/passwordRecovery/validateUserAnswer", {
      email: account,
      recoveryAnswer: userAnswer
    })
      .then(() => {
        renderRecoveryAnswerForm();
      })
      .catch(handleError);
  }

  function ensureNewPasswordSatisfiesRequirements() {
    $.post("/api/passwordRecovery/ensurePasswordRequirements", {
      potentialPassword: $("#newPassword-input").val()
    })
      .then(() => {
        renderNewPasswordForm();
      })
      .catch(handleError);
  }

  function validateThatUserTypedSamePasswordTwiceAndStoreNewPasswordIntoDatabase() {
    const firstPasswordInputText = $("#newPassword-input").val();
    const secondPasswordInputText = $("#passwordConfirm-input").val();
    $.ajax({
      url: "/api/passwordRecovery/confirmAndStoreNewPassword",
      method: "PUT",
      data: {
        email: account,
        password1: firstPasswordInputText,
        password2: secondPasswordInputText
      }
    })
      .then(() => {
        renderSuccessAlertAndLoginButton();
      })
      .catch(handleError);
  }

  //  Error handler renders errors sent from the back end on
  //  using jQuery on the formName to select the right alert
  function handleError(err) {
    const formName = err.responseJSON.formName;
    const alertMessage = err.responseJSON.msg;
    $(`#${formName}-alertMessage`).text(`${alertMessage}`);
    $(`#${formName}-alert`).fadeIn(500);
  }

  //  DOM manipulation functions
  function renderRecoveryQuestionForm(recoveryQuestion) {
    $("#accountSearch-button").hide();
    $("#accountSearch-input").attr("readonly", "true");
    recoveryAnswerFormElement.appendTo(page);
    $("#recoveryAnswer-inputLabel").text(recoveryQuestion);
    $("#recoveryAnswer-input").focus();
  }

  function renderRecoveryAnswerForm() {
    $("#recoveryAnswer-button").hide();
    $("#recoveryAnswer-input").attr("readonly", "true");
    newPasswordFormElement.appendTo(page);
    $("#newPassword-input").focus();
  }

  function renderNewPasswordForm() {
    $("#newPassword-button").hide();
    passwordConfirmFormElement.appendTo(page);
    $("#passwordConfirm-input").focus();
  }

  function renderSuccessAlertAndLoginButton() {
    $("#passwordConfirm-alertMessage").text(" Success!  Password Updated");
    $("#passwordConfirm-alert")
      .removeClass("alert-danger")
      .addClass("alert-success")
      .fadeIn(500);
    passwordConfirmFormElement.off();
    $("#passwordConfirm-button")
      .text("Login")
      .click((event) => {
        event.preventDefault();
        window.location.href = "/login";
      });
  }
});
