# Image Optimization Guide

## Current Status

The profile image (`/public/profile.jpg`) is currently 69.4 KiB but can be optimized to ~28.2 KiB.

## Optimization Steps

### Option 1: Manual Image Optimization (Recommended for now)

1. **Resize the image** to match display dimensions:
   - Displayed at: 444x666px (via Tailwind's h-80 class)
   - Current size: 854x853px
   - Recommended: Export at 444x666 or similar

2. **Compress with ImageOptim or similar tool:**
   ```bash
   # Using imagemin (install globally or locally)
   npm install -g imagemin imagemin-mozjpeg

   # Compress the image
   imagemin public/profile.jpg --out-dir=public --plugin=mozjpeg --quality=80
   ```

3. **Convert to WebP for modern browsers:**
   ```bash
   # Using cwebp
   cwebp public/profile.jpg -o public/profile.webp -q 80
   ```

4. **Update the image source** to use WebP with JPEG fallback:
   ```vue
   <picture>
     <source srcset="/profile.webp" type="image/webp" fetchpriority="high" />
     <img src="/profile.jpg" alt="Profile photo" class="..." />
   </picture>
   ```

### Option 2: Integrate @nuxt/image (Recommended for production)

This will automatically handle all image optimization:

```bash
npm install @nuxt/image
```

Update `nuxt.config.ts`:
```typescript
export default defineNuxtConfig({
  modules: ['@nuxt/image'],
  image: {
    quality: 80,
    formats: ['webp', 'jpeg'],
    sizes: [320, 640, 1024],
    presets: {
      avatar: {
        modifiers: {
          width: 444,
          height: 666,
          fit: 'cover',
        },
      },
    },
  },
})
```

Then use in template:
```vue
<NuxtImg
  src="/profile.jpg"
  alt="Profile photo"
  preset="avatar"
  fetchpriority="high"
  class="w-full h-full object-cover object-top"
  @error="handleError"
/>
```

### Option 3: Use Online Tools

1. **TinyPNG/TinyJPG**: https://tinypng.com (drag and drop)
2. **ImageOptim**: https://imageoptim.com
3. **Squoosh**: https://squoosh.app (Google's tool)

## Expected Results After Optimization

| Metric | Before | After | Savings |
|--------|--------|-------|---------|
| File Size | 69.4 KiB | ~28.2 KiB | 41.2 KiB (59%) |
| Format | JPEG | WebP + JPEG | Better compression |
| LCP Impact | 0.8s | ~0.65s | 150ms faster |

## Testing

### Test in Incognito Mode (Most Accurate)

Chrome's Lighthouse can be affected by extensions. For accurate results:

1. Open DevTools (F12)
2. Go to Lighthouse tab
3. Click "Analyze page load"
4. Or open incognito window: Ctrl+Shift+N
5. Run Lighthouse audit in incognito

### Cache Headers Testing

In development server, caching isn't always applied. To verify production caching:

```bash
# Build for production
npm run build

# Preview the build
npm run preview

# The preview server will properly apply cache headers
```

Then run Lighthouse on the preview server (usually http://localhost:3000)

### Image Delivery Verification

After optimization, verify in DevTools:

1. Network tab
2. Filter by `/profile.jpg` or `/profile.webp`
3. Check "Size" column - should be ~28 KiB instead of 69 KiB
4. Check "Type" - should show image/webp or image/jpeg

## Configuration Notes

### Current Setup
- ✅ Lazy loading replaced with `loading="eager"` for LCP image
- ✅ `fetchpriority="high"` added to profile image
- ✅ `decoding="async"` for non-blocking decoding
- ✅ Proper aspect ratio maintained

### Production Deployment

When deploying to production (Vercel, Netlify, etc.):

1. Cache headers will be automatically applied
2. Static assets are served with CDN caching
3. Modern HTTP/2 or HTTP/3 will be used
4. Brotli/Gzip compression happens automatically

### Testing Checklist

- [ ] Image resized to display dimensions
- [ ] JPEG compressed to 80% quality
- [ ] WebP version created
- [ ] Updated image source in HTML
- [ ] Run Lighthouse in incognito
- [ ] Verify LCP < 2.5s
- [ ] Check Network tab for image size reduction

## Quick Win: Immediate Action

If you want to optimize the image quickly:

```bash
# Using imagemin (requires local install)
npm install --save-dev imagemin imagemin-mozjpeg

# Compress current image
npx imagemin public/profile.jpg --out-dir=public --plugin=mozjpeg
```

This single command will reduce the image size significantly while maintaining quality.

## References

- [Responsive Images (MDN)](https://developer.mozilla.org/en-US/docs/Learn/HTML/Multimedia_and_embedding/Responsive_images)
- [Image Optimization Guide (Google)](https://developers.google.com/web/fundamentals/performance/optimizing-content-efficiency/image-optimization)
- [Nuxt Image Module](https://image.nuxt.com/)
- [WebP Format](https://developers.google.com/speed/webp)
