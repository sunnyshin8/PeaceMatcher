# 🏥 PeaceMatcher — AI-Powered Healthcare Platform

**PeaceMatcher** is a comprehensive AI-powered healthcare platform that provides intelligent medical guidance, symptom analysis, drug interaction checking, and telehealth consultations — all in one seamless experience.

---

## ✨ Features

### 🤖 AI Health Assistant
- **Gemini AI-powered** medical chatbot trained on 15+ medicines with clinical protocols
- Voice-to-text input (Web Speech API)
- PDF export of health consultations
- Thumbs up/down feedback on AI responses
- Session-based chat memory

### 🩺 Symptom Checker
- Interactive 4-step wizard: Body Area → Symptoms → Severity → AI Analysis
- 8 body area categories with targeted symptom selection
- AI-powered diagnosis suggestions with recommended actions

### 💊 Drug Interaction Checker
- Check interactions between 25+ common medications
- AI-powered severity analysis with warnings
- Alternative medication suggestions

### 📊 Dosage Calculator
- Age-based dosage tables (pediatric to elderly)
- 6 common medicines with complete reference data
- Special instructions and contraindications

### 📹 Telehealth
- Jitsi Meet integration for secure video consultations
- Quick meeting room generation
- Scheduled meeting management
- Past consultation history

### 📅 Appointments
- 10+ mock appointments with multiple doctors/departments
- Stat cards, filtered tabs (Upcoming, Past, Cancelled)
- Schedule new appointment dialog

### 🆘 Emergency SOS
- Floating emergency button on all pages
- Quick access to emergency contacts (108, 112)
- Nearest hospitals listing

### 🛡️ Additional Features
- Dashboard with Recharts data visualizations
- Breadcrumbs navigation for inner pages
- Toast notification system
- Skeleton loading components
- Services overview page
- Error boundary with fallback UI
- Responsive mobile navigation with hamburger menu

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|------------|
| **Framework** | Next.js 16 (App Router) |
| **UI** | Material-UI (MUI) + Tailwind CSS |
| **AI** | Google Gemini 2.5 Flash |
| **Charts** | Recharts |
| **Video** | Jitsi Meet |
| **Voice** | Web Speech API |
| **Language** | TypeScript |

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
├── app/                    # Next.js App Router pages
│   ├── page.tsx            # Landing page
│   ├── home/               # AI Assistant page
│   ├── dashboard/          # Analytics dashboard
│   ├── appointments/       # Appointments management
│   ├── telehealth/         # Video consultations
│   ├── symptom-checker/    # Symptom analysis wizard
│   ├── drug-interactions/  # Drug interaction checker
│   ├── dosage-calculator/  # Age-based dosage calculator
│   ├── services/           # Services overview
│   ├── login/              # Login page
│   ├── signup/             # Multi-step registration
│   └── api/chat/           # AI chat API route
├── components/             # Reusable components
│   ├── NavBar.tsx          # Navigation with mobile hamburger
│   ├── Footer.tsx          # Global footer
│   ├── ChatInterface.tsx   # AI chat interface
│   ├── ChatInput.tsx       # Voice-enabled chat input
│   ├── ChatMessage.tsx     # Message bubble with feedback
│   ├── EmergencySOS.tsx    # Floating emergency button
│   ├── Breadcrumbs.tsx     # Auto-generated breadcrumbs
│   ├── ToastProvider.tsx   # Toast notification system
│   ├── Skeletons.tsx       # Loading skeleton components
│   └── ErrorBoundary.tsx   # Error handling
├── services/               # Business logic
│   ├── googleAIStudio.ts   # Gemini AI integration + system prompt
│   └── medicineDatabase.ts # Medicine database (15+ medicines)
└── data/                   # Static data files
    └── patients-database.json
```

---

## 🔒 Security

- API keys are **server-side only** (never exposed to client bundle)
- Video calls are **end-to-end encrypted** via Jitsi Meet
- Medical disclaimer on all AI-generated content
- HIPAA compliance badge displayed

---

## 📝 Medical Disclaimer

> PeaceMatcher provides AI-assisted health information only and is **not a substitute for professional medical advice**. Always consult a qualified healthcare provider for medical decisions.

---

## 👥 Team

Built with ❤️ for better healthcare.

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
