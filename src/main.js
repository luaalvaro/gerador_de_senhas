function generatePassword(length, options) {
  const { useUppercase, useLowercase, useNumbers, useSpecialChars } = options;

  const UPPERCASE_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const LOWERCASE_CHARS = "abcdefghijklmnopqrstuvwxyz";
  const NUMBER_CHARS = "0123456789";
  const SPECIAL_CHARS = "!@#$%^&*()_+[]{}|;:,.<>?";

  let charPool = "";

  if (useUppercase) charPool += UPPERCASE_CHARS;
  if (useLowercase) charPool += LOWERCASE_CHARS;
  if (useNumbers) charPool += NUMBER_CHARS;
  if (useSpecialChars) charPool += SPECIAL_CHARS;

  if (charPool === "") {
    throw new Error("At least one character type must be selected.");
  }

  let password = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charPool.length);
    password += charPool[randomIndex];
  }

  return password;
}

function updatePasswordLengthValue(lengthValueElement, rangeValue) {
  lengthValueElement.value = rangeValue;
}

function handleGeneratePassword() {
  const passwordViewElement = document.getElementById("password-view");
  const passwordLengthElement = document.getElementById("password-length");
  const uppercaseCheckbox = document.getElementById("chkUppercase");
  const lowercaseCheckbox = document.getElementById("chkLowercase");
  const numbersCheckbox = document.getElementById("chkNumbers");
  const specialCharsCheckbox = document.getElementById("chkSpecialChars");

  const length = parseInt(passwordLengthElement.value);
  const useUppercase = uppercaseCheckbox.checked;
  const useLowercase = lowercaseCheckbox.checked;
  const useNumbers = numbersCheckbox.checked;
  const useSpecialChars = specialCharsCheckbox.checked;

  if (!useUppercase && !useLowercase && !useNumbers && !useSpecialChars) {
    alert("At least one character type must be selected.");
    uppercaseCheckbox.checked = true;
    handleGeneratePassword();
    return;
  }

  const password = generatePassword(length, {
    useUppercase,
    useLowercase,
    useNumbers,
    useSpecialChars,
  });

  passwordViewElement.value = password;
}

async function handleCopyPassword() {
  const passwordViewElement = document.getElementById("password-view");
  passwordViewElement.select();
  try {
    await navigator.clipboard.writeText(passwordViewElement.value);
  } catch (error) {
    console.error("Failed to copy password to clipboard:", error);
    alert("Failed to copy password to clipboard.");
  }
}

function onLoad() {
  const lengthValueElement = document.getElementById("password-length-value");
  const generateButton = document.getElementById("btnAction");
  const refreshIcon = document.getElementById("svg-refresh");
  const copyIcon = document.getElementById("svg-copy");
  const lengthRangeElement = document.getElementById("password-length");
  const chkUppercase = document.getElementById("chkUppercase");
  const chkLowercase = document.getElementById("chkLowercase");
  const chkNumbers = document.getElementById("chkNumbers");
  const chkSpecialChars = document.getElementById("chkSpecialChars");

  lengthRangeElement.addEventListener("input", function () {
    updatePasswordLengthValue(lengthValueElement, lengthRangeElement.value);
    handleGeneratePassword();
  });

  chkUppercase.addEventListener("change", handleGeneratePassword);
  chkLowercase.addEventListener("change", handleGeneratePassword);
  chkNumbers.addEventListener("change", handleGeneratePassword);
  chkSpecialChars.addEventListener("change", handleGeneratePassword);

  generateButton.addEventListener("click", handleGeneratePassword);
  refreshIcon.addEventListener("click", handleGeneratePassword);
  copyIcon.addEventListener("click", handleCopyPassword);

  const initialPassword = generatePassword(12, {
    useUppercase: true,
    useLowercase: true,
    useNumbers: true,
    useSpecialChars: true,
  });

  document.getElementById("password-view").value = initialPassword;
}

window.onload = onLoad;
