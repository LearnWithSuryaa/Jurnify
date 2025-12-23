import React from "react";

interface SkeletonProps {
  className?: string;
  width?: string | number;
  height?: string | number;
  variant?: "rounded" | "circular" | "rectangular";
}

export default function Skeleton({
  className = "",
  width,
  height,
  variant = "rounded",
}: SkeletonProps) {
  const baseClasses = "bg-slate-200 animate-pulse";
  const variantClasses = {
    rounded: "rounded-xl",
    circular: "rounded-full",
    rectangular: "rounded-none",
  };

  const style = {
    width: width,
    height: height,
  };

  return (
    <div
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      style={style}
    />
  );
}
