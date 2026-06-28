// Show Date Screen after 3 seconds
setTimeout(function(){

    document.getElementById("splash").style.display="none";
    document.getElementById("dateScreen").style.display="block";

},3000);

document.getElementById("nextBtn").addEventListener("click",function(){

    let date=document.getElementById("codingDate").value;

    if(date.length!=10){
        alert("Enter date in DD/MM/YYYY format");
        return;
    }

    // Hidden calculation will be added later

    // Remove all / characters
let digits = date.replace(/\//g, "");

// Calculate digit sum
let sum = 0;

for (let i = 0; i < digits.length; i++) {
    sum += parseInt(digits[i]);
}

// Convert to a single digit
while (sum > 9) {
    let temp = 0;

    while (sum > 0) {
        temp += sum % 10;
        sum = Math.floor(sum / 10);
    }

    sum = temp;
}

// Save the hidden code
localStorage.setItem("dawiCode", sum);

// Open converter page
window.location.href = "converter.html";
});
// ---------- DAWI Letter Converter ----------

function shiftLetter(letter, shift) {

    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    let upper = letter.toUpperCase();

    let index = alphabet.indexOf(upper);

    if(index === -1) return letter;

    let newIndex = (index + shift) % 26;

    let newLetter = alphabet[newIndex];

    if(letter === letter.toLowerCase()){
        return newLetter.toLowerCase();
    }

    return newLetter;

}
// ---------- Convert Button ----------

const convertBtn = document.getElementById("convertBtn");

if (convertBtn) {

    convertBtn.addEventListener("click", function () {

        let shift = parseInt(localStorage.getItem("dawiCode"));

        let input = document.getElementById("inputText").value;

        let output = "";

        for (let i = 0; i < input.length; i++) {

            let ch = input[i];

            if ((ch >= 'A' && ch <= 'Z') || (ch >= 'a' && ch <= 'z')) {

                output += shiftLetter(ch, shift);

            } else {

    switch(ch){

        case '0': output += '.'; break;
        case '1': output += '!'; break;
        case '2': output += '^'; break;
        case '3': output += '%'; break;
        case '4': output += '#'; break;
        case '5': output += '&'; break;
        case '6': output += '@'; break;
        case '7': output += '?'; break;
        case '8': output += '*'; break;
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
