# Myntra Ecommerce App

A full-stack ecommerce app where you can browse, search, add, edit, and view detailed products.  
Built with a React frontend, Express/Node backend, MongoDB database, and JWT-based authentication.

---

## Demo Link

[Live Demo]([https://my-recipe-organizer.com](https://myntra-puce-ten.vercel.app/login))  

---

## Quick Start

```
git clone https://github.com/<your-username>/<your-repo>.git
cd <your-repo>
npm install
npm run dev      # or `npm start` / `yarn dev`
```

## Technologies
- React JS
- React Router
- Node.js
- Express
- MongoDB
- JWT


## Features
**Home**
- Displays a list of all products
- Search product by title in real time

**Product Listing**
- Paginated product list
- filter by gender, price, type of product

**Recipe Details**
- View full product information (price, color, images)
- Add to wishlist or bag

**Authentication**
- User signup and login with JWT
- Protected routes for wishlist and bag page

## API Reference

### **GET	/api/products**<br>	 
List all product<br>	 
Sample Response:<br>
```[{ _id, productName, productType, ... }, …]```

### **GET	/api/products/:id**<br>	 	
Get details for one product<br>		
Sample Response:<br>
```{ _id, productName, productType, size, price, ... }```

### **POST	/api/auth/signup**<br>  	
Register a new user<br> 	 
Sample Response:<br> 
```{ userId, token }```

## Contact
For bugs or feature requests, please reach out to pranitkarker99@gmail.com
