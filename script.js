/* ======================================================
   DAWI SCRIPT CONVERTER v2.0
   Created & Designed by 100,000,000,000
====================================================== */

// ---------- Global Variables ----------

let dawiCode = 1;

// ---------- Wait until page loads ----------

document.addEventListener("DOMContentLoaded", function () {

    // Splash Screen
    const splash = document.getElementById("splash");
    const dateScreen = document.getElementById("dateScreen");

    if (splash && dateScreen) {

        setTimeout(function () {

            splash.style.display = "none";
            dateScreen.style.display = "block";

        }, 3000);

    }

    // Date Input Formatting
    const codingDate = document.getElementById("codingDate");

    if (codingDate) {

        codingDate.addEventListener("input", formatDateInput);

    }

    // Next Button
    const nextBtn = document.getElementById("nextBtn");

    if (nextBtn) {

        nextBtn.addEventListener("click", processDate);

    }

    // Converter Buttons
    initialiseConverter();

});


// ======================================================
// Automatic Date Formatting
// DDMMYYYY -> DD/MM/YYYY
// ======================================================

function formatDateInput(e) {

    let value = e.target.value;

    value = value.replace(/\D/g, "");

    if (value.length > 8) {
        value = value.substring(0, 8);
    }

    if (value.length > 4) {

        value =
            value.substring(0, 2) +
            "/" +
            value.substring(2, 4) +
            "/" +
            value.substring(4);

    }

    else if (value.length > 2) {

        value =
            value.substring(0, 2) +
            "/" +
            value.substring(2);

    }

    e.target.value = value;

}


// ======================================================
// Process Coding Date
// ======================================================

function processDate() {

    const dateBox = document.getElementById("codingDate");

    let date = dateBox.value.trim();

    if (!isValidDate(date)) {

        alert("Please enter a valid date in DD/MM/YYYY format.");

        return;

    }

    dawiCode = calculateDawiCode(date);

    localStorage.setItem("dawiCode", dawiCode);

    window.location.href = "converter.html";

}


// ======================================================
// Validate Date
// ======================================================

function isValidDate(date) {

    const pattern = /^\d{2}\/\d{2}\/\d{4}$/;

    if (!pattern.test(date)) {

        return false;

    }

    const parts = date.split("/");

    const day = parseInt(parts[0]);

    const month = parseInt(parts[1]);

    const year = parseInt(parts[2]);

    if (month < 1 || month > 12) return false;

    if (day < 1 || day > 31) return false;

    if (year < 1000) return false;

    return true;

}
// ======================================================
// Calculate Hidden DAWI Code
// ======================================================

function calculateDawiCode(date) {

    let digits = date.replace(/\//g, "");

    let sum = 0;

    for (let i = 0; i < digits.length; i++) {

        sum += parseInt(digits[i]);

    }

    while (sum > 9) {

        let temp = 0;

        while (sum > 0) {

            temp += sum % 10;

            sum = Math.floor(sum / 10);

        }

        sum = temp;

    }

    return sum;

}


// ======================================================
// Shift Letter
// ======================================================

function shiftLetter(letter, shift) {

    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    let upper = letter.toUpperCase();

    let index = alphabet.indexOf(upper);

    if (index === -1) return letter;

    let newIndex = (index + shift) % 26;

    let result = alphabet[newIndex];

    if (letter === letter.toLowerCase()) {

        return result.toLowerCase();

    }

    return result;

}


// ======================================================
// Convert Text
// ======================================================

// ======================================================
// Decode Text
// ======================================================

function decodeText(input, shift) {

    let output = "";

    for (let i = 0; i < input.length; i++) {

        let ch = input[i];

        switch (ch) {

            case ".": output += "0"; continue;
            case "!": output += "1"; continue;
            case "^": output += "2"; continue;
            case "%": output += "3"; continue;
            case "#": output += "4"; continue;
            case "&": output += "5"; continue;
            case "@": output += "6"; continue;
            case "?": output += "7"; continue;
            case "*": output += "8"; continue;
            case "$": output += "9"; continue;

        }

        if ((ch >= "A" && ch <= "Z") ||
            (ch >= "a" && ch <= "z")) {

            output += shiftLetter(ch, 26 - shift);

        }

        else {

            output += ch;

        }

    }

    return output;

}
// ======================================================
// Initialise Converter
// ======================================================

function initialiseConverter() {

    const convertBtn = document.getElementById("convertBtn");
    const decodeBtn = document.getElementById("decodeBtn");
    const copyBtn = document.getElementById("copyBtn");
    const clearBtn = document.getElementById("clearBtn");

    // Not on converter page
    if (!convertBtn) return;

    // Read hidden DAWI code
    let shift = parseInt(localStorage.getItem("dawiCode"));

    if (isNaN(shift)) {
        shift = 3;      // Temporary fallback
    }

    // ==========================
    // Convert Button
    // ==========================

    convertBtn.addEventListener("click", function () {

        const inputBox = document.getElementById("inputText");
        const outputBox = document.getElementById("outputText");

        let input = inputBox.value;

        if (input.trim() === "") {

            alert("Please enter some text.");

            inputBox.focus();

            return;

        }

        outputBox.value = convertText(input, shift);

    });
// ==========================
// Decode Button
// ==========================

decodeBtn.addEventListener("click", function () {

    const inputBox = document.getElementById("inputText");
    const outputBox = document.getElementById("outputText");

    let input = inputBox.value;

    if (input.trim() === "") {

        alert("Please enter some text.");

        inputBox.focus();

        return;

    }

    outputBox.value = decodeText(input, shift);

});
    // ==========================
    // Copy Button
    // ==========================

    copyBtn.addEventListener("click", async function () {

        const outputBox = document.getElementById("outputText");

        if (outputBox.value.trim() === "") {

            alert("Nothing to copy.");

            return;

        }

        try {

            await navigator.clipboard.writeText(outputBox.value);

            alert("Copied Successfully!");

        }

        catch (err) {

            outputBox.select();

            document.execCommand("copy");

            alert("Copied Successfully!");

        }

    });

    // ==========================
    // Clear Button
    // ==========================

    clearBtn.addEventListener("click", function () {

        document.getElementById("inputText").value = "";

        document.getElementById("outputText").value = "";

        document.getElementById("inputText").focus();

    });

                             }
