import React, { useState, useEffect, useRef } from 'react';
// import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

const CoinFlipApp = () => {
  const [outcome, setOutcome] = useState('');
  const [isFlipping, setIsFlipping] = useState(false);
  const coinRef = useRef(null);
  const containerRef = useRef(null); // Ref for the main container
  const [resultText, setResultText] = useState("Heads or Tails?"); // State for the result text

  const flipCoin = () => {
    setIsFlipping(true);
    setOutcome('');
    setResultText("Heads or Tails?"); // Keep "Heads or Tails?" during flip

    const randomNumber = Math.random();
    const newOutcome = randomNumber < 0.5 ? 'Heads' : 'Tails';

    if (coinRef.current && containerRef.current) {
      const coinElement = coinRef.current;
      const containerElement = containerRef.current;

      // Use a sequence of style changes
      coinElement.style.transition = 'none';
      coinElement.style.backgroundImage = 'url(https://i.ibb.co/KxpM7R7q/flip.gif)'; // Start with the GIF
      coinElement.style.backgroundSize = 'cover';

      // Force a reflow
      void coinElement.offsetWidth;

      coinElement.style.transition = '2s linear';

      setTimeout(() => {
        setIsFlipping(false);
        setOutcome(newOutcome);
        setResultText(`${newOutcome}!`); // Set result text
        coinElement.style.transition = 'none';
        coinElement.style.backgroundImage =
          newOutcome === 'Heads'
            ? 'url(https://i.ibb.co/jjgYVyY/head.png)'
            : 'url(https://i.ibb.co/MkpM953h/tail.png)';
        coinElement.style.backgroundSize = 'cover';
      }, 2000);
    }
  };

  useEffect(() => {
    if (!isFlipping) {
      if (coinRef.current && containerRef.current) {
        const coinElement = coinRef.current;
        const containerElement = containerRef.current;
        coinElement.style.transition = 'none'; // Stop transition
        coinElement.style.backgroundImage = outcome === 'Tails'
        ? 'url(https://i.ibb.co/MkpM953h/tail.png)'
        : 'url(https://i.ibb.co/jjgYVyY/head.png)'; // set default image.
        coinElement.style.transform = 'rotate(0deg)'; // Ensure it's at the base
      }
    }
  }, [isFlipping, outcome]);

  return (
    <div>
      <div
       ref={containerRef}
        style={{ minHeight: '100vh', // Equivalent to min-h-screen
          backgroundImage: 'linear-gradient(to bottom right, #f3f4f6, #d1d5db)', // Equivalent to bg-gradient-to-br from-gray-100 to-gray-300
          display: 'flex', // Equivalent to flex
          flexDirection: 'column', // Equivalent to flex-col
          alignItems: 'center', // Equivalent to items-center
          justifyContent: 'center', // Equivalent to justify-center
          padding: '1rem', // Equivalent to p-4 (assuming 1rem = 16px, adjust as needed)
          }} // Add a minimum height
      >     

        <h1 
        style={{
          fontSize: '1.875rem', // Equivalent to text-3xl (roughly 30px, adjust if needed)
          fontWeight: 'bold', // Equivalent to font-bold
          color: '#1e293b', // Equivalent to text-gray-800
          marginBottom: '1.5rem', // Equivalent to mb-6 (24px),
          textAlign: 'center', // Equivalent to text-center
        }}
        >
          Pepe Coin Flip
        </h1>

        <div
         ref={coinRef}
         style={{
           width: '12rem',       // Equivalent to w-48 (48 * 0.25rem = 12rem)
           height: '12rem',      // Equivalent to h-48 (48 * 0.25rem = 12rem)
            borderRadius: '50%', // Equivalent to rounded-full
            marginBottom: '2rem',    // Equivalent to mb-8 (8 * 0.25rem = 2rem)
            display: 'flex',     // Equivalent to flex
            alignItems: 'center', // Equivalent to items-center
            justifyContent: 'center', // Equivalent to justify-center
            position: 'relative',  // Equivalent to relative
            transition: 'transform 1s ease', //  Equivalent to transition-transform duration-1000, added ease
            backgroundSize: 'cover',
            boxShadow: '0 6px 10px -2px rgba(0, 0, 0, 0.15)',
            perspective: '1000px',
          }}
          
          
          >
        </div>

	<button
          onClick={flipCoin}
          disabled={isFlipping}
          style={{color:"green", backgroundColor:"white", borderRadius:"10px", padding:"10px 20px", fontSize:"16px", fontWeight:"bold", cursor: isFlipping ? 'not-allowed' : 'pointer', transition: 'background-color 0.3s ease'}}
>
     {isFlipping ? 'Flipping...' : 'Flip the Coin'}
</button>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="mt-6 text-center"
          >
          <p className="text-xl font-semibold text-gray-700">
            {resultText}
          </p>
        </motion.div>
      </div>
    </div>
  
  );
};

export default CoinFlipApp;
