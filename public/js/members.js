$(document).ready(() => {
  $.get("/api/user_data").then((data) => {
    $(".member-name").text(data.email);
  });

  function createSelectForm(formName) {
    //  create form elements
    const form = $("<form>");
    const formGroup = $("<div>");
    const selectLabel = $("<label>");
    const select = $("<select>");
    const option0 = $("<option>");
    const option1 = $("<option>");
    const option2 = $("<option>");
    const option3 = $("<option>");
    const option4 = $("<option>");
    const inputLabel = $("<label>");
    const input = $("<input>");
    const inputLabel2 = $("<label>");
    const input2 = $("<input>");
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

    selectLabel.attr("id", `${formName}-selectLabel`);
    selectLabel.attr("for", `${formName}-select`);
    selectLabel.text("Select a security question");

    select.addClass("form-control");
    select.attr("id", `${formName}-select`);
    select.attr("type", "text");

    inputLabel.attr("id", `${formName}-inputLabel`);
    inputLabel.attr("for", `${formName}-input`);
    inputLabel.text("Type answer to the security question");

    inputLabel2.attr("id", `${formName}-inputLabel2`);
    inputLabel2.attr("for", `${formName}-input2`);
    inputLabel2.text("Re-type answer");

    input.addClass("form-control");
    input.attr("id", `${formName}-input`);
    input.attr("type", "password");
    input.attr("placeholder", "Enter answer here");

    input2.addClass("form-control");
    input2.attr("id", `${formName}-input2`);
    input2.attr("type", "password");
    input2.attr("placeholder", "Re-type here");

    option0.attr("selected");
    option0.text("Choose...");
    option1.text("What city were you born in?");
    option2.text("What is your mother's maiden name?");
    option3.text("What is the name of your first pet?");
    option4.text("What is your favorite food?");

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
    button.text("Set Security QA");

    //  Append elements into a form component.
    alert.append(alertGlyph);
    alert.append(alertError);
    alert.append(alertMessage);

    select.append(option0);
    select.append(option1);
    select.append(option2);
    select.append(option3);
    select.append(option4);

    formGroup.append(selectLabel);
    formGroup.append(select);
    formGroup.append(inputLabel);
    formGroup.append(input);
    formGroup.append(inputLabel2);
    formGroup.append(input2);

    form.append(formGroup);
    form.append(alert);
    form.append(button);

    $(`.${formName} *`).attr(`data-${formName}`, `${formName}`);
    return form;
  }

  const passwordRecoverySelectForm = createSelectForm(
    "securityQuestionAnswerSetter"
  );
  passwordRecoverySelectForm.appendTo($("#mother"));

  passwordRecoverySelectForm.on("submit", (event) => {
    event.preventDefault();

    const recoveryQuestion = $("#securityQuestionAnswerSetter-select")
      .find(":selected")
      .text();
    const recoveryAnswer = $("#securityQuestionAnswerSetter-input").val();
    const recoveryAnswerRetype = $(
      "#securityQuestionAnswerSetter-input2"
    ).val();
    const passwordInfo = {
      recoveryQuestion,
      recoveryAnswer,
      recoveryAnswerRetype
    };
    $.ajax({
      url: "/api/members/setSecurityQuestionAnswer",
      type: "PUT",
      data: passwordInfo
    })
      .then(() => {
        $("#securityQuestionAnswerSetter-alertMessage").text(" Success!  Security Q/A updated");
        $("#securityQuestionAnswerSetter-alert")
          .removeClass("alert-danger")
          .addClass("alert-success")
          .fadeIn(500);
        passwordRecoverySelectForm.off();
        $("#securityQuestionAnswerSetter-button").hide();
      })
      .catch(handleError);
  });

  function handleError(err) {
    const formName = err.responseJSON.formName;
    const alertMessage = err.responseJSON.msg;
    $(`#${formName}-alertMessage`).text(`${alertMessage}`);
    $(`#${formName}-alert`).fadeIn(500);
  }
});
