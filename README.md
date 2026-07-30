# Cafe Aylanto Dashboard

A premium, fully-functional Point-of-Sale (POS) and management dashboard for Cafe Aylanto, built with React and Vite.

## Features
- **Premium UI:** Dark mode aesthetics with gold accents, custom animations, and responsive design.
- **POS System:** Add items to cart, adjust quantities, assign tables, and process orders.
- **Inventory Management:** Live inventory tracking that automatically deducts stock upon new orders. Add, edit, and manage menu items.
- **Order Tracking:** Manage pending, delivered, and cancelled orders.
- **Income Analytics:** View daily, weekly, monthly, and yearly revenue insights.
- **Authentication:** Secure login portal to protect management routes.

## Technologies Used
- React 18
- Vite
- Zustand (State Management with local storage persistence)
- React Router DOM
- FontAwesome Icons

## Getting Started

Follow these steps to download and run the project locally.

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed on your machine.

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/talhasarfraz689/cafe-aylanto-dashboard.git
   ```

2. **Navigate to the project directory:**
   ```bash
   cd cafe-aylanto-dashboard
   ```

3. **Install the dependencies:**
   ```bash
   npm install
   ```

### Running the App

To start the local development server, run:
```bash
npm run dev
```
Then, open the provided `http://localhost:5173` link in your browser.

**Login Credentials:**
- **Username:** `admin`
- **Password:** `admin`

## Deployment
This project is configured to be seamlessly deployed on [Vercel](https://vercel.com). Simply link the repository to a new Vercel project, and it will automatically detect Vite and build the application.
