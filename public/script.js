//dom xss vulnerabilities
document.getElementById("domOutput").innerHTML = location.hash.substring(1);