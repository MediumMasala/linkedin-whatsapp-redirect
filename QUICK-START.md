# Quick Start - 5 Minutes Setup

## 1. Choose Your Approach

### Option A: Production Setup (Recommended)
Deploy `index.html` + `open.html` for best UX

### Option B: Single Page
Deploy `linkedin-redirect.html` for aggressive redirect

---

## 2. Update WhatsApp Number

**Find and replace in ALL files:**

```
Old: 919224262682
New: 919XXXXXXXXX (your number)

Old: +91 92242 62682
New: +91 XXXXX XXXXX (for display)
```

---

## 3. Deploy Files

### Option A Setup:
```
yourdomain.com/index.html
yourdomain.com/open.html
```

### Option B Setup:
```
yourdomain.com/linkedin-redirect.html
```

---

## 4. Test

1. Share link in LinkedIn DM to yourself
2. Open on Android phone via LinkedIn app
3. Tap the button
4. Verify WhatsApp opens

---

## 5. Use in LinkedIn Ads

**Ad URL:**
```
https://yourdomain.com/
```

Done! 🎉

---

## Files to Edit

### index.html
```javascript
// Line 303
const WHATSAPP_NUMBER = '919224262682'; // Change this

// Line 344
const phoneNumber = '+919224262682'; // Change this

// Line 288
<div class="phone-number">+91 92242 62682</div> // Change this
```

### open.html
```html
<!-- Line 244 -->
<a class="cta" href="intent://send?phone=919224262682&text=..."> // Change phone number
```

### open2.html
```html
<!-- Line 109 -->
<a id="mainBtn" class="btn" href="intent://send?phone=919224262682&text=..."> // Change phone number
```

### linkedin-redirect.html
```javascript
// Line 303
const WHATSAPP_NUMBER = '919606047104'; // Change this

// Line 344
const phoneNumber = '+919606047104'; // Change this
```

---

## Troubleshooting

**WhatsApp not opening?**
- Check Intent URL format is exact
- Verify WhatsApp installed on test device
- Try `open2.html` instead of `open.html`

**Copy button not working?**
- Ensure HTTPS is enabled
- Test on actual device (not desktop)

**Still stuck?**
Read `README.md` for full guide or `linkedin_whatsapp_redirect_solutions.md` for all solutions.
