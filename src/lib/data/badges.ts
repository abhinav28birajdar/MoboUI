import { Award, Zap, Star, ShieldCheck, Heart, Sparkles, Terminal, Code2 } from 'lucide-react';
import React from 'react';

export interface BadgeDefinition {
  id: string;
  name: string;
  description: string;
  icon: React.ElementType;
  colorClass: string;
  bgColorClass: string;
}

export const BADGE_DICTIONARY: Record<string, BadgeDefinition> = {
  'early-adopter': {
    id: 'early-adopter',
    name: 'Early Adopter',
    description: 'Joined MOBOUI during its initial launch phase.',
    icon: Zap,
    colorClass: 'text-yellow-500',
    bgColorClass: 'bg-yellow-500/10',
  },
  'top-creator': {
    id: 'top-creator',
    name: 'Top Creator',
    description: 'Published highly popular components.',
    icon: Star,
    colorClass: 'text-primary',
    bgColorClass: 'bg-primary/10',
  },
  'prolific-reviewer': {
    id: 'prolific-reviewer',
    name: 'Prolific Reviewer',
    description: 'Left 10+ detailed reviews on components.',
    icon: Heart,
    colorClass: 'text-red-500',
    bgColorClass: 'bg-red-500/10',
  },
  'verified-dev': {
    id: 'verified-dev',
    name: 'Verified Dev',
    description: 'Successfully connected their GitHub profile.',
    icon: ShieldCheck,
    colorClass: 'text-blue-500',
    bgColorClass: 'bg-blue-500/10',
  },
  'first-upload': {
    id: 'first-upload',
    name: 'First Blood',
    description: 'Published their first component to the platform.',
    icon: Sparkles,
    colorClass: 'text-emerald-500',
    bgColorClass: 'bg-emerald-500/10',
  },
  'expo-master': {
    id: 'expo-master',
    name: 'Expo Master',
    description: 'Specializes in high-quality Expo components.',
    icon: Code2,
    colorClass: 'text-purple-500',
    bgColorClass: 'bg-purple-500/10',
  },
  'flutter-guru': {
    id: 'flutter-guru',
    name: 'Flutter Guru',
    description: 'Specializes in high-quality Flutter widgets.',
    icon: Terminal,
    colorClass: 'text-cyan-500',
    bgColorClass: 'bg-cyan-500/10',
  },
};
