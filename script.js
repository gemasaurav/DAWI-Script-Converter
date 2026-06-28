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

}        case '8': output += '*'; break;
        case '9': output += '$'; break;

        default:
            output += ch;

    }

}

        }

        document.getElementById("outputText").value = output;

    });

}
// ---------- Copy Button ----------

const copyBtn = document.getElementById("copyBtn");

if (copyBtn) {

    copyBtn.addEventListener("click", function () {

        let output = document.getElementById("outputText");

        output.select();
        output.setSelectionRange(0, 99999);

        navigator.clipboard.writeText(output.value);

        alert("Copied Successfully!");

    });

}
// ---------- Clear Button ----------

const clearBtn = document.getElementById("clearBtn");

if (clearBtn) {

    clearBtn.addEventListener("click", function () {

        document.getElementById("inputText").value = "";

        document.getElementById("outputText").value = "";

    });

}
