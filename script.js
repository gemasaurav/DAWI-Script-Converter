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
