function showXML() {
    if (window.XMLHttpRequest) { // code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp = new XMLHttpRequest();
    } else { // code for IE6, IE5
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.open("GET", "export.xml", false);
    xmlhttp.send();
    xmlDoc = xmlhttp.responseXML;
    value = xmlDoc.getElementsByTagName("form")[0].nodeValue;
    document.getElementById("showXML").innerHTML = value;
}

window.onload = function() {
    showXML();
};