import React from 'react';
import reactSvg from '../../assets/tech/react.svg';
import reactNativeSvg from '../../assets/tech/reactnative.svg';
import expoSvg from '../../assets/tech/expo.svg';
import typescriptSvg from '../../assets/tech/typescript.svg';
import html5Svg from '../../assets/tech/html5.svg';
import tailwindSvg from '../../assets/tech/tailwindcss.svg';
import bootstrapSvg from '../../assets/tech/bootstrap.svg';
import nestjsSvg from '../../assets/tech/nestjs.svg';
import laravelSvg from '../../assets/tech/laravel.svg';
import phpSvg from '../../assets/tech/php.svg';
import antigravityPng from '../../assets/tech/antigravity.png';
import gitSvg from '../../assets/tech/git.svg';
import githubSvg from '../../assets/tech/github.svg';
import supabaseSvg from '../../assets/tech/supabase.svg';
import vercelSvg from '../../assets/tech/vercel.svg';

interface TechLogoProps {
  name: string;
  className?: string;
  size?: number;
}

export const getTechLogoSrc = (name: string): string => {
  const normalized = name.toLowerCase().replace(/[\s.-]/g, '');

  if (normalized.includes('reactnative')) return reactNativeSvg;
  if (normalized.includes('react')) return reactSvg;
  if (normalized.includes('expo')) return expoSvg;
  if (normalized.includes('typescript') || normalized === 'ts') return typescriptSvg;
  if (normalized.includes('html')) return html5Svg;
  if (normalized.includes('tailwind')) return tailwindSvg;
  if (normalized.includes('bootstrap')) return bootstrapSvg;
  if (normalized.includes('nestjs') || normalized.includes('nest')) return nestjsSvg;
  if (normalized.includes('laravel')) return laravelSvg;
  if (normalized.includes('php')) return phpSvg;
  if (normalized.includes('antigravity')) return antigravityPng;
  if (normalized === 'git') return gitSvg;
  if (normalized.includes('github')) return githubSvg;
  if (normalized.includes('supabase')) return supabaseSvg;
  if (normalized.includes('vercel')) return vercelSvg;

  return reactSvg;
};

export const TechLogo: React.FC<TechLogoProps> = ({ name, className = 'w-9 h-9', size }) => {
  const src = getTechLogoSrc(name);
  const style = size ? { width: size, height: size } : undefined;

  return (
    <img
      src={src}
      alt={`${name} official brand logo`}
      loading="lazy"
      style={style}
      className={`object-contain shrink-0 ${className}`}
    />
  );
};
