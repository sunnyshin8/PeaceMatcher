# 🏥 PeaceMatcher — AI-Powered Healthcare Platform

**PeaceMatcher** is a comprehensive AI-powered healthcare platform that provides intelligent medical guidance, symptom analysis, drug interaction checking, and telehealth consultations — all in one seamless experience.

---

## ✨ Features

### 🤖 AI Health Assistant
- **Gemini AI-powered** medical chatbot trained on 15+ medicines with clinical protocols
- Comprehensive system prompt with fever management, pain protocols, allergy guidance, GI treatment, infection awareness, and chronic condition references
- Indian healthcare context (Dolo 650mg, emergency number 108, etc.)
- Voice-to-text input using Web Speech API
- PDF export of entire health consultations
- Thumbs up/down feedback on AI responses
- Session-based chat memory (persists across page navigations)
- Drug interaction awareness built into responses
- Safety guardrails: never diagnoses, flags emergencies, requires prescription notes for antibiotics

### 🩺 Symptom Checker
- Interactive 4-step wizard: **Body Area → Symptoms → Severity → AI Analysis**
- 8 body area categories (Head, Chest, Abdomen, etc.) with targeted symptom lists
- Severity slider (Mild / Moderate / Severe)
- AI-powered analysis with recommended actions and urgency level
- "When to see a doctor" guidance

### 💊 Drug Interaction Checker
- Check interactions between **25+ common medications**
- AI-powered severity analysis (Minor / Moderate / Severe / Contraindicated)
- Alternative medication suggestions
- Visual warning indicators

### 📊 Dosage Calculator
- Age-based dosage reference tables (Child → Teen → Adult → Senior)
- 6 common medicines with complete dosage data
- Special instructions, contraindications, and frequency guidelines
- Weight-based pediatric dosing support

### 📹 Telehealth
- **Jitsi Meet integration** for secure, end-to-end encrypted video consultations
- Quick meeting room generator with shareable room names
- Scheduled meetings tab with doctor info, department, date/time
- Past consultation history
- Step-by-step "How It Works" guide
- Privacy & encryption notice

### 📅 Appointments
- **10+ mock appointments** across multiple doctors and departments
- Stat cards (Total, Upcoming, Completed, Cancelled counts)
- Filtered tabs: Upcoming, Past, Cancelled
- Schedule new appointment dialog with doctor, department, date, time, type (In-Person / Telehealth)
- Status badges with color coding

### 📊 Dashboard
- Real-time health analytics with **Recharts** data visualizations
- Patient statistics and trends
- AI-powered clinical recommendations
- Outbreak prediction and anomaly detection via Gemini AI

### 🆘 Emergency SOS
- Floating emergency button accessible on **every page**
- Quick-dial emergency contacts (108 Ambulance, 112 All-in-One)
- Nearest hospitals listing with contact info
- iCall mental health helpline (9152987821)

### 👨‍👩‍👧‍👦 Guardian System
- **Guardian Login** — separate login portal for family caregivers
- **Guardian Dashboard** — manage healthcare on behalf of family members
- View appointments, medications, and medical history for dependents

### 💬 Support Chat
- Dedicated support chatbot for platform-related questions
- Covers: booking appointments, video consultations, account issues, navigation help
- Context-aware responses about PeaceMatcher features

### 📰 Health Articles
- Curated health articles from medical professionals
- Categories: Diabetes, Heart Health, Women's Health, Nutrition
- Read time and view count indicators

### 🏥 Services Overview
- Complete listing of all platform services
- Service cards with descriptions and quick-access links
- Categories: AI Tools, Telehealth, Appointments, Emergency

### 👨‍⚕️ Clinician Portal
- Clinician-focused dashboard
- Patient management interface
- Clinical analytics and recommendations

### 📞 Contact Page
- Contact form for reaching the PeaceMatcher team
- Support email, phone, and office address
- FAQ section

### 📄 About Page
- Platform mission and vision
- Team information
- Medical disclaimer

### 🔐 Authentication
- **Login** page with email/password, "Forgot password" link
- **Sign Up** with multi-step registration:
  - Step 1: Account Details (email, password with strength meter)
  - Step 2: Personal Info (name, phone, gender, DOB)
  - Step 3: Medical History (allergies, conditions, current medications)

### 🎨 UI/UX Features
- **Responsive design** — works on desktop, tablet, and mobile
- **Mobile hamburger menu** with slide-out drawer navigation
- **Breadcrumbs** navigation on inner pages
- **Toast notification** system for success/error/info alerts
- **Skeleton loaders** for smooth loading states
- **Error boundary** with user-friendly fallback UI
- **Testimonials** section with user reviews
- **Landing page** with hero section, stats counter, feature grid, and CTA
- Emerald/teal color theme with modern glassmorphism accents

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|------------|
| **Framework** | Next.js 16 (App Router) |
| **UI** | Material-UI (MUI) + Tailwind CSS |
| **AI** | Google Gemini 2.5 Flash |
| **Charts** | Recharts |
| **Video** | Jitsi Meet (E2E Encrypted) |
| **Voice** | Web Speech API |
| **Language** | TypeScript |
| **Styling** | CSS Modules + MUI sx prop |

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn
- Google Gemini API key ([Get one here](https://aistudio.google.com/app/apikey))

### Installation

```bash
# Clone the repository
git clone https://github.com/sunnyshin8/PeaceMatcher.git
cd PeaceMatcher

# Install dependencies
npm install

# Create environment file
cp .env.example .env
# Add your Gemini API key to .env

# Start development server
npm run dev
```

### Environment Variables

Create a `.env` file in the root directory:

```env
GOOGLE_AI_STUDIO_API_KEY=your_gemini_api_key_here
GEMINI_API_KEY=your_gemini_api_key_here
```

---

## 📁 Project Structure

```
src/
├── app/                        # Next.js App Router pages
│   ├── page.tsx                # Landing page
│   ├── home/                   # AI Assistant page
│   ├── dashboard/              # Analytics dashboard
│   ├── appointments/           # Appointments management
│   ├── appointments-realtime/  # Real-time appointment tracking
│   ├── telehealth/             # Video consultations
│   ├── symptom-checker/        # Symptom analysis wizard
│   ├── drug-interactions/      # Drug interaction checker
│   ├── dosage-calculator/      # Age-based dosage calculator
│   ├── services/               # Services overview
│   ├── articles/               # Health articles
│   ├── clinician/              # Clinician portal
│   ├── guardians/              # Guardian dashboard
│   ├── guardian-login/         # Guardian login portal
│   ├── support/                # Support chat
│   ├── contact/                # Contact page
│   ├── about/                  # About page
│   ├── login/                  # Login page
│   ├── signup/                 # Multi-step registration
│   └── api/chat/               # AI chat API route
├── components/                 # Reusable components
│   ├── NavBar.tsx              # Navigation with mobile hamburger
│   ├── Footer.tsx              # Global footer with disclaimer
│   ├── ChatInterface.tsx       # AI chat with PDF export & feedback
│   ├── ChatInput.tsx           # Voice-enabled chat input
│   ├── ChatMessage.tsx         # Message bubble component
│   ├── EmergencySOS.tsx        # Floating emergency button
│   ├── Breadcrumbs.tsx         # Auto-generated breadcrumbs
│   ├── ToastProvider.tsx       # Toast notification system
│   ├── Skeletons.tsx           # Loading skeleton components
│   └── ErrorBoundary.tsx       # Error handling
├── services/                   # Business logic
│   ├── googleAIStudio.ts       # Gemini AI integration + system prompt
│   └── medicineDatabase.ts     # Medicine database (15+ medicines)
├── utils/
│   └── geminiAI.ts             # Gemini AI analytics utilities
└── data/
    └── patients-database.json  # Patient data
```

---

## 🔒 Security

- API keys are **server-side only** (never exposed to client bundle)
- Video calls are **end-to-end encrypted** via Jitsi Meet
- Medical disclaimer on all AI-generated content
- HIPAA compliance awareness

---

## 📱 Pages & Routes

| Route | Page | Description |
|-------|------|-------------|
| `/` | Landing Page | Hero, features, stats, testimonials, CTA |
| `/home` | AI Assistant | Gemini-powered health chatbot |
| `/dashboard` | Dashboard | Analytics, charts, AI insights |
| `/appointments` | Appointments | Manage doctor appointments |
| `/telehealth` | Telehealth | Video consultations via Jitsi |
| `/symptom-checker` | Symptom Checker | 4-step symptom analysis wizard |
| `/drug-interactions` | Drug Interactions | Check medication interactions |
| `/dosage-calculator` | Dosage Calculator | Age-based dosage reference |
| `/services` | Services | All platform services overview |
| `/articles` | Health Articles | Medical articles & guides |
| `/clinician` | Clinician Portal | Healthcare provider dashboard |
| `/guardians` | Guardians | Family caregiver dashboard |
| `/guardian-login` | Guardian Login | Caregiver login portal |
| `/support` | Support | AI support chatbot |
| `/contact` | Contact | Contact form & info |
| `/about` | About | Platform info & disclaimer |
| `/login` | Login | User authentication |
| `/signup` | Sign Up | Multi-step registration |

---

## 📝 Medical Disclaimer

> PeaceMatcher provides AI-assisted health information only and is **not a substitute for professional medical advice**. Always consult a qualified healthcare provider for medical decisions.

---

## 👥 Team

Built with ❤️ for better healthcare.

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
