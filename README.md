# 🚀 Imagify - AI-Powered Image Generation

![Imagify Banner](https://via.placeholder.com/800x200/4F46E5/FFFFFF?text=Imagify+AI+Image+Generator)

[![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Stripe](https://img.shields.io/badge/Stripe-626CD9?style=for-the-badge&logo=Stripe&logoColor=white)](https://stripe.com/)
[![Vite](https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)

Transform your ideas into stunning visuals with Imagify! This full-stack web application leverages AI to generate high-quality images from text prompts. Users can create, view, and purchase credits to unlock unlimited creativity.

## ✨ Features

- 🎨 **AI Image Generation**: Generate images from text prompts using advanced AI
- 💳 **Credit System**: Start with 5 free credits, purchase more with Stripe integration
- 🔐 **User Authentication**: Secure login and registration with JWT
- 📱 **Responsive Design**: Beautiful UI built with React and Tailwind CSS
- ⚡ **Fast Performance**: Powered by Vite for lightning-fast development and builds
- 🛒 **Multiple Plans**: Choose from Basic, Advanced, or Business credit packages
- 🌟 **Smooth Animations**: Enhanced user experience with Framer Motion

## 🛠️ Tech Stack

### Frontend
- **React 19** - Modern JavaScript library for building user interfaces
- **Vite** - Next-generation frontend tooling
- **Tailwind CSS** - Utility-first CSS framework
- **React Router** - Declarative routing for React
- **Axios** - HTTP client for API requests
- **React Toastify** - Toast notifications
- **Framer Motion** - Animation library

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - JSON Web Tokens for authentication
- **bcrypt** - Password hashing
- **Stripe** - Payment processing
- **Razorpay** - Alternative payment gateway

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- MongoDB database
- Stripe account for payments

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/imagify.git
   cd imagify
   ```

2. **Install server dependencies**
   ```bash
   cd server
   npm install
   ```

3. **Install client dependencies**
   ```bash
   cd ../client
   npm install
   ```

4. **Environment Setup**

   Create a `.env` file in the `server` directory with the following variables:
   ```env
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   STRIPE_SECRET_KEY=your_stripe_secret_key
   CLIENT_URL=http://localhost:5173
   PORT=4000
   ```

5. **Start the development servers**

   **Terminal 1 - Start the backend:**
   ```bash
   cd server
   npm run server
   ```

   **Terminal 2 - Start the frontend:**
   ```bash
   cd client
   npm run dev
   ```

6. **Open your browser**

   Navigate to `http://localhost:5173` to see Imagify in action!

## 📖 Usage

1. **Sign Up/Login**: Create an account or log in to access the platform
2. **Generate Images**: Enter a text prompt and click "Generate" to create AI images
3. **View Results**: See your generated images in the results page
4. **Buy Credits**: When you run out of credits, purchase more using Stripe
5. **Explore Plans**: Choose from different credit packages based on your needs

## 🏗️ Project Structure

```
imagify/
├── client/                 # React frontend
│   ├── public/            # Static assets
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   ├── pages/         # Page components
│   │   ├── context/       # React context for state management
│   │   └── assets/        # Asset imports
│   └── package.json
├── server/                 # Node.js backend
│   ├── config/            # Database configuration
│   ├── controllers/       # Route controllers
│   ├── middlewares/       # Custom middlewares
│   ├── models/            # MongoDB models
│   ├── routes/            # API routes
│   └── package.json
└── README.md
```

## 💰 Pricing Plans

| Plan      | Price | Credits | Description |
|-----------|-------|---------|-------------|
| Basic     | $10   | 100     | Perfect for casual users |
| Advanced  | $50   | 500     | Great for regular creators |
| Business  | $250  | 5000    | Ideal for power users |

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the ISC License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Pollinations AI](https://pollinations.ai/) for the image generation API
- [Stripe](https://stripe.com/) for payment processing
- [Tailwind CSS](https://tailwindcss.com/) for the beautiful styling

## 📞 Contact

Have questions or suggestions? Feel free to reach out!

- **Email**: www.nadun50@gmail.com
- **GitHub**: [UNNuwantha](https://github.com/UNNuwantha)
- **LinkedIn**: [Nipuna Nuwantha](https://linkedin.com/in/NipunaNuwantha)

---

⭐ **Star this repo** if you found it helpful!</content>
<parameter name="filePath">c:\Users\Nipuna\Desktop\imagify\README.md