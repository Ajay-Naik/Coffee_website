document.addEventListener("DOMContentLoaded", function () {
  // Handle success/error messages from URL params
  const params = new URLSearchParams(window.location.search);
  const msg = params.get("msg");

  const messages = {
    success: "Message sent successfully!",
    email_required: "Email is required.",
    order_success: "Order placed successfully!",
    order_error: "Order failed.",
    upi_required: "Please enter UPI ID.",
    card_required: "Please enter card details.",
    db_error: "Database connection failed.",
    missing_fields: "Please fill all required fields."
  };

  if (msg && messages[msg]) {
    alert(messages[msg]);
  }

  
});

