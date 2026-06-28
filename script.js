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

    alert("Converter Page Coming Next...");
});
