# ClickDrink 🍻

![ClickDrink Cover](assets/cover.png)

<div align="center">
  <img src="assets/screenshot.png" width="45%" alt="ClickDrink Screenshot 1">
  <img src="assets/screenshot-2.png" width="45%" alt="ClickDrink Screenshot 2">
</div>

A Telegram Mini App that lets users earn rewards through social engagement and interactive clicking. Built with HTML, CSS, JavaScript, Express.js, MongoDB, Mongoose, Node.js, body-parser, session management, HTTPS, dotenv, and more with seamless integration with Telegram's WebApp platform.

## 🚀 Features

- **Interactive Clicking System**: Earn rewards through engaging tap mechanics
- **Social Tasks**: Complete tasks like following on social media for additional rewards
- **Real-time Counter**: Live updating counter with smooth animations
- **Haptic Feedback**: Multi-platform vibration support
- **Persistent Storage**: Local storage for maintaining task completion states
- **Telegram Integration**: Seamless integration with Telegram Mini App platform

## 💻 Tech Stack

- Frontend: HTML, CSS, JavaScript
- Backend: Node.js, Express
- Database: MongoDB
- Session Management: express-session
- Authentication: Telegram WebApp API

## 🛠️ Installation

1. Clone the repository
   ```bash
   git clone https://github.com/yourusername/clickdrink.git
   ```
2. Install dependencies
   ```bash
   npm install
   ```
3. Configure environment variables
   ```env
   MONGODB_ATLAS_URI=your_mongodb_uri
   APP_SECRET=your_app_secret
   ```
4. Start the server
   ```bash
   npm start
   ```

## 🔧 Core Functionality

### Haptic Feedback System

```javascript
function triggerHapticFeedback() {
    // Telegram WebApp Haptic Feedback
    if (window.Telegram && window.Telegram.WebApp && window.Telegram.WebApp.HapticFeedback) {
        window.Telegram.WebApp.HapticFeedback.impactOccurred('light');
    }

    // Web Vibration API
    if ('vibrate' in navigator) {
        navigator.vibrate(50);
    }

    // Android Bridge
    if (window.Android && typeof window.Android.vibrate === 'function') {
        window.Android.vibrate(50);
    }
}
```

## 📱 Usage

1. Open the app through Telegram Mini Apps
2. Click to earn rewards
3. Complete social tasks for bonus rewards
4. Share with friends to multiply earnings

## 🔒 Security

- Secure session management
- MongoDB encryption
- HTTPS enabled
- Protected API endpoints

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📬 Contact

* Website: [shivsingh.com](https://shivsingh.com)
* Email: hi@shivsingh.com
* LinkedIn: [Shiv Singh](https://linkedin.com/in/shivsinghin)
