# SatyaScan Deployment Guide

Deploy your AI-powered news detector in minutes! 🚀

## 🟦 Vercel (Recommended - Easiest)

### Option 1: GitHub + Dashboard (5 minutes)

1. **Commit and push to GitHub**
   ```bash
   git add .
   git commit -m "Initial SatyaScan commit"
   git push origin main
   ```

2. **Connect to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Select your GitHub repository
   - Click "Import"

3. **Configure Environment Variables**
   - In the Environment Variables section, add:
     ```
     Name: VITE_OPENAI_KEY
     Value: sk_test_YOUR_API_KEY
     ```

4. **Deploy**
   - Click "Deploy"
   - Wait 30-60 seconds
   - Your app is live! 🎉

**Your URL**: `https://sachscan-xxx.vercel.app`

### Option 2: Vercel CLI (3 minutes)

```bash
# Install Vercel CLI (one time)
npm install -g vercel

# Deploy
vercel --env VITE_OPENAI_KEY=sk_test_YOUR_KEY

# Answer prompts:
# - Link to existing project? No
# - Project name: sachscan
# - Which directory? ./
# - Settings look good? Yes
```

### Option 3: Vercel Git Push Auto-Deploy

1. Connect GitHub repo to Vercel (Option 1, steps 1-2)
2. Add environment variable in Vercel dashboard
3. Every `git push` automatically deploys! ✨

## 🌐 Other Hosting Options

### Netlify

1. **Build**
   ```bash
   npm run build
   ```

2. **Deploy**
   - Go to [netlify.com](https://netlify.com)
   - Click "Add new site"
   - Drag-and-drop `dist/` folder
   - OR connect GitHub + set build command: `npm run build`

3. **Add Environment Variable**
   - Site settings → Build & deploy → Environment
   - Add `VITE_OPENAI_KEY`

### GitHub Pages (Free, but static only)

1. **Update package.json**
   ```json
   {
     "homepage": "https://yourusername.github.io/sachscan"
   }
   ```

2. **Build and deploy**
   ```bash
   npm run build
   git add dist/
   git commit -m "Build for GitHub Pages"
   git push
   ```

3. **Enable Pages**
   - Repository → Settings → Pages
   - Source: Deploy from a branch
   - Branch: main
   - Folder: /dist

### Self-Hosted (VPS, Docker)

**Docker Dockerfile:**
```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

ENV VITE_OPENAI_KEY=$VITE_OPENAI_KEY

EXPOSE 5173

CMD ["npm", "run", "dev"]
```

**Deploy:**
```bash
docker build -t sachscan .
docker run -e VITE_OPENAI_KEY=sk_test_YOUR_KEY -p 5173:5173 sachscan
```

## 📋 Pre-Deployment Checklist

- [ ] `.env.local` has your `VITE_OPENAI_KEY`
- [ ] Run `npm run build` locally (check for errors)
- [ ] Test with `npm run preview`
- [ ] Environment variable set in hosting platform
- [ ] `.env.local` is in `.gitignore` (not committed)
- [ ] No console errors in dev tools
- [ ] Sample buttons work
- [ ] API calls return results

## 🔒 Security Checklist

1. **API Key Protection**
   ```bash
   # ✅ DO: Keep in .env.local
   VITE_OPENAI_KEY=sk_test_...
   
   # ❌ DON'T: Commit to git
   git add .env.local  # Never do this!
   
   # ✅ DO: Use environment variables in hosting
   # (Vercel, Netlify, GitHub - all support this)
   ```

2. **Rate Limiting** (Recommended)
   - Set spending limits in [OpenAI Account](https://platform.openai.com/account/billing/limits)
   - Monitor usage: [Usage Dashboard](https://platform.openai.com/account/billing/overview)

3. **API Key Rotation**
   - Regenerate keys periodically
   - [OpenAI API Keys](https://platform.openai.com/api-keys)

## 🧪 Test Your Deployment

After deploying, test these:

1. **Load the app** - Page loads without errors
2. **Try fake news sample** - Click "FAKE NEWS" button
3. **Click ANALYZE** - Wait 2-3 seconds for result
4. **Check result** - Should show classification + confidence
5. **Try real news sample** - Verify different results

## 🐛 Troubleshooting Deployment

### "API key not configured"
- [ ] Verify `VITE_OPENAI_KEY` is set in hosting platform
- [ ] Restart the deployment
- [ ] Check spelling of environment variable

### "Build failed"
- [ ] Run `npm install` locally
- [ ] Run `npm run build` locally - fix errors
- [ ] Push fixed code

### "CORS error" (shouldn't happen)
- OpenAI API accepts browser requests directly
- Check API key is valid

### "Blank page"
- [ ] Check browser console (F12 → Console tab)
- [ ] Verify `dist/index.html` was built
- [ ] Ensure static files are being served

### "Slow response"
- Might be API rate limiting
- Check OpenAI status: [status.openai.com](https://status.openai.com/)
- Network tab in DevTools shows actual timing

## 📊 Monitoring Production

### Vercel
- Dashboard shows deployments, errors, analytics
- Real-time logs available

### Custom Metrics (Optional)
Add error tracking:
```typescript
// In App.tsx or api/newsAnalyzer.ts
try {
  const result = await analyzeNews(text)
} catch (err) {
  console.error('Analysis failed:', err)
  // Optional: Send to error tracking service
  // Example: Sentry, LogRocket, etc.
}
```

## 🚀 Performance Optimization

### Production Bundle Size
```bash
npm run build
# Check dist/ folder
```

Current: ~50KB gzipped ✨

### Cache Static Assets
Vercel automatically caches:
- CSS files (1 year)
- JS bundles (1 year)
- Images (1 day)

### Reduce API Latency
- First call: 3-5 seconds
- Subsequent: 2-3 seconds
- This is API latency, not hosting

## 💰 Cost Estimation

| Item | Cost |
|------|------|
| Vercel hosting | FREE (1M function invocations/month) |
| Netlify hosting | FREE (100 GB/month) |
| OpenAI API (3.5-turbo) | ~$0.0005 per request |
| 100 analyses/month | ~$0.05 |
| 1000 analyses/month | ~$0.50 |
| 10K analyses/month | ~$5 |

## 📞 Support

**Deployment Issues**
- Vercel: [vercel.com/support](https://vercel.com/support)
- Netlify: [netlify.com/support](https://netlify.com/support)
- OpenAI: [help.openai.com](https://help.openai.com)

**Local Issues**
- See [README.md](README.md) troubleshooting section

## ✨ Tips

1. **Deploy early** - Test production environment ASAP
2. **Use preview** - Run `npm run preview` before deploying
3. **Check env vars** - Most deployment issues are env variable related
4. **Monitor usage** - Watch your OpenAI API usage dashboard
5. **Add error reporting** - Sentry/LogRocket for production

---

**Ready? Pick Vercel and deploy in 5 minutes!** 🎉
