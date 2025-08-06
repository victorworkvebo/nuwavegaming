// Mock data for products and blog posts

export const products = [
  {
    id: 1,
    name: "Hyper-Flux Headset",
    slug: "hyper-flux-headset",
    price: 149.99,
    image: "/placeholder.svg?height=400&width=400",
    shortDescription: "7.1 surround sound with crystal-clear mic.",
    description:
      "Immerse yourself in the game with the Hyper-Flux Headset. Featuring 7.1 virtual surround sound, a noise-cancelling microphone, and plush memory foam earcups for ultimate comfort during long gaming sessions.",
  },
  {
    id: 2,
    name: "Quantum-Strike Keyboard",
    slug: "quantum-strike-keyboard",
    price: 189.99,
    image: "/placeholder.svg?height=400&width=400",
    shortDescription: "Optical switches for light-speed actuation.",
    description:
      "Gain a competitive edge with the Quantum-Strike Keyboard. Equipped with ultra-fast optical-mechanical switches, customizable RGB lighting, and a durable aluminum frame, it's built for pro-level gaming.",
  },
  {
    id: 3,
    name: "Gamma Pro Mouse",
    slug: "gamma-pro-mouse",
    price: 89.99,
    image: "/placeholder.svg?height=400&width=400",
    shortDescription: "Lightweight ergonomic design with 20K DPI sensor.",
    description:
      "Precision is key. The Gamma Pro Mouse features a flawless 20,000 DPI optical sensor, a lightweight ergonomic shell, and programmable buttons to fine-tune your gameplay.",
  },
  {
    id: 4,
    name: "Aether-Glide Mousepad",
    slug: "aether-glide-mousepad",
    price: 39.99,
    image: "/placeholder.svg?height=400&width=400",
    shortDescription: "Extended size with an ultra-low friction surface.",
    description:
      "Complete your setup with the Aether-Glide Mousepad. Its micro-woven cloth surface provides the perfect amount of friction for precise mouse movements, while the extended size offers ample room for your keyboard and mouse.",
  },
  {
    id: 5,
    name: "Chrono-Stream Webcam",
    slug: "chrono-stream-webcam",
    price: 129.99,
    image: "/placeholder.svg?height=400&width=400",
    shortDescription: "Crisp 1080p 60FPS for professional streaming.",
    description:
      "Look your best on stream with the Chrono-Stream Webcam. It delivers sharp, smooth video at 1080p 60FPS, with intelligent auto-focus and lighting correction to keep you in the spotlight.",
  },
  {
    id: 6,
    name: "Vortex Cooling Stand",
    slug: "vortex-cooling-stand",
    price: 59.99,
    image: "/placeholder.svg?height=400&width=400",
    shortDescription: "Keep your laptop cool under pressure.",
    description:
      "Prevent thermal throttling and maintain peak performance with the Vortex Cooling Stand. Its powerful, quiet fans and ergonomic design make it an essential for any laptop gamer.",
  },
  {
    id: 7,
    name: "Echo-Pulse Speakers",
    slug: "echo-pulse-speakers",
    price: 99.99,
    image: "/placeholder.svg?height=400&width=400",
    shortDescription: "2.1 system with rich bass and clear highs.",
    description:
      "Feel every explosion with the Echo-Pulse 2.1 Speaker System. A dedicated subwoofer provides deep, rumbling bass while the satellite speakers deliver crisp, clear audio for a truly cinematic experience.",
  },
  {
    id: 8,
    name: "Guardian Controller",
    slug: "guardian-controller",
    price: 79.99,
    image: "/placeholder.svg?height=400&width=400",
    shortDescription: "Pro-grade controller with remappable paddles.",
    description:
      "Take control with the Guardian. Featuring four programmable back paddles, interchangeable thumbsticks, and trigger stops, it's the ultimate controller for competitive console and PC gaming.",
  },
]

export const posts = [
  {
    id: 1,
    title: "The Rise of Optical Switches in Gaming Keyboards",
    slug: "rise-of-optical-switches",
    author: "Alex Chen",
    date: "July 26, 2025",
    image: "/placeholder.svg?height=400&width=600",
    excerpt:
      "Mechanical switches have long been the gold standard, but a new contender has entered the arena. We dive deep into why optical switches are becoming the preferred choice for esports professionals.",
    content:
      "For years, the satisfying click-clack of mechanical switches has been the soundtrack to countless gaming victories. Cherry MX, Gateron, and Kailh became household names among enthusiasts. But technology never stands still. Enter the optical switch.\n\nUnlike traditional mechanical switches that rely on a metal contact point to register a keystroke, optical switches use a beam of infrared light. When you press a key, the stem blocks this beam, and the interruption is what sends the signal to your computer. This fundamental difference offers several key advantages. First, actuation is virtually instantaneous, eliminating the debounce delay found in mechanical switches. This can shave precious milliseconds off your reaction time. Second, with no metal contacts to wear down, optical switches boast a much longer lifespan, often rated for 100 million keystrokes or more. Finally, the lack of physical contact means a smoother, more consistent keypress over the life of the keyboard. It's a game-changing innovation that's here to stay.",
  },
  {
    id: 2,
    title: "Finding Your Perfect DPI: A Guide to Mouse Sensitivity",
    slug: "finding-your-perfect-dpi",
    author: "Jenna Riley",
    date: "July 18, 2025",
    image: "/placeholder.svg?height=400&width=600",
    excerpt:
      "High DPI isn't always better. Learn how to find the sweet spot for your mouse sensitivity to improve your aim and consistency in any game.",
    content:
      "Marketing for gaming mice often touts incredibly high DPI (Dots Per Inch) numbers—16,000, 20,000, even higher. But does a higher DPI actually make you a better gamer? The answer is complicated. DPI is a measure of how sensitive your mouse is. A higher DPI means your cursor will move further on screen for the same physical movement of the mouse.\n\nWhile a high DPI can be useful for quickly navigating large monitors, for gaming—especially FPS titles—most pros use surprisingly low DPI settings, typically between 400 and 1600. Why? A lower DPI provides more control and precision. It forces you to use your whole arm for large movements and your wrist for fine adjustments, which is more ergonomic and leads to better muscle memory. The key is to find a balance that works for you. A good starting point is to set your DPI to 800 and adjust your in-game sensitivity until you can comfortably do a 180-degree turn by moving your mouse from the center to the edge of your mousepad. Experiment, be patient, and you'll find the perfect setting to land more headshots.",
  },
  {
    id: 3,
    title: "7.1 Surround Sound: Gimmick or Game-Changer?",
    slug: "7-1-surround-sound-gimmick-or-game-changer",
    author: "Dr. Evelyn Reed",
    date: "July 10, 2025",
    image: "/placeholder.svg?height=400&width=600",
    excerpt:
      "We break down the technology behind virtual surround sound in gaming headsets and whether it truly gives you a competitive advantage.",
    content:
      "Virtual 7.1 surround sound is a staple feature in modern gaming headsets, promising a 360-degree audio experience that lets you pinpoint enemy footsteps and gunfire. But how does it work, and is it as effective as a true multi-speaker home theater setup? Virtual surround sound uses sophisticated audio processing algorithms to simulate seven speakers and a subwoofer within just two headset drivers. It manipulates the timing, volume, and frequency of sounds to trick your brain into perceiving directionality.\n\nFor competitive gaming, the results can be transformative. In games like Valorant or Call of Duty, being able to accurately hear an opponent reloading around a corner or running up behind you is a massive advantage. While it may not replicate the fidelity of a true 7.1 system, it provides crucial positional audio cues in a convenient, headphone-based package. However, the quality of the implementation varies wildly between brands. A good virtual surround sound system will have a clear, spacious soundstage, while a poor one can sound muddy and artificial. When shopping for a headset, it's crucial to look for reviews that specifically test the surround sound performance.",
  },
  {
    id: 4,
    title: "The Art of Cable Management for a Clean Battlestation",
    slug: "art-of-cable-management",
    author: "Marco Diaz",
    date: "July 02, 2025",
    image: "/placeholder.svg?height=400&width=600",
    excerpt:
      "A clean setup isn't just for looks—it can improve airflow and reduce distractions. Here are our top tips for taming the cable monster.",
    content:
      "A powerful gaming rig can quickly become a tangled mess of wires. Power cords, display cables, USB connectors, and audio jacks can create a 'cable spaghetti' situation that's not only ugly but can also restrict airflow and make cleaning a nightmare. Mastering cable management is the final step in creating a truly professional-looking battlestation.\n\nStart by unplugging everything. Group cables together based on their destination (e.g., all monitor cables, all peripheral cables). Use velcro ties or zip ties to bundle them neatly. Route these bundles along the back of your desk or through built-in cable channels. Under-desk cable trays or raceways are fantastic investments for hiding power strips and excess wiring. For the cables on your desk, consider braided sleeves to combine them into a single, clean-looking tube. It takes time and patience, but the result is a setup that looks incredible, is easier to maintain, and lets you focus on what truly matters: the game.",
  },
]
