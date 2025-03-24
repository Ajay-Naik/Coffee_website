// document.addEventListener("DOMContentLoaded", function () {
//     setTimeout(() => {
//         if (window.location.hash) {
//             const targetSection = document.querySelector(window.location.hash);
//             console.log("Target Section Found:", targetSection); // Debugging Log

//             if (targetSection) {
//                 targetSection.scrollIntoView({ behavior: "smooth" });
//             }
//         }
//     }, 800); // Increased delay to allow page load
// });

// document.querySelectorAll(".service-link").forEach(link => {
//     link.addEventListener("click", function (event) {
//         event.preventDefault();
//         const target = this.getAttribute("href");
//         window.location.href = target;
//         window.location.reload(); // ✅ Ensures proper section scroll
//     });
// });
document.addEventListener("DOMContentLoaded", function () {
    const contactForm = document.getElementById("bookingForm");

    contactForm.addEventListener("submit", function (event) {
        event.preventDefault(); // Prevent default form submission

        // Get form values
        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const phone = document.getElementById("number").value.trim();
        // const message = document.getElementById("message").value.trim();
        // const dateInput = document.getElementById("date").value.trim();
        const guestsInput = document.getElementById("guests").value.trim();
        const timeInput = document.getElementById("time").value.trim();
    
        // const dateError = document.getElementById("dateError");
        const guestsError = document.getElementById("guestsError");
        const timeError = document.getElementById("timeError");
        // Regular Expressions
        const nameRegex = /^[A-Za-z\s]{3,50}$/; 
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.com$/; 
        const phoneRegex = /^\d{10}$/; 

        let isValid = true;

        // Validate Name
        if (!nameRegex.test(name)) {
            showError("nameError", "Name should be 3-50 characters and only contain letters.");
            isValid = false;
        } else {
            hideError("nameError");
        }

        // Validate Email
        if (!emailRegex.test(email)) {
            showError("emailError", "Enter a valid email address.");
            isValid = false;
        } else {
            hideError("emailError");
        }

        // Validate Message
        // if (message.length < 10 || message.length > 500) {
        //     showError("messageError", "Message should be between 10 and 500 characters.");
        //     isValid = false;
        // } else {
        //     hideError("messageError");
        // }

        // Validate Phone Number
        if (!phoneRegex.test(phone)) {
            showError("phoneError", "Enter a valid 10-digit phone number.");
            isValid = false;
        } else {
            hideError("phoneError");
        }

    //     const dateRegex = /^(0[1-9]|[12]\d|3[01])(0[1-9]|1[0-2])(19|20)\d\d$/;
    // if (!dateRegex.test(dateInput)) {
    //     dateError.textContent = "Enter a valid date in DD-MM-YYYY format.";
    //     dateError.style.display = "block";
    //     isValid = false;
    // } else {
    //     const dateObject = new Date(year, month - 1, day);
    //     if (dateObject.getFullYear() !== year || dateObject.getMonth() + 1 !== month || dateObject.getDate() !== day) {
    //         dateError.textContent = "Invalid date, please enter a real date.";
    //         dateError.style.display = "block";
    //         isValid = false;
    //     } else {
    //         dateError.style.display = "none";
    //     }
    // }

    // Validate Number of Guests (1-20)
    const guestsRegex = /^[1-9]$|^1[0-9]$|^20$/; // Only allows numbers from 1 to 20
    if (!guestsRegex.test(guestsInput)) {
        guestsError.textContent = "Enter a valid number of guests (1-20).";
        guestsError.style.display = "block";
        isValid = false;
    } else {
        guestsError.style.display = "none";
    }

    // Validate Time (24-hour or 12-hour format)
    const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/i;
    if (!timeRegex.test(timeInput)) {
        timeError.textContent = "Enter a valid time (HH:MM in 24-hour format).";
        timeError.style.display = "block";
        isValid = false;
    } else {
        timeError.style.display = "none";
    }

        // Submit form if valid
        if (isValid) {
            alert("Table Booked successfully!");
            contactForm.reset(); 
            document.getElementById("bookTableModal").style.display = "none";
        }
    });

    // Function to display error messages
    function showError(id, message) {
        const errorElement = document.getElementById(id);
        errorElement.textContent = message;
        errorElement.style.display = "block";
    }

    // Function to hide error messages
    function hideError(id) {
        const errorElement = document.getElementById(id);
        errorElement.style.display = "none";
    }
});


