const fs = require("fs")
const path = require("path")

// Create directory structure
const directories = [
  "css",
  "js",
  "legal",
  "legal/cookies-policy",
  "auth",
  "auth/signin",
  "auth/signup",
  "about",
  "shop",
  "shop/hyper-flux-headset",
  "shop/quantum-strike-keyboard",
  "shop/gamma-pro-mouse",
  "shop/aether-glide-mousepad",
  "shop/chrono-stream-webcam",
  "shop/vortex-cooling-stand",
  "shop/echo-pulse-speakers",
  "shop/guardian-controller",
  "blog",
  "blog/rise-of-optical-switches",
  "blog/finding-your-perfect-dpi",
  "blog/7-1-surround-sound-gimmick-or-game-changer",
  "blog/art-of-cable-management",
]

console.log("Creating directory structure...")
directories.forEach((dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true })
    console.log(`Created: ${dir}/`)
  }
})

console.log("\n✅ Project structure created successfully!")
console.log("\nNext steps:")
console.log("1. Copy all HTML files to their respective directories")
console.log("2. Copy the CSS file to the css/ directory")
console.log("3. Copy the JavaScript file to the js/ directory")
console.log("4. Open index.html in your browser to view the site")
console.log("5. Test the cookie banner and settings functionality")
console.log("6. Deploy to any static hosting service (Netlify, Vercel, GitHub Pages, etc.)")
