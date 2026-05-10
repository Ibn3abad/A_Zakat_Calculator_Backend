# Zakat Calculator Backend

**Supabase Backend and API for Zakat Calculator App**

---

## 📋 Overview

This repository contains the **backend infrastructure and APIs** for the [Zakat Calculator mobile application](https://github.com/Ibn3abad/A_Zakat_Calculator). Built with **Supabase**, it provides secure data storage, authentication, and business logic for accurate Zakat calculations.

## 🎯 Key Features

- **Secure Authentication:** User authentication and session management
- **Database Management:** PostgreSQL database via Supabase
- **RESTful APIs:** Endpoints for calculation history, user data, and preferences
- **Real-time Updates:** Real-time data synchronization
- **Privacy First:** No unnecessary data collection, GDPR compliant
- **Scalable Infrastructure:** Built on Supabase for reliability and performance

## 🛠️ Tech Stack

- **Backend Framework:** Supabase (PostgreSQL, Auth, Realtime)
- **Database:** PostgreSQL
- **Authentication:** Supabase Auth
- **API Type:** RESTful / GraphQL (if applicable)
- **Deployment:** Supabase Cloud

## 📁 Project Structure

```
A_Zakat_Calculator_Backend/
├── supabase/
│   ├── migrations/          # Database migrations
│   ├── functions/           # Edge Functions (if using)
│   └── config.toml          # Supabase configuration
├── schemas/                 # Database schemas
├── migrations/              # SQL migration files
├── docs/                    # API documentation
├── .env.example             # Environment variables template
├── README.md               # This file
└── package.json            # Dependencies (if using Node.js)
```

## 🚀 Getting Started

### Prerequisites

- Supabase account ([create one here](https://supabase.com))
- Node.js 16+ (if using local development)
- Git

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Ibn3abad/A_Zakat_Calculator_Backend.git
   cd A_Zakat_Calculator_Backend
   ```

2. **Set up environment variables:**
   ```bash
   cp .env.example .env.local
   ```
   Add your Supabase credentials:
   ```
   SUPABASE_URL=your_supabase_url
   SUPABASE_ANON_KEY=your_anon_key
   SUPABASE_SERVICE_KEY=your_service_key
   ```

3. **Install dependencies (if applicable):**
   ```bash
   npm install
   ```

4. **Run migrations:**
   ```bash
   supabase migration up
   ```

## 📡 API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/auth/register` | POST | User registration |
| `/auth/login` | POST | User login |
| `/calculations/history` | GET | Get user's calculation history |
| `/calculations/save` | POST | Save a new calculation |
| `/user/profile` | GET | Get user profile |
| `/user/preferences` | PUT | Update user preferences |

*(Full API documentation available in `/docs`)*

## 🔐 Security

- All API endpoints require authentication
- Sensitive data is encrypted at rest
- SQL injection prevention through parameterized queries
- Rate limiting enabled on all endpoints
- CORS configured for the mobile app only

## 🤝 Integration with Frontend

This backend is designed to work with the [A_Zakat_Calculator Android App](https://github.com/Ibn3abad/A_Zakat_Calculator).

**Android App Repository:** https://github.com/Ibn3abad/A_Zakat_Calculator

## 📝 Database Schema

Key tables:
- `users` - User accounts and authentication
- `calculations` - User calculation history
- `preferences` - User preferences and settings
- `audit_logs` - Activity logs for security

See `/schemas` directory for detailed schema documentation.

## 🧪 Testing

```bash
npm test
```

## 📚 Documentation

- [API Documentation](./docs/API.md)
- [Database Schema](./docs/SCHEMA.md)
- [Setup Guide](./docs/SETUP.md)
- [Deployment Guide](./docs/DEPLOYMENT.md)

## 🐛 Bug Reports & Feature Requests

Found a bug or have a feature request? Please open an [issue](https://github.com/Ibn3abad/A_Zakat_Calculator_Backend/issues).

## 📄 License

This project is licensed under the same license as the main application. See LICENSE file for details.

## 👤 Author

**Ibn3abad** - [GitHub Profile](https://github.com/Ibn3abad)

## 🔗 Related Projects

- **[Zakat Calculator App](https://github.com/Ibn3abad/A_Zakat_Calculator)** - Android Kotlin mobile application
- **[Website](https://ibn3abad.github.io/A_Zakat_Calculator/)** - Zakat Calculator web interface

---

**Your Privacy Matters.** This backend respects user privacy and follows best practices for data protection.
