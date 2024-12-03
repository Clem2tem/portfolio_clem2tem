'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';

const Highlight: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null); // Conteneur global
  const cardRef = useRef<HTMLDivElement>(null); // Carte contenant les halos
  const [enableMouseTracking, setEnableMouseTracking] = useState(false); // État pour activer/désactiver le suivi de la souris

  // Active la détection de la souris après 1.5 secondes
  useEffect(() => {
    const timer = setTimeout(() => {
      setEnableMouseTracking(true);
    }, 1500); // Délai de 1.5 secondes

    return () => clearTimeout(timer); // Nettoie le timer si le composant est démonté
  }, []);

  // Suivi de la souris pour les halos
  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      if (cardRef.current && enableMouseTracking) {
        const rect = cardRef.current.getBoundingClientRect();
        const x = event.clientX - rect.left; // Position X relative à la carte
        const y = event.clientY - rect.top; // Position Y relative à la carte

        // Met à jour les variables CSS pour les halos
        cardRef.current.style.setProperty('--mouse-x', `${x}px`);
        cardRef.current.style.setProperty('--mouse-y', `${y}px`);
      }
    };

    if (enableMouseTracking) {
      window.addEventListener('mousemove', handleMouseMove);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [enableMouseTracking]);

  // Rotation dynamique en fonction de la position de la souris
  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      if (cardRef.current && enableMouseTracking) {
        const rect = cardRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2; // Centre horizontal
        const centerY = rect.top + rect.height / 2; // Centre vertical

        const deltaX = event.clientX - centerX; // Distance par rapport au centre en X
        const deltaY = event.clientY - centerY; // Distance par rapport au centre en Y

        const rotateX = deltaY / 20; // Sensibilité verticale
        const rotateY = -deltaX / 20; // Sensibilité horizontale

        // Applique la rotation via GSAP
        gsap.to(cardRef.current, {
          rotationX: rotateX,
          rotationY: rotateY,
          duration: 0.2, // Transition fluide
          ease: 'power2.out',
        });
      }
    };

    if (enableMouseTracking) {
      window.addEventListener('mousemove', handleMouseMove);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [enableMouseTracking]);

  return (
    <motion.div
      ref={containerRef}
      className="flex justify-center items-center h-[50vh] max-w-[15vw] z-50"
      initial={{
        scale: 1.5, // Commence très grand
        x: 0,
        y: 0,
      }}
      animate={{
        scale: [1.5, 0.9, 1], // Rétrécit, puis revient à la taille normale
        x: ['-10%', '-10%', '0%'], // Bouge légèrement horizontalement
        y: ['20%', '20%', '0%'], // Bouge légèrement verticalement
      }}
      transition={{
        delay: 1,
        duration: 1, // Durée de la transition
        ease: 'easeInOut', // Transition fluide
        times: [0, 0.8, 1], // Étapes de l'animation
      }}
    >
      {/* Carte contenant les halos */}
      <div
        ref={cardRef}
        className="highlight h-[50vh] max-w-[20vw] relative bg-slate-800 p-px overflow-hidden rounded-3xl"
        style={{
          transformStyle: 'preserve-3d', // Permet un rendu correct des transformations 3D
          perspective: '800px', // Perspective pour effet 3D
        }}
      >
        {/* Halo interne */}
        <div
          className="absolute w-80 h-80 -left-40 -top-40 bg-indigo-300 rounded-full opacity-0 pointer-events-none transition-opacity duration-500 group-hover:opacity-50 z-10 blur-[140px]"
          style={{
            transform: 'translate(var(--mouse-x), var(--mouse-y))',
          }}
        ></div>

        {/* Halo externe */}
        <div
          className="absolute w-96 h-96 -left-48 -top-48 bg-indigo-500 rounded-full opacity-0 pointer-events-none transition-opacity duration-500 hover:opacity-10 z-30 blur-[100px]"
          style={{
            transform: 'translate(var(--mouse-x), var(--mouse-y))',
          }}
        ></div>

        {/* Image */}
        <img
          src="/images/peur.jpg" // Remplacez par le chemin vers votre image
          alt="Fashion Model"
          className="highlight-image w-full h-full object-cover rounded-3xl z-10"
          draggable={false} // Désactive le comportement natif de drag
          onDragStart={(event) => event.preventDefault()} // Empêche le comportement par défaut
          style={{
            transform: 'translateZ(10px)',
          }}
        />
      </div>
    </motion.div>
  );
};

export default Highlight;
