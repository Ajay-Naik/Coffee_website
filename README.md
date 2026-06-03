# Coffee Shop Website - Complete Setup & Usage Guide

## 🎯 Quick Start

### 1. **Initial Setup (Database)**
```bash
# Open phpMyAdmin and create database 'coffie' (note: spelling)
# Then run the SQL commands from: database_schema.sql
# This creates all required tables
```

### 2. **Rename Image File**
Run this command in Windows Command Prompt:
```batch
cd c:\xampp\htdocs\coffee_website\images\menu\cold_beverages
ren "Sparkling Water.jpg" "Sparkling_Water.jpg"
```

Or double-click: `rename_image.bat`

### 3. **Access the Website**
- **Main Site**: http://localhost/coffee_website/codes/index.html
- **Order Online**: http://localhost/coffee_website/codes/menu.html
- **Order Dashboard**: http://localhost/coffee_website/codes/admin_orders.html

---

## 📁 Project Structure

```
coffee_website/
├── codes/
│   ├── *.html                    # All page files
│   ├── style.css                 # Main stylesheet
│   ├── menu.css                  # Menu page styles
│   ├── script.js                 # General scripts
│   ├── menu.js                   # Cart & checkout logic
│   ├── *.php                     # Backend scripts
│   ├── admin_orders.html         # Order management
│   └── *.sql                     # Database schemas
├── images/
│   ├── main/                     # Logo, banner images
│   ├── menu/                     # Menu item images
│   ├── services/                 # Service category images
│   ├── gallery/                  # Gallery images
│   └── blog/                     # Blog post images
├── fonts/                        # Custom fonts & icons
└── database_schema.sql           # Database setup script
```

---

## 🔧 Key Features

### Pages Available
1. **index.html** - Home page with hero section and booking modal
2. **menu.html** - Full menu with shopping cart (Order Online)
3. **services.html** - Service categories
4. **about.html** - About the cafe
5. **gallery.html** - Photo gallery
6. **blog.html** - Blog posts
7. **contact.html** - Contact form + details
8. **admin_orders.html** - Order management dashboard

### Core Functionality
- ✅ Responsive design (mobile, tablet, desktop)
- ✅ Shopping cart with add/remove items
- ✅ Multiple payment options (COD, UPI, Card)
- ✅ Order saving to MySQL database
- ✅ Table booking system
- ✅ Contact form
- ✅ Order history tracking
- ✅ Admin dashboard to view all orders

---

## 💾 Database Tables

### `orders` table
Stores main order information:
- id, full_name, address, city, zip_code
- payment_method (COD, UPI, Card)
- upi_id, card_number, expiry_date
- created_at (timestamp)

### `order_items` table
Stores individual items per order:
- id, order_id (FK to orders)
- item_name, item_price, item_quantity
- created_at (timestamp)

### `contact` table
Stores contact form submissions:
- id, name, email, number, message, created_at

### `table_booking` table
Stores table reservations:
- id, name, email, phone_number
- booking_date, booking_time, guests, status
- created_at

---

## 🚀 API Endpoints

### Save Order to Database
**Endpoint**: `save_order_to_db.php`  
**Method**: POST  
**Content-Type**: application/json

**Request body**:
```json
{
  "order": {
    "name": "John Doe",
    "address": "123 Main St",
    "city": "Goa",
    "zip": "12345",
    "paymentMethod": "UPI",
    "upiId": "john@upi",
    "cardNumber": null,
    "cardExpiry": null,
    "items": [
      {"name": "Iced Latte", "price": 200, "quantity": 2},
      {"name": "Croissant", "price": 150, "quantity": 1}
    ]
  }
}
```

**Response**:
```json
{
  "success": true,
  "message": "Order saved successfully",
  "orderId": 42
}
```

---

### Fetch Orders
**Endpoint**: `fetch_orders.php`  
**Method**: GET

**Get single order**:
```
fetch_orders.php?id=42
```

**Get multiple orders**:
```
fetch_orders.php?limit=10&offset=0
```

**Response**:
```json
{
  "success": true,
  "orders": [
    {
      "id": 42,
      "full_name": "John Doe",
      "address": "123 Main St",
      "city": "Goa",
      "payment_method": "UPI",
      "created_at": "2025-03-25 18:30:00"
    }
  ],
  "total": 50,
  "limit": 10,
  "offset": 0
}
```

---

## 🎨 CSS Updates Made

### Navigation Active State
```css
nav ul li a.active {
    color: var(--primary-color);
    background-color: var(--secondary-color);
}
```

### Index Page Buttons
- **First button** (Order Online): Dark yellow bg (#f3961c) with brown text
- **Second button** (Book A Table): Transparent with white border

### Contact Page Layout
- Form on left (50% width)
- Contact details on right (50% width)
- Details aligned side-by-side

### Page Titles
- Consistent styling across all pages
- Dark text with proper spacing
- Orange underline (5px)

---

## 🐛 Bugs Fixed

1. ✅ Navbar `.active` styling not working
2. ✅ Check Order button showing on all pages (now only menu.html)
3. ✅ Image paths with spaces causing 404s (fixed to use underscores)
4. ✅ Contact form not saving name field
5. ✅ Contact page layout (form overlapping with details)
6. ✅ Index page button styling inconsistent
7. ✅ Submit button misaligned on contact page
8. ✅ Orders only saved to localStorage (now saves to database)
9. ✅ Script.js with unnecessary validation code removed/cleaned

---

## 📊 Color Scheme

```css
--primary-color: #621c20;      /* Dark brown/maroon */
--secondary-color: #f3961c;    /* Dark yellow/orange */
--dark-color: #252525;         /* Very dark gray */
--white-color: #fff;           /* White */
--light-gray-color: #f2f2f2;   /* Light gray */
```

---

## 🔐 Security Notes

- All form inputs are trimmed and validated
- Password/UPI sensitive data not logged
- PDO prepared statements prevent SQL injection
- Card numbers shown as last 4 digits only
- Database errors don't expose sensitive info

---

## 🌐 Browser Compatibility

- Chrome/Edge: Full support ✅
- Firefox: Full support ✅
- Safari: Full support ✅
- IE11: Partial support (some CSS features may not work)

---

## 📱 Responsive Breakpoints

```css
@media screen and (max-width: 1024px)  /* Tablets */
@media screen and (max-width: 576px)   /* Mobile phones */
```

---

## 🆘 Troubleshooting

### Images not loading
- Check if image files exist in the correct folder
- Verify path uses underscores (e.g., `cold_beverages` not `cold beverages`)
- Ensure filenames match exactly (case-sensitive on some servers)

### Orders not saving
- Check database connection in `connect.php`
- Verify `orders` table exists (run `database_schema.sql`)
- Check browser console for errors (F12)

### Payment form issues
- Ensure form validation is passing
- Check that payment method is selected
- For UPI: format should be `email@upi`

### Navigation not working
- Clear browser cache
- Check that active class is on the correct link
- Verify href paths are correct

---

## 📞 Contact & Support

**Website**: Sunset Cafe  
**Phone**: +91 9119119119  
**Email**: coffeeshop@gmail.com  
**Location**: Goa, India  
**Hours**: Mon-Sun: 10:00 AM - 7:00 PM

---

## 📝 Version History

**v1.0** - Initial release with all fixes
- CSS improvements
- Database integration
- Image path fixes
- Admin dashboard
- Order management

---

## ✅ Final Checklist

- [x] All pages have correct active nav state
- [x] Images load correctly
- [x] Contact form saves to database with name field
- [x] Orders save to database
- [x] Admin dashboard displays all orders
- [x] Responsive design works
- [x] All buttons properly styled
- [x] Payment methods work
- [x] Database schema created
- [x] No console errors

---

**Last Updated**: May 23, 2025  
**Status**: ✅ Ready for Production
