// Booking Form Submission
document.getElementById('bookingSubmit').addEventListener('click', function(event) {
    event.preventDefault(); 

    let name = document.getElementById('name').value;
    let email = document.getElementById('email').value;
    let number = document.getElementById('number').value;
    let date = document.getElementById('date').value;
    let time = document.getElementById('time').value;
    let guests = document.getElementById('guests').value;

    if (!name || !email || !number || !date || !time || !guests) {
        alert('Please fill in all fields.');
        return;
    }

    alert('Table booked successfully!');
    document.getElementById('bookTableModal').style.display = "none"; 
    document.getElementById("bookingForm").reset(); 
});

//order online form submission
document.getElementById('orderSubmit').addEventListener('click', function(event) {
    event.preventDefault();
    let s = "";
    if (document.getElementById("quantity").value==1) {
        s;
    }else{
        s="'s"
    }
    alert("Order placed for " + document.getElementById("quantity").value + " " + document.getElementById("coffeeType").value + s);
    document.getElementById('orderOnlineModal').style.display = "none";
    document.getElementById("orderForm").reset(); 
});