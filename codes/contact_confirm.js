// Contact form confirmation message handler
function showConfirmation(title, message, type = 'success', duration = 2000) {
    // Create overlay
    const overlay = document.createElement('div');
    overlay.className = 'confirmation-overlay show';
    
    // Create popover
    const popover = document.createElement('div');
    popover.className = `confirmation-popover ${type} show`;
    
    // Success icon (checkmark)
    const icon = type === 'success' ? '✓' : type === 'error' ? '✗' : 'ℹ';
    
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
        popover.classList.remove('show');
        overlay.classList.remove('show');
        setTimeout(() => {
            document.body.removeChild(popover);
            document.body.removeChild(overlay);
        }, 300);
    }, duration);
}

window.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const msg = urlParams.get('msg');
    
    if (msg === 'success') {
        showConfirmation(
            'Message Sent!', 
            'Thank you! We will get back to you soon.', 
            'success', 
            3000
        );
        // Clear the URL parameter
        window.history.replaceState({}, document.title, window.location.pathname);
    } else if (msg === 'email_required') {
        showConfirmation(
            'Email Required', 
            'Please provide your email address.', 
            'error', 
            3000
        );
    } else if (msg === 'db_error') {
        showConfirmation(
            'Error', 
            'Sorry, there was an error. Please try again.', 
            'error', 
            3000
        );
    } else if (msg === 'invalid_request') {
        showConfirmation(
            'Invalid Request', 
            'Please submit the form properly.', 
            'error', 
            3000
        );
    }
});
