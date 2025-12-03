# Lighthouse Testing Guide

## Important: Extension Impact on Results

Chrome extensions **significantly affect** Lighthouse audit results. As noted in your audit:

> "Chrome extensions negatively affected this page's load performance. Try auditing the page in incognito mode or from a Chrome profile without extensions."

### What Extensions Are Affecting Results

Your audit showed these extensions are adding ~839 KiB of unused JavaScript:
- Adblock extensions (bubble_compiled.js, AdblockPlus)
- Urban VPN Proxy extension
- Wappalyzer detection tool

## How to Test Properly

### Method 1: Incognito Mode (Easiest)

1. **Open Incognito Window**
   ```
   Ctrl+Shift+N (Windows/Linux) or Cmd+Shift+N (Mac)
   ```

2. **Navigate to your site:**
   ```
   localhost:3000 (for dev)
   yoursite.com (for production)
   ```

3. **Open DevTools**
   ```
   F12 or Right-click → Inspect
   ```

4. **Run Lighthouse**
   - Go to **Lighthouse** tab
   - Click **Analyze page load**
   - Wait for results

### Method 2: Fresh Chrome Profile (Most Accurate)

1. **Create a new Chrome profile:**
   - Chrome Menu → Settings → You and Google → Manage other people
   - Click **Add person**
   - Name it (e.g., "Testing")
   - Create and launch

2. **Disable all extensions** (new profile usually has none by default)

3. **Run Lighthouse on this profile**

### Method 3: Command Line (For CI/CD)

```bash
# Install lighthouse globally
npm install -g lighthouse

# Run audit
lighthouse https://yoursite.com --view

# Or save report
lighthouse https://yoursite.com --output=json --output-path=lighthouse-report.json
```

## Expected Results (After Extensions Removed)

### Current (With Extensions)
- Performance: 83
- FCP: +10 affected
- LCP: +25 affected
- TBT: +14 affected
- CLS: +25 affected
- SI: +10 affected

### Expected (Without Extensions - Incognito)
- Performance: ~90+
- FCP: 0.4s
- LCP: 0.6-0.8s (after image optimization)
- TBT: 200-300ms
- CLS: 0 (good!)
- SI: 0.4s

## Testing Checklist

### Before Testing
- [ ] Build project: `npm run build`
- [ ] Start preview: `npm run preview`
- [ ] Open incognito window
- [ ] Navigate to localhost:3000

### Run Audit
- [ ] Open DevTools (F12)
- [ ] Click **Lighthouse** tab
- [ ] Select "Mobile" or "Desktop"
- [ ] Uncheck "Throttling" for accurate dev server results
- [ ] Click **Analyze page load**

### Verify Results
- [ ] No extension warnings at top
- [ ] Cache lifetimes show proper headers
- [ ] Modern HTTP/2 used (in production)
- [ ] Image size optimizations noted
- [ ] No render-blocking beyond CSS

## Server Modes & Performance

### Development Server
```bash
npm run dev
```
- **HTTP/1.1** (not optimized for multiple requests)
- **No cache headers** by default
- **Best for:** Development and debugging

### Preview Server (Most Accurate for Local Testing)
```bash
npm run preview
```
- **Proper cache headers applied**
- **HTML pre-rendered**
- **Closer to production**
- **Best for:** Testing before deployment

### Production (Vercel, Netlify, etc.)
- **HTTP/2 or HTTP/3**
- **Full caching enabled**
- **CDN delivered**
- **Brotli/Gzip compression**
- **Best for:** Real-world performance**

## Testing Scenarios

### 1. Local Development Testing
```bash
npm run dev
# Open incognito: localhost:3000
# Run Lighthouse
# ⚠️ May show HTTP/1.1 and no cache headers (expected)
```

### 2. Production Build Preview
```bash
npm run build
npm run preview
# Open incognito: localhost:3000
# Run Lighthouse
# ✓ Better representation of production
```

### 3. Production Deployment Testing
```bash
# Deploy to Vercel/Netlify/etc
# Open incognito: https://yoursite.com
# Run Lighthouse
# ✓ Most accurate results with HTTP/2, full caching
```

## Understanding the Audits

### Passed Audits (17) ✓
These are working well:
- Text is readable during webfont load
- Cumulative Layout Shift is 0 (excellent!)
- Appropriate font sizes
- Proper meta tags
- Mobile viewport configured
- ...and more

### Warnings & Diagnostics

#### Cache Lifetimes (343 KiB)
- **Status:** ⚠️ Expected in dev, fixed in production
- **Solution:** Using preview server shows proper caching
- **Production:** Automatic with CDN

#### Modern HTTP (260 ms)
- **Status:** ⚠️ HTTP/1.1 is slower
- **Dev Server:** Uses HTTP/1.1
- **Production:** Uses HTTP/2 or HTTP/3 automatically
- **Testing:** Use preview or deploy to see HTTP/2

#### Image Delivery (41 KiB)
- **Status:** ✓ Can be optimized further
- **Action:** See IMAGE_OPTIMIZATION.md
- **Impact:** ~150ms LCP improvement possible

#### LCP Request Discovery
- **Status:** ✓ Now fixed
- **Applied:** `fetchpriority="high"` on profile image
- **Impact:** Browser prioritizes image loading

#### Render Blocking Requests
- **Status:** ✓ Normal for critical CSS
- **110ms:** Expected for initial CSS
- **After Fix:** Only CSS is blocking (good)

## Performance Score Calculation

Lighthouse weighs metrics like this:

- **LCP (Largest Contentful Paint):** 25% weight
- **TBT (Total Blocking Time):** 30% weight
- **CLS (Cumulative Layout Shift):** 5% weight
- **FCP (First Contentful Paint):** 10% weight
- **TTFB (Time to First Byte):** 10% weight
- **SI (Speed Index):** 20% weight

## Quick Win: Test Right Now

1. Open incognito window
2. Go to `localhost:3000` (dev) or run `npm run preview`
3. Open DevTools (F12)
4. Click **Lighthouse** tab
5. Click **Analyze page load**
6. Results will be accurate without extension interference

## Deployment Testing

After deploying to production:

```bash
# Test with Google PageSpeed Insights
https://pagespeed.web.dev/

# Enter your production URL
# Get real-world mobile & desktop metrics
# View lab & field data
```

## Next Steps

1. **Test locally** in incognito/preview mode
2. **Optimize image** (41 KiB savings available)
3. **Deploy to production** (HTTP/2, caching, CDN)
4. **Re-test with PageSpeed Insights** for final metrics

## Reference Links

- [Lighthouse Documentation](https://developers.google.com/web/tools/lighthouse)
- [PageSpeed Insights](https://pagespeed.web.dev/)
- [Chrome DevTools](https://developer.chrome.com/docs/devtools/)
- [Web Vitals](https://web.dev/vitals/)
