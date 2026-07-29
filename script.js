function validateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

// Theme Toggle
function toggleTheme() {
    const htmlElement = document.documentElement;

    if (htmlElement.classList.contains("dark")) {
        htmlElement.classList.remove("dark");
        localStorage.setItem("theme", "light");
    } else {
        htmlElement.classList.add("dark");
        localStorage.setItem("theme", "dark");
    }
}

window.addEventListener("DOMContentLoaded", () => {
    const savedTheme = localStorage.getItem("theme");

    if (
        savedTheme === "dark" ||
        (!savedTheme &&
            window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
        document.documentElement.classList.add("dark");
    }
});

// Contact Form
const form = document.getElementById("contact-form");

form.addEventListener("submit", async function (e) {
    e.preventDefault();

    const successMsg = document.getElementById("success-message");
    const errorMsg = document.getElementById("error-message");
    const btn = document.querySelector(".btn-submit");

    successMsg.style.display = "none";
    errorMsg.style.display = "none";

    if (!validateEmail(form.email.value)) {
        errorMsg.innerHTML = "❌ Invalid Email Address!";
        errorMsg.style.display = "block";
        return;
    }

    btn.innerText = "Sending...";
    btn.disabled = true;

    try {

        await fetch(
            "https://script.google.com/macros/s/AKfycbzet4W_pEeX_3RpIrEre45TZjeKZMiFxNUxgMkE6sSX69RhwcruNEO0r3jQOHcHu4pN/exec",
            {
                method: "POST",
                mode: "no-cors",
                body: new URLSearchParams({
                    name: form.name.value,
                    email: form.email.value,
                    subject: form.subject.value,
                    message: form.message.value
                })
            }
        );

        successMsg.style.display = "block";
        form.reset();

    } catch (error) {

        errorMsg.innerHTML = "❌ Failed to send message!";
        errorMsg.style.display = "block";

    } finally {

        btn.innerText = "Submit Message";
        btn.disabled = false;

    }
});
