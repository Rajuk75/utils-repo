import { useState, useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';

// Image filenames from public folder
const images = [
  "WhatsApp Image 2026-01-29 at 10.39.31 PM.jpeg",
  "WhatsApp Image 2026-01-29 at 10.39.33 PM.jpeg",
  "WhatsApp Image 2026-01-29 at 10.39.34 PM (1).jpeg",
  "WhatsApp Image 2026-01-29 at 10.39.34 PM (2).jpeg",
  "WhatsApp Image 2026-01-29 at 10.39.34 PM.jpeg",
  "WhatsApp Image 2026-01-29 at 10.39.35 PM (1).jpeg",
  "WhatsApp Image 2026-01-29 at 10.39.35 PM.jpeg",
  "WhatsApp Image 2026-01-29 at 10.42.00 PM.jpeg",
  "WhatsApp Image 2026-01-29 at 10.42.05 PM.jpeg"
];

function ParallaxImage({ src, index }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const rotate = useTransform(scrollYProgress, [0, 1], [index % 2 === 0 ? -10 : 10, index % 2 === 0 ? 10 : -10]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8]);

  return (
    <motion.div
      ref={ref}
      style={{ y, rotate, scale }}
      className={`relative w-full md:w-[600px] h-[400px] md:h-[600px] mx-auto my-32 p-3 bg-white/5 backdrop-blur-lg rounded-3xl border border-pink-500/30 overflow-hidden transform transition-all hover:z-50 hover:scale-105 duration-500`}
      // Pink shadow glow - Intensified
      initial={{ boxShadow: "0 0 30px rgba(236, 72, 153, 0.6)" }}
      whileHover={{ boxShadow: "0 0 60px rgba(236, 72, 153, 0.9)" }}
      
      onViewportEnter={() => {
         // Burst when photo comes into view
         confetti({
            particleCount: 80,
            spread: 60,
            origin: { x: index % 2 === 0 ? 0 : 1, y: 0.5 },
            angle: index % 2 === 0 ? 60 : 120,
            colors: ['#FFD700', '#FF69B4', '#00BFFF', '#FFFFFF']
         });
      }}
    >
      {/* Hanging String/Wire Effect */}
      <div className={`absolute -top-32 ${index % 2 === 0 ? 'left-10' : 'right-10'} w-1 h-32 bg-gradient-to-b from-transparent via-pink-400/50 to-pink-500`} />
      <div className={`absolute -top-3 ${index % 2 === 0 ? 'left-9' : 'right-9'} w-3 h-3 rounded-full bg-pink-500 shadow-[0_0_10px_#ec4899]`} />

      <div className="w-full h-full rounded-2xl overflow-hidden relative group">
        <img
          src={`/${src}`}
          alt="Memory"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
    </motion.div>
  );
}

// Re-adding SkyPage component
const SkyPage = ({ onBack }) => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 z-50 bg-black overflow-hidden flex flex-col items-center justify-center font-['Outfit']"
    >
      {/* Warp Speed Stars - Enhanced */}
      {[...Array(150)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute bg-white rounded-full"
          initial={{
            x: Math.random() * window.innerWidth,
            y: -20,
            width: Math.random() * 3 + 1,
            height: Math.random() * 80 + 20,
            opacity: Math.random()
          }}
          animate={{
            y: window.innerHeight + 100,
            opacity: [0, 0.8, 0]
          }}
          transition={{
            duration: Math.random() * 0.3 + 0.1, // Faster warp speed
            repeat: Infinity,
            ease: "linear",
            delay: Math.random() * 2
          }}
          style={{
            boxShadow: '0 0 10px rgba(255, 255, 255, 0.8)'
          }}
        />
      ))}

      {/* Central Content with Hinglish Messages */}
      <div className="z-10 text-center relative px-6 max-w-4xl">
        <motion.div
           initial={{ scale: 0.5, opacity: 0 }}
           animate={{ scale: 1, opacity: 1 }}
           transition={{ duration: 1, type: "spring" }}
           className="mb-12"
        >
            <h1 className="text-6xl md:text-8xl font-['Dancing_Script'] text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-pink-400 to-cyan-300 drop-shadow-[0_0_30px_rgba(255,105,180,0.6)] mb-6">
              2026 is YOURS!
            </h1>
        </motion.div>

        <motion.div
           className="space-y-8 backdrop-blur-sm bg-black/20 p-8 rounded-3xl border border-white/10"
           initial={{ y: 50, opacity: 0 }}
           animate={{ y: 0, opacity: 1 }}
           transition={{ delay: 0.5 }}
        >
            <motion.p 
              className="text-2xl md:text-3xl text-white font-bold leading-relaxed"
              animate={{ scale: [1, 1.02, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              "Cheers to another year of greatness! 🎂🎈"
            </motion.p>
            
            <p className="text-xl md:text-2xl text-blue-200 opacity-90">
              May all your dreams turn into reality. <br/>
              Keep shining and conquering new heights! 🌟
            </p>

            <div className="flex justify-center gap-4 text-4xl py-4">
                <span>🍰</span><span>🎁</span><span>🥳</span><span>🍾</span>
            </div>

            <p className="text-lg md:text-xl text-pink-200 italic mt-2">
              Stay Awesome, Stay You! ❤️
            </p>
        </motion.div>
      </div>

      {/* Floating Celebration Emojis */}
      {[...Array(15)].map((_, i) => (
         <motion.div
            key={`emoji-${i}`}
            className="absolute text-5xl opacity-60"
            initial={{ 
                x: Math.random() * window.innerWidth, 
                y: window.innerHeight 
            }}
            animate={{ 
                y: -100,
                rotate: Math.random() * 360 - 180,
                scale: [1, 1.2, 1]
            }}
            transition={{ 
                duration: Math.random() * 5 + 5, 
                repeat: Infinity, 
                ease: "linear",
                delay: Math.random() * 5
            }}
         >
            {['🎈', '🎂', '🎁', '🕯️', '🍬', '🧁'][i % 6]}
         </motion.div>
      ))}

      {/* Bottom Gradient */}
      <div className="absolute bottom-0 w-full h-1/2 bg-gradient-to-t from-indigo-900 via-purple-900/40 to-transparent blur-2xl pointer-events-none" />
      
      <motion.button
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 2, type: "spring" }}
        onClick={onBack}
        className="absolute bottom-10 px-8 py-2 bg-white/10 backdrop-blur-md border border-white/30 text-white font-medium rounded-full hover:bg-white/20 hover:scale-105 transition-all shadow-[0_0_15px_rgba(255,255,255,0.2)] hover:shadow-[0_0_25px_rgba(255,255,255,0.4)] z-20 text-base tracking-wide"
      >
        Wapas a jao jameen pr 😂
      </motion.button>
    </motion.div>
  );
};

const App = () => {
  // ... existing state and logic ...
  const [isOpen, setIsOpen] = useState(false);
  const [showGallery, setShowGallery] = useState(false);
  const [isLaunching, setIsLaunching] = useState(false);

  // ... existing useEffect and handleOpen ...
  useEffect(() => {
    if (isOpen && !isLaunching) {
        const interval = setInterval(() => {
            confetti({
                particleCount: 5,
                angle: 90,
                spread: 360,
                origin: { x: Math.random(), y: -0.1 },
                colors: ['#FFD700', '#FF69B4', '#00BFFF'],
                ticks: 200,
                gravity: 0.8,
                drift: 0.5,
                startVelocity: 20
            });
        }, 300);
        return () => clearInterval(interval);
    }
  }, [isOpen, isLaunching]);

  const handleOpen = () => {
    setIsOpen(true);
    const duration = 3000;
    const end = Date.now() + duration;

    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#FFD700', '#FF69B4', '#00BFFF', '#FF4500', '#7B68EE']
    });

    const frame = () => {
      confetti({
        particleCount: 2,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#FFD700', '#FF69B4']
      });
      confetti({
        particleCount: 2,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#00BFFF', '#7B68EE']
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    frame();

    setTimeout(() => {
      setShowGallery(true);
    }, 1500);
  };

  if (isLaunching) {
    return <SkyPage onBack={() => setIsLaunching(false)} />;
  }

  return (
    <div className="min-h-screen bg-[#050511] text-white overflow-x-hidden font-['Outfit']">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@700&family=Outfit:wght@300;400;600&display=swap');
        .scrollbar-hide::-webkit-scrollbar { display: none; }
      `}</style>
      
      {/* Floating Particles Background */}
      <div className="fixed inset-0 pointer-events-none z-0">
          {[...Array(30)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-white blur-[1px]"
              initial={{ 
                x: Math.random() * window.innerWidth, 
                y: Math.random() * window.innerHeight,
                opacity: Math.random() * 0.5 + 0.1,
                scale: Math.random() * 0.5 + 0.1
              }}
              animate={{ 
                y: [null, Math.random() * -100],
                x: [null, Math.random() * 50 - 25]
              }}
              transition={{ 
                duration: Math.random() * 10 + 10, 
                repeat: Infinity, 
                ease: "linear",
                yoyo: Infinity
              }}
              style={{
                width: Math.random() * 10 + 'px',
                height: Math.random() * 10 + 'px',
              }}
            />
          ))}
      </div>

      {!isOpen ? (
        <div className="h-screen w-screen flex flex-col items-center justify-center relative z-10 overflow-hidden">
           {/* Background Decorations */}
           <div className="absolute inset-0 pointer-events-none">
              {[...Array(15)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute text-4xl opacity-30"
                  initial={{ 
                    x: Math.random() * window.innerWidth, 
                    y: window.innerHeight + 100 
                  }}
                  animate={{ 
                    y: -100,
                    x: Math.random() * window.innerWidth 
                  }}
                  transition={{ 
                    duration: Math.random() * 10 + 15, 
                    repeat: Infinity, 
                    ease: "linear",
                    delay: Math.random() * 5
                  }}
                >
                  {['🎈', '🎁', '✨', '🎂'][i % 4]}
                </motion.div>
              ))}
           </div>

           <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center z-10 w-full px-4"
          >


            <motion.div 
               className="relative group cursor-pointer w-64 h-64 mx-auto"
               onClick={handleOpen}
               whileHover={{ scale: 1.05 }}
               whileTap={{ scale: 0.95 }}
            >
              {/* Animated Gift Box */}
              <div className="absolute inset-0 bg-gradient-to-tr from-rose-500 to-pink-600 rounded-3xl shadow-[0_0_50px_rgba(255,20,147,0.6)] flex items-center justify-center transform transition-all group-hover:rotate-3">
                <div className="absolute w-full h-16 bg-yellow-300/90 top-1/2 -translate-y-1/2 shadow-lg" />
                <div className="absolute h-full w-16 bg-yellow-300/90 left-1/2 -translate-x-1/2 shadow-lg" />
                
                {/* Lid */}
                <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-[110%] h-24 bg-rose-600 rounded-lg shadow-2xl z-20 flex items-center justify-center">
                    <div className="w-16 h-full bg-yellow-300/90" />
                    {/* Bow/Icon */}
                    <div className="absolute -top-12 text-7xl drop-shadow-lg filter hue-rotate-15 animate-bounce">💖</div>
                    <div className="absolute -top-10 left-8 text-4xl animate-pulse">✨</div>
                    <div className="absolute -top-4 -left-4 text-4xl animate-pulse delay-75">✨</div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5, repeat: Infinity, repeatType: "reverse", duration: 1 }}
              className="mt-16"
            >
              <p className="text-xl text-white/80 font-semibold tracking-wider uppercase mb-2">Tap to Open</p>
              <div className="text-3xl animate-bounce">👇</div>
            </motion.div>
          </motion.div>
        </div>
      ) : (
        <div className="relative z-10 w-full min-h-screen">
          {/* Main Content Header */}
          <div className="h-screen flex flex-col items-center justify-center relative px-4">
            <motion.h1
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 100 }}
              className="text-7xl md:text-9xl font-['Dancing_Script'] text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-pink-400 to-purple-400 drop-shadow-[0_0_20px_rgba(236,72,153,0.5)] text-center"
            >
              Happy Birthday!
            </motion.h1>
            
            <motion.p
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-8 text-xl text-center text-gray-200 max-w-md mx-auto leading-relaxed"
            >
               Scroll down to walk through the memory lane... 📸✨
            </motion.p>
            
            <div className="absolute bottom-10 animate-bounce text-center w-full">
               <span className="text-sm opacity-50 block mb-2">SCROLL</span>
               <div className="w-[1px] h-16 bg-gradient-to-b from-white to-transparent mx-auto" />
            </div>
          </div>

          {/* S-Shape Connected Wire Background */}
          {showGallery && (
            <svg className="absolute top-0 left-0 w-full h-full pointer-events-none z-0" style={{ height: (images.length * 560 + 1000) + 'px' }}>
              <defs>
                 <linearGradient id="wireGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#ec4899" stopOpacity="0" />
                    <stop offset="10%" stopColor="#ec4899" stopOpacity="1" />
                    <stop offset="90%" stopColor="#8b5cf6" stopOpacity="1" />
                    <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0" />
                 </linearGradient>
              </defs>
              <path
                d={images.map((_, i) => {
                    if (i === images.length - 1) return '';
                    // Calculate exact anchor points for center-aligned cards
                    // Card Height: ~400px (mobile) to 600px (desktop)
                    // Margin: 8rem top + 8rem bottom = 128px
                    // Total spacing approx 530px - 600px
                    
                    const spacing = 530; // Estimated spacing between card centers
                    const startY = 800;  // Initial offset
                    
                    // From bottom of card i
                    const fromY = startY + (i * spacing) + 200; // + half card height
                    
                    // To top of card i+1
                    const toY = startY + ((i + 1) * spacing) - 200; // - half card height
                    
                    const xCenter = window.innerWidth / 2;
                    
                    // Control points for S-curve
                    const cp1Y = fromY + 150;
                    const cp2Y = toY - 150;
                    
                    // Swerve magnitude
                    const swerve = 80; 
                    const cp1X = i % 2 === 0 ? xCenter + swerve : xCenter - swerve;
                    const cp2X = i % 2 === 0 ? xCenter - swerve : xCenter + swerve;
                    
                    return `M ${xCenter} ${fromY} C ${cp1X} ${cp1Y}, ${cp2X} ${cp2Y}, ${xCenter} ${toY}`;
                }).join(' ')}
                fill="none"
                stroke="url(#wireGradient)"
                strokeWidth="3"
                strokeDasharray="15 10"
                strokeLinecap="round"
                className="drop-shadow-[0_0_5px_rgba(236,72,153,0.5)]"
              />
            </svg>
          )}

          {/* Gallery Section */}
          <div className="container mx-auto px-4 pb-32 relative z-10 mt-10">
             {showGallery && (
               <motion.div
                 initial={{ opacity: 0 }}
                 animate={{ opacity: 1 }}
                 transition={{ duration: 1 }}
               >
                 {images.map((img, index) => (
                   <div key={index} className="relative">
                     {/* Floating Balloons between sections */}
                     <motion.div
                        className="absolute text-6xl pointer-events-none z-0"
                        initial={{ 
                          top: '50%',
                          left: index % 2 === 0 ? '-10%' : '90%',
                          scale: 0
                        }}
                        whileInView={{ 
                          y: -100,
                          opacity: [0, 1, 0],
                          scale: 1,
                        }}
                        transition={{ duration: 4 }}
                      >
                        {['🎈', '✨', '🎁', '💖'][index % 4]}
                      </motion.div>

                     <ParallaxImage src={img} index={index} />
                   </div>
                 ))}
               </motion.div>
             )}
          </div>
          
          {/* Footer Call to Action */}
          <div className="h-[50vh] flex items-center justify-center pb-20 relative overflow-hidden">
             <div className="absolute inset-0 bg-gradient-to-t from-indigo-900/50 to-transparent pointer-events-none" />
             <motion.button
              whileHover={{ 
                scale: 1.1, 
                textShadow: "0 0 8px rgb(255,255,255)",
                boxShadow: "0 0 20px rgba(100,200,255,0.5)"
              }}
              whileTap={{ scale: 0.9 }}
              onClick={() => {
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                  setTimeout(() => setIsLaunching(true), 500);
              }}
              className="relative z-10 group bg-transparent border-2 border-white/30 px-12 py-6 rounded-full overflow-hidden transition-all duration-300 hover:border-white/80"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <span className="relative z-10 flex items-center gap-3 font-bold text-2xl tracking-wider uppercase">
                🚀 Launch into 2026
              </span>
            </motion.button>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
