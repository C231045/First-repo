function validateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

const result = document.getElementById("result");

let output = "";

if (validateEmail("test@gmail.com")) {
    output += "✅ Test 1 Passed <br>";
} else {
    output += "❌ Test 1 Failed <br>";
}

if (!validateEmail("testgmail.com")) {
    output += "✅ Test 2 Passed <br>";
} else {
    output += "❌ Test 2 Failed <br>";
}

if (!validateEmail("abc")) {
    output += "✅ Test 3 Passed <br>";
} else {
    output += "❌ Test 3 Failed <br>";
}

result.innerHTML = output;