function generatePasswordLogic(
  length,
  includeNumbers,
  includeLowercase,
  includeUppercase,
  beginWithLetter,
  includeSymbols,
  noSimilar,
  noDuplicate,
  noSequential
) {
  const lowercaseChars = "abcdefghijklmnopqrstuvwxyz";
  const uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const numbers = "0123456789";
  const symbols = "!\";#$%&'()*+,-./:;<=>?@[]^_`{|}~";

  let characters = "";
  let password = "";

  if (includeLowercase) characters += lowercaseChars;
  if (includeUppercase) characters += uppercaseChars;
  if (includeNumbers) characters += numbers;
  if (includeSymbols) characters += symbols;

  if (beginWithLetter) {
    password += lowercaseChars.charAt(
      Math.floor(Math.random() * lowercaseChars.length)
    );
    characters = characters.slice(10); // Remove the selected lowercase character
  }

  for (let i = 0; i < length; i++) {
    if (i === 0 && beginWithLetter) continue; // Skip adding another character if the first one is a letter
    const randomChar = characters.charAt(
      Math.floor(Math.random() * characters.length)
    );
    password += randomChar;

    if (noDuplicate) characters = characters.replace(randomChar, ""); // Remove the used character

    if (noSimilar) {
      if (randomChar === "l") characters = characters.replace("1", ""); // Remove similar characters
      if (randomChar === "1") characters = characters.replace("l", "");
      if (randomChar === "o") characters = characters.replace("0", "");
      if (randomChar === "0") characters = characters.replace("o", "");
    }

    if (noSequential) {
      const sequentialChars =
        "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
      if (
        sequentialChars.includes(password.charAt(i) + password.charAt(i - 1))
      ) {
        i--; // If the generated character follows the previous character sequentially, regenerate it
      }
    }
  }

  return password;
}

document
  .getElementById("generatePassword")
  .addEventListener("click", function () {
    const passwordLength = document.getElementById("passwordLength").value;
    const includeNumbers = document.getElementById("includeNumbers").checked;
    const includeLowercase =
      document.getElementById("includeLowercase").checked;
    const includeUppercase =
      document.getElementById("includeUppercase").checked;
    const beginWithLetter = document.getElementById("beginWithLetter").checked;
    const includeSymbols = document.getElementById("includeSymbols").checked;
    const noSimilar = document.getElementById("noSimilar").checked;
    const noDuplicate = document.getElementById("noDuplicate").checked;
    const noSequential = document.getElementById("noSequential").checked;
    const quantity = document.getElementById("quantity").value;

    const passwordsDiv = document.getElementById("passwords");
    passwordsDiv.innerHTML = "";

    for (let i = 0; i < quantity; i++) {
      const newPassword = generatePasswordLogic(
        passwordLength,
        includeNumbers,
        includeLowercase,
        includeUppercase,
        beginWithLetter,
        includeSymbols,
        noSimilar,
        noDuplicate,
        noSequential
      );
      const passwordElement = document.createElement("div");
      passwordElement.className = "password-entry";
      passwordElement.innerHTML = `
            <p>${newPassword}</p>
            <button class="copy-button">Copy</button>
        `;
      passwordsDiv.appendChild(passwordElement);

      const copyButton = passwordElement.querySelector(".copy-button");
      copyButton.addEventListener("click", function () {
        copyToClipboard(newPassword);
      });
    }
  });

function copyToClipboard(text) {
  const textarea = document.createElement("textarea");
  textarea.value = text;
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand("copy");
  document.body.removeChild(textarea);
}

// generate password on load

window.onload = function () {
  document.getElementById("generatePassword").click();
};

// added credits to developer div

const developerDiv = document.getElementById("developer");
developerDiv.innerHTML = `
    <p>Developed by <a href="https://github.com/mfaeezshabbir" target="_blank">M Faeez Shabbir</a></p>
`;
