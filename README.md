# 🌤️ Weatherify
> A minimalist, glassmorphic weather dashboard for the modern web.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![NSoC'26](https://img.shields.io/badge/Program-NSoC'26-blueviolet)](https://github.com/ashujsrfox/weatherify)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](http://makeapullrequest.com)

Weatherify is a sleek, responsive weather application designed to provide real-time weather insights with a focus on visual clarity and user experience. It uses a secure Node.js backend to bridge the gap between functional data and high-end design.

[Live Demo](https://ashujsrfox.github.io/weatherify/) · [Report Bug](https://github.com/ashujsrfox/weatherify/issues) · [Request Feature](https://github.com/ashujsrfox/weatherify/issues)

---

## ✨ Features

* **Real-time Accuracy:** Live weather metrics (Temp, Humidity, Wind) via OpenWeatherMap API.
* **5-Day Forecast:** Upcoming weather trends displayed in a clean, scrollable layout.
* **Smart Autocomplete:** Real-time city suggestions with debounced input to save API calls.
* **Aesthetics-First:** Responsive, glassmorphic UI with smooth CSS transitions.
* **Security Focused:** API credentials are proxied through a secure Node.js server to prevent client-side exposure.

## 🛠️ Tech Stack

| Layer | Technology |
| :--- | :--- |
| **Frontend** | HTML5, CSS3 (Custom Properties), JavaScript (ES6+) |
| **Backend** | Node.js, Express.js (Security Proxy) |
| **Data Source** | OpenWeatherMap API |
| **Deployment** | Vercel / GitHub Pages |

---

## 🚀 Local Development

To ensure security, the app requires a small local server to proxy API requests. Follow these steps to get started:

### 1. Prerequisites
Ensure you have [Node.js](https://nodejs.org/) (v18 or newer) installed.

### 2. Setup & Installation
```bash
# Clone the repository
git clone [https://github.com/ashujsrfox/weatherify.git](https://github.com/ashujsrfox/weatherify.git)
cd weatherify

# Install dependencies
npm install
```

### 3. Environment Configuration
Create a `.env` file in the root directory and add your API key:
```env
OPENWEATHER_API_KEY=your_api_key_here
```
> *Get a free key at [OpenWeatherMap.org](https://openweathermap.org/api).*

### 4. Run
```bash
npm start
```
The app will launch at `http://localhost:3000`.

---

## 📂 Project Structure

```text
weatherify/
├── index.html       # Main HTML skeleton
├── style.css        # Glassmorphic styling & responsive design
├── script.js        # UI logic & API state management
├── server.js        # Node.js proxy server & file server
├── .env.example     # Environment variable template
└── README.md        # Project documentation
```

---

## 🤝 Contributing

We welcome all contributors, especially those from the **NSoC'26** community! 

1. **Fork** the Project.
2. **Create** your Feature Branch (`git checkout -b feature/AmazingFeature`).
3. **Commit** your Changes (`git commit -m 'feat: add some amazing feature'`).
4. **Push** to the Branch (`git push origin feature/AmazingFeature`).
5. **Open** a Pull Request.

---

## 🔮 Future Roadmap
- [ ] **Geolocation:** Detect weather automatically based on user coordinates.
- [ ] **Unit Toggle:** Switch between Celsius, Fahrenheit, and Kelvin.
- [ ] **AQI Data:** Integrate Air Quality Index insights.
- [ ] **Dark Mode:** A deeper minimalist alternative.

## 📜 License
Distributed under the **MIT License**. See `LICENSE` for more information.

---
Built with ♥ by the **NSoC'26** Community.
```
