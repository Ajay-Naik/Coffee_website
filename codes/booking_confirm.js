// Booking form confirmation message handler
function showConfirmation(title, message, type = "success", duration = 2000) {
  // Create overlay
  const overlay = document.createElement("div");
  overlay.className = "confirmation-overlay show";

  // Create popover
  const popover = document.createElement("div");
  popover.className = `confirmation-popover ${type} show`;

  // Success icon (checkmark)
  const icon = type === "success" ? "✓" : type === "error" ? "✗" : "ℹ";

  popover.innerHTML = `
        <div class="success-icon">${icon}</div>
        <h3>${title}</h3>
        <p>${message}</p>
    `;

  // Add to page
  document.body.appendChild(overlay);
  document.body.appendChild(popover);

  // Auto-hide after duration
  setTimeout(() => {
    popover.classList.remove("show");
    overlay.classList.remove("show");
    setTimeout(() => {
      document.body.removeChild(popover);
      document.body.removeChild(overlay);
    }, 300);
  }, duration);
}

window.addEventListener("DOMContentLoaded", function () {
  const urlParams = new URLSearchParams(window.location.search);
  const msg = urlParams.get("msg");

  const bookingForm = document.getElementById("bookingForm");
  const bookingDate = document.getElementById("date");

if (bookingDate) {
  const today = new Date().toISOString().split("T")[0];
  bookingDate.min = today;
}
  if (bookingForm) {
    bookingForm.addEventListener("submit", function (e) {
      const selectedDate = document.getElementById("date").value;
        
      const selectedTime = document.getElementById("time").value;

      const now = new Date();

      const today = now.toISOString().split("T")[0];

      if (selectedDate === today) {
        const currentTime =
          now.getHours().toString().padStart(2, "0") +
          ":" +
          now.getMinutes().toString().padStart(2, "0");

        if (selectedTime < currentTime) {
          alert("Please select a future time.");

          e.preventDefault();
        }
      }
    });
  }

  if (msg === "booking_success") {
    showConfirmation(
      "Booking Confirmed!",
      "Your table has been booked. We look forward to serving you!",
      "success",
      3000,
    );
    // Clear the URL parameter
    window.history.replaceState({}, document.title, window.location.pathname);
  } else if (msg === "invalid_booking") {
    showConfirmation(
      "Incomplete Information",
      "Please fill in all required booking details.",
      "error",
      3000,
    );
  } else if (msg === "booking_error") {
    showConfirmation(
      "Booking Error",
      "Sorry, there was an error. Please try again.",
      "error",
      3000,
    );
  }
});
