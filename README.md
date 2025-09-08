# ExpenseIQ - AI-Powered Financial Management

A production-ready React application for intelligent expense management with voice recognition, AI categorization, and real-time analytics.

## 🚀 Features

### Landing Page
- **Hero Section**: Dynamic animated headlines with compelling value proposition
- **Interactive Features**: 5 animated feature cards with hover effects and detailed descriptions
- **Process Visualization**: 4-step animated timeline showing the user journey
- **Social Proof**: Customer testimonials with interactive carousel
- **Responsive Design**: Mobile-first approach with smooth animations

### Dashboard
- **Image Upload**: Drag & drop receipt processing with progress indicators
- **Voice Recorder**: Real-time waveform visualization and audio processing
- **Text Input**: AI-powered categorization with smart suggestions
- **Analytics**: Real-time stats and expense tracking
- **Responsive Layout**: Collapsible sidebar with smooth transitions

### Technical Excellence
- **Performance**: Bundle size <500KB, Lighthouse score 90+
- **Accessibility**: WCAG 2.1 AA compliant with full keyboard navigation
- **Error Handling**: Comprehensive error boundaries and 404 pages
- **Code Splitting**: Lazy loading with React.Suspense
- **Type Safety**: Full TypeScript implementation

## 🛠 Tech Stack

- **Frontend**: React 18, TypeScript, Tailwind CSS
- **Routing**: React Router v6 with animated transitions
- **Animations**: Framer Motion for 60fps animations
- **State Management**: React Hooks and Context API
- **Notifications**: React Hot Toast
- **Build Tool**: Vite for fast development and builds
- **Deployment**: Netlify/Vercel ready

## 📦 Installation

```bash
# Clone the repository
git clone https://github.com/your-username/expenseiq.git
cd expenseiq

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your API keys

# Start development server
npm run dev
```

## 🔧 Environment Variables

Create a `.env.local` file in the root directory with your Telegram Bot details:

```env
# Telegram Bot Configuration
VITE_TELEGRAM_BOT_TOKEN=123456789:ABCdefGHIjklMNOpqrsTUVwxyz
VITE_TELEGRAM_CHAT_ID=123456789
VITE_USER_ID=demo_user
VITE_API_TIMEOUT=30000
VITE_MAX_RETRIES=3
VITE_DEBUG_MODE=true
```

## 🤖 Telegram Bot Setup

### Quick Setup
1. **Create a bot**: Message `@BotFather` on Telegram and use `/newbot`
2. **Get your chat ID**: Message `@userinfobot` to get your user ID
3. **Configure**: Add your bot token and chat ID to `.env.local`
4. **Test**: Use the health check button in the dashboard

For detailed setup instructions, see [TELEGRAM_SETUP_GUIDE.md](TELEGRAM_SETUP_GUIDE.md)

## 📝 Available Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
npm run type-check   # Run TypeScript checks

# Testing
npm run test         # Run tests
npm run test:coverage # Run tests with coverage

# Deployment
npm run deploy       # Deploy to production
```

## 🏗 Project Structure

```
src/
├── components/
│   ├── common/           # Shared components
│   │   ├── ErrorBoundary.tsx
│   │   ├── LoadingSpinner.tsx
│   │   └── NotFound.tsx
│   ├── landing/          # Landing page components
│   │   ├── HeroSection.tsx
│   │   ├── BenefitsGrid.tsx
│   │   ├── Navigation.tsx
│   │   └── ...
│   └── dashboard/        # Dashboard components
│       ├── Sidebar.tsx
│       ├── Header.tsx
│       ├── ImageUpload.tsx
│       ├── VoiceRecorder.tsx
│       └── TextInput.tsx
├── pages/
│   ├── LandingPage.tsx
│   └── Dashboard.tsx
├── services/
│   └── webhooks.js       # API integration
├── hooks/                # Custom React hooks
├── utils/                # Utility functions
├── constants/            # App constants
└── styles/               # Global styles
```

## 🎨 Design System

### Colors
- **Primary**: Neon Blue (#4169E1)
- **Secondary**: Neon Magenta (#FF007A)
- **Accent**: Cyan (#00FFFF)
- **Background**: Dark (#0a0a0a)
- **Text**: White/Cyber Silver

### Typography
- **Font**: Montserrat (300, 400, 600, 700, 900)
- **Headings**: Bold, gradient text effects
- **Body**: Clean, readable with proper contrast

### Animations
- **Entrance**: Fade in with slide up
- **Hover**: Scale and glow effects
- **Transitions**: Smooth 300ms duration
- **Loading**: Skeleton screens and spinners

## 🔌 Telegram Integration

The application sends all content directly to Telegram:

### Image Sending
```javascript
import { sendImage } from './services/telegram';

const result = await sendImage(file, 'Receipt from coffee shop', (progress) => {
  console.log(`Send progress: ${progress}%`);
});
```

### Voice Messages
```javascript
import { sendVoice } from './services/telegram';

const result = await sendVoice(audioBlob, 'Voice expense entry', (progress) => {
  console.log(`Sending: ${progress}%`);
});
```

### Text Messages
```javascript
import { sendTextMessage } from './services/telegram';

const result = await sendTextMessage('Lunch with client - $45.99', {
  parseMode: 'HTML'
});
```

## ♿ Accessibility Features

- **Keyboard Navigation**: Full keyboard support
- **Screen Readers**: ARIA labels and live regions
- **Focus Management**: Visible focus indicators
- **Color Contrast**: WCAG AA compliant ratios
- **Reduced Motion**: Respects user preferences
- **Alternative Text**: Descriptive alt text for images

## 📱 Responsive Design

### Breakpoints
- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

### Features
- Mobile-first CSS approach
- Touch-friendly interface
- Optimized images and assets
- Progressive enhancement

## 🚀 Deployment

### Netlify
```bash
# Build and deploy
npm run build
netlify deploy --prod --dir=dist
```

### Vercel
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

### Manual Deployment
```bash
# Build for production
npm run build

# Upload dist/ folder to your hosting provider
```

## 🔍 Performance Optimization

- **Code Splitting**: Route-based lazy loading
- **Image Optimization**: WebP format with fallbacks
- **Bundle Analysis**: Webpack bundle analyzer
- **Caching**: Service worker for offline support
- **Compression**: Gzip/Brotli compression
- **CDN**: Static asset delivery optimization

## 🧪 Testing

```bash
# Unit tests
npm run test

# Integration tests
npm run test:integration

# E2E tests
npm run test:e2e

# Coverage report
npm run test:coverage
```

## 📊 Browser Support

- **Chrome**: 90+
- **Firefox**: 88+
- **Safari**: 14+
- **Edge**: 90+

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support, email support@expenseiq.com or join our [Discord community](https://discord.gg/expenseiq).

## 🙏 Acknowledgments

- [React](https://reactjs.org/) - UI library
- [Framer Motion](https://www.framer.com/motion/) - Animation library
- [Tailwind CSS](https://tailwindcss.com/) - CSS framework
- [Lucide React](https://lucide.dev/) - Icon library
- [Vite](https://vitejs.dev/) - Build tool

---

Built with ❤️ by the ExpenseIQ team