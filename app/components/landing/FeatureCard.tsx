"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";

interface FeatureCardProps {
  title: string;
  desc: string;
  image: string;
}

export default function FeatureCard({ title, desc, image }: FeatureCardProps) {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const shineRef = useRef<HTMLDivElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = cardRef.current;
    const shine = shineRef.current;
    const content = contentRef.current;

    // Null guards — menghentikan seluruh animasi jika belum siap
    if (!el || !shine || !content) return;

    let targetX = 0,
      targetY = 0;
    let currentX = 0,
      currentY = 0;

    const ROT_MAX = 15;

    const clamp = (v: number, min: number, max: number) =>
      Math.max(min, Math.min(max, v));

    function onMove(e: MouseEvent) {
      if (!el || !shine) return; // safety

      const rect = el.getBoundingClientRect();
      const x = e.clientX - (rect.left + rect.width / 2);
      const y = e.clientY - (rect.top + rect.height / 2);

      const rotX = (x / (rect.width * 0.5)) * ROT_MAX;
      const rotY = -(y / (rect.height * 0.5)) * ROT_MAX;

      targetX = clamp(rotX, -ROT_MAX, ROT_MAX);
      targetY = clamp(rotY, -ROT_MAX, ROT_MAX);

      const shineX = (x / rect.width) * 100;
      const shineY = (y / rect.height) * 100;

      shine.style.background = `
        radial-gradient(circle at ${shineX}% ${shineY}%, rgba(255,255,255,0.25), transparent 60%)
      `;
    }

    function animate() {
      if (!el || !content) return;

      currentX += (targetX - currentX) * 0.1;
      currentY += (targetY - currentY) * 0.1;

      el.style.transform = `
        perspective(1000px)
        rotateY(${currentX}deg)
        rotateX(${currentY}deg)
        translateY(-10px)
      `;

      const layers = content.querySelectorAll("[data-depth]");
      layers.forEach((layer) => {
        const depth = Number(layer.getAttribute("data-depth") || "1");
        (layer as HTMLElement).style.transform = `
          translateZ(${depth * 6}px)
          translateX(${currentX * depth * 0.4}px)
          translateY(${currentY * -depth * 0.4}px)
        `;
      });

      el.style.boxShadow = `
        ${-currentX * 2}px ${currentY * 2}px 40px rgba(0,0,0,0.15)
      `;

      requestAnimationFrame(animate);
    }

    function reset() {
      if (!shine) return;
      targetX = 0;
      targetY = 0;
      shine.style.background = "transparent";
    }

    window.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", reset);

    animate();

    return () => {
      window.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", reset);
    };
  }, []);

  return (
    <div
      ref={cardRef}
      className="relative feature-card bg-white/10 backdrop-blur-2xl border border-white/20 shadow-xl rounded-3xl p-8 transition-all duration-300"
    >
      {/* Shine Layer */}
      <div
        ref={shineRef}
        className="absolute inset-0 rounded-3xl pointer-events-none shine-layer"
      />

      {/* Content */}
      <div
        ref={contentRef}
        className="relative z-10 flex flex-col items-center text-center"
      >
        <h3 data-depth="1" className="text-2xl font-bold text-[#4A75A9] mb-4">
          {title}
        </h3>

        <div
          data-depth="2"
          className="w-28 h-28 mb-4 transition-transform duration-300"
        >
          <Image
            src={image}
            alt={title}
            width={112}
            height={112}
            className="object-contain"
          />
        </div>

        <p data-depth="3" className="text-black/70 text-sm leading-relaxed">
          {desc}
        </p>
      </div>
    </div>
  );
}
