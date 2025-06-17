// get elememts from html
var siteName = document.querySelector("#siteName");
var siteUrl = document.querySelector("#siteUrl");
var submitBtn = document.querySelector("#submitBtn");
var visitBtn = document.querySelector("#visitBtn");
var deleteBtn = document.querySelector("#deleteBtn");
var tbody = document.querySelector("tbody");
var invalidMsg = document.querySelector("#invalidMsg");
var nameInvalidMsg = document.querySelector("#nameInvalidMsg");
var urlInvalidMsg = document.querySelector("#urlInvalidMsg");
var invalidWarning = document.querySelector("#invalidWarning");
var layer = document.querySelector(".layer");

// functions

function inputValidation(input, msgId) {
  var inputValue = input.value;
  var inputRegex = {
    siteName: /^[A-Z][A-Za-z0-9 ]{1,19}$/,
    siteUrl:
      /^(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})$/,
  };
  var invalidMsg = document.getElementById(msgId);
  if (inputRegex[input.id].test(inputValue)) {
    input.classList.remove("input-style");
    input.classList.remove("is-invalid");
    input.classList.add("is-valid", "form-control");
    invalidMsg.classList.add("d-none");
    return true;
  } else {
    input.classList.remove("input-style");
    input.classList.remove("is-valid");
    input.classList.add("is-invalid", "form-control");
    invalidMsg.classList.remove("d-none");
    return false;
  }
}

function closeinvalidWarning() {
  invalidWarning.classList.add("d-none");
}

function clearInputs() {
  siteName.value = null;
  siteUrl.value = null;
}

function deleteSite(i) {
  sites.splice(sites[i], 1);
  displaySites();
  localStorage.setItem("sites", JSON.stringify(sites));
}

function visitSite(i) {
  var url = sites[i].url;
  window.open(url);
}

function returnSiteRow(i) {
  return `
        <tr class="text-center">
            <td>${i + 1}</td>
            <td>${sites[i].name}</td>
            <td>
              <button
                onclick="visitSite(${i})"
                id="visit-btn"
                class="visit-btn custom-btn"
              >
                <i class="fa-solid fa-eye"></i> Visit
              </button>
            </td>
            <td>
              <button
                onclick="deleteSite(${i})"
                id="delete-btn"
                class="delete-btn custom-btn"
              >
                <i class="fa-solid fa-trash-can"></i> delete
              </button>
            </td>
        </tr>
    `;
}

function displaySites() {
  var row = ``;
  for (var i = 0; i < sites.length; i++) {
    row += returnSiteRow(i);
  }
  tbody.innerHTML = row;
}

function addSite() {
  if (
    inputValidation(siteName, "nameInvalidMsg", /^[A-Z][A-Za-z0-9 ]{1,19}$/) &&
    inputValidation(
      siteUrl,
      "urlInvalidMsg",
      /^(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})$/
    )
  ) {
    var site = {
      name: siteName.value.trim(),
      url: siteUrl.value.trim(),
    };
    sites.push(site);
    localStorage.setItem("sites", JSON.stringify(sites));
    clearInputs();
    displaySites();
    invalidWarning.classList.add("d-none");
    siteName.classList.remove("is-valid", "form-control");
    siteUrl.classList.remove("is-valid", "form-control");
    siteName.classList.add("input-style");
    siteUrl.classList.add("input-style");
  } else {
    invalidWarning.classList.remove("d-none");
  }
}

// statements
var sites = [];
if (localStorage.getItem("sites") != null) {
  sites = JSON.parse(localStorage.getItem("sites"));
  displaySites();
}

// events
document.addEventListener("keyup", (esc) => {
  if (esc.key === "Escape") {
    closeinvalidWarning();
  }
});
