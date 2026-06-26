function validateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}






function toggleTheme() {
    const htmlElement = document.documentElement;

    if (htmlElement.classList.contains('dark')) {
        htmlElement.classList.remove('dark');
        localStorage.setItem('theme', 'light');
    } else {
        htmlElement.classList.add('dark');
        localStorage.setItem('theme', 'dark');
    }
}

window.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme');

    if (
        savedTheme === 'dark' ||
        (!savedTheme &&
            window.matchMedia('(prefers-color-scheme: dark)').matches)
    ) {
        document.documentElement.classList.add('dark');
    }
});

const form = document.getElementById("contact-form");

form.addEventListener("submit", async function(e) {
    e.preventDefault();

    const successMsg = document.getElementById("success-message");
    const errorMsg = document.getElementById("error-message");

    successMsg.style.display = "none";
    errorMsg.style.display = "none";

    if (!validateEmail(form.email.value)) {
    errorMsg.innerHTML = "❌ Invalid Email Address!";
    errorMsg.style.display = "block";
    return;
}

    try {
        const response = await fetch(
            "https://script.google.com/macros/s/AKfycbznJAzyVFRy-yRDIHTzNTn6dz1ay5n9RQAglfPvww-8p9plhyW9f-ij1h8S-wL8Qw4Z/exec",
            {
                method: "POST",
                mode: "no-cors",
                headers: {
                    "Content-Type": "application/json"
                },
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
    errorMsg.style.display = "block";
}
});
