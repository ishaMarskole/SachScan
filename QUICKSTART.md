# SatyaScan Quick Start Guide

## ⚡ 45-Minute Hackathon Setup

### Step 1: Get Your API Key (2 minutes)
1. Go to [platform.openai.com/api-keys](https://platform.openai.com/api-keys)
2. Click "Create new secret key"
3. Copy the key (starts with `sk_`)

### Step 2: Configure Environment (1 minute)
Create `.env.local` in the project root:
```bash
VITE_OPENAI_KEY=sk_YOUR_KEY_HERE
```

### Step 3: Install & Run (2 minutes)
```bash
npm install
npm run dev
```

The app opens at `http://localhost:5173/`

### Step 4: Test It! (2 minutes)
- Click "FAKE NEWS" or "REAL NEWS" to load samples
- Click "ANALYZE NOW"
- See results with insights!

---

## 🚀 Deploy to Vercel (5 minutes)

### Option A: GitHub + Vercel Dashboard
1. Push code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click "New Project" → Select repo
4. Add env var: `VITE_OPENAI_KEY` = your key
5. Click "Deploy"

### Option B: Vercel CLI
```bash
npm i -g vercel
vercel --env VITE_OPENAI_KEY=sk_YOUR_KEY
```

Your app is live in 60 seconds! 🎉

---

## 📋 Features Ready to Use

✅ Real/Fake classification  
✅ Confidence scoring  
✅ Tone detection  
✅ Suspicious phrase highlighting  
✅ Manipulation technique detection  
✅ Credibility breakdown  
✅ Claims vs Evidence analysis  
✅ Neutral headline rewriter  
✅ Mobile-responsive design  
✅ Brutalist UI with animations  

---

## 🎨 Customization (Optional)

### Change AI Model
Edit `src/api/newsAnalyzer.ts` line ~40:
```typescript
model: 'gpt-4' // upgrades to GPT-4
```

### Modify Prompt
Edit the `systemPrompt` in `src/api/newsAnalyzer.ts`

### Adjust Styling
- Colors: `tailwind.config.js`
- Components: `src/components/`
- Global styles: `src/index.css`

---

## 🐛 Troubleshooting

| Issue | Solution |
|-------|----------|
| "API key not configured" | Ensure `.env.local` has `VITE_OPENAI_KEY` and restart dev server |
| Build fails | Run `npm install` again |
| Slow response | Check internet connection; API calls take 2-3 seconds |
| Deployment fails | Verify API key is set in Vercel environment variables |

---

## 📁 Project Structure

```
SachScan/
├── src/
│   ├── api/newsAnalyzer.ts     ← AI API calls
│   ├── App.tsx                 ← Main app logic
│   ├── components/             ← UI components
│   │   ├── Hero.tsx
│   │   ├── InputSection.tsx
│   │   ├── ResultCard.tsx
│   │   ├── InsightsSection.tsx
│   │   ├── AnalysisSection.tsx
│   │   └── RewriteSection.tsx
│   └── index.css              ← Global styles
├── index.html
├── tailwind.config.js
├── vite.config.ts
└── package.json
```

---

## 💡 Tips for Hackathons

1. **Customize the prompt** in `newsAnalyzer.ts` to detect specific fake news patterns
2. **Add sample articles** in `InputSection.tsx` with real news you want to analyze
3. **Adjust colors** in `tailwind.config.js` to match your brand
4. **Change API model** to `gpt-4` for better accuracy (costs more)
5. **Deploy early** — Vercel deploys are instant!

---

## 📊 Performance

- **Build time**: ~2 seconds
- **Dev startup**: ~500ms
- **Analysis time**: ~2-3 seconds (API latency)
- **Bundle size**: ~50KB gzipped
- **Mobile friendly**: ✅ Fully responsive

---

## 🔗 Useful Links

- [OpenAI API Docs](https://platform.openai.com/docs)
- [React Docs](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [Vite Docs](https://vitejs.dev)

---

**Ready to ship? You're 2 minutes away!** ✨
