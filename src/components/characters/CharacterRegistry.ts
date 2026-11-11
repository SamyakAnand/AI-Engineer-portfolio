export type UniverseId = 'naruto' | 'onepiece' | 'bleach' | 'hxh' | 'demonslayer';

export type CharacterId =
  | 'naruto'
  | 'sasuke'
  | 'luffy'
  | 'zoro'
  | 'sanji'
  | 'ichigo'
  | 'gon'
  | 'killua'
  | 'tanjiro'
  | 'zenitsu'
  | 'inosuke';

export interface CharacterDef {
  id: CharacterId;
  name: string;
  universe: UniverseId;
  universeName: string;
  role: string;
  color: string;
  accentColor: string;
  auraColor: string;
  quote: string;
  actionMove: string;
  isVillain?: boolean;
  isHero?: boolean;
  baseSpeed: number;
  agility: number; // 0..1
  personality: 'bouncy' | 'deliberate' | 'smooth' | 'heroic' | 'dark' | 'powerful' | 'curious' | 'lightning' | 'balanced' | 'burst' | 'wild';
  initialPos: { xPercent: number; yPercent: number };
}

export const CHARACTERS: Record<CharacterId, CharacterDef> = {
  naruto: {
    id: 'naruto',
    name: 'Naruto Uzumaki',
    universe: 'naruto',
    universeName: 'Naruto',
    role: 'Hero · Seventh Hokage',
    color: '#f97316', // Orange
    accentColor: '#38bdf8', // Rasengan Cyan
    auraColor: 'rgba(249, 115, 22, 0.45)',
    quote: 'Believe it! Never give up!',
    actionMove: 'RASENGAN 🌀',
    isHero: true,
    baseSpeed: 1.45,
    agility: 0.88,
    personality: 'heroic',
    initialPos: { xPercent: 22, yPercent: 28 },
  },
  sasuke: {
    id: 'sasuke',
    name: 'Sasuke Uchiha',
    universe: 'naruto',
    universeName: 'Naruto',
    role: 'Villain · Shadow Shinobi',
    color: '#818cf8', // Indigo
    accentColor: '#c084fc', // Chidori Violet
    auraColor: 'rgba(129, 140, 248, 0.45)',
    quote: 'My dream doesn\'t exist in the future. It is in the past.',
    actionMove: 'CHIDORI ⚡',
    isVillain: true,
    baseSpeed: 1.5,
    agility: 0.92,
    personality: 'dark',
    initialPos: { xPercent: 78, yPercent: 28 },
  },
  luffy: {
    id: 'luffy',
    name: 'Monkey D. Luffy',
    universe: 'onepiece',
    universeName: 'One Piece',
    role: 'Straw Hat Captain',
    color: '#ef4444', // Red
    accentColor: '#facc15', // Straw Hat Gold
    auraColor: 'rgba(239, 68, 68, 0.4)',
    quote: 'I\'m gonna be King of the Pirates!',
    actionMove: 'GUM-GUM PISTOL 👊',
    baseSpeed: 1.6,
    agility: 0.85,
    personality: 'bouncy',
    initialPos: { xPercent: 15, yPercent: 62 },
  },
  zoro: {
    id: 'zoro',
    name: 'Roronoa Zoro',
    universe: 'onepiece',
    universeName: 'One Piece',
    role: 'Three-Sword Master',
    color: '#22c55e', // Green
    accentColor: '#a855f7', // Asura Violet
    auraColor: 'rgba(34, 197, 94, 0.4)',
    quote: 'Scars on the back are a swordsman\'s shame.',
    actionMove: 'THREE SWORD ONIGIRI ⚔️',
    baseSpeed: 1.15,
    agility: 0.7,
    personality: 'deliberate',
    initialPos: { xPercent: 82, yPercent: 68 },
  },
  sanji: {
    id: 'sanji',
    name: 'Sanji Vinsmoke',
    universe: 'onepiece',
    universeName: 'One Piece',
    role: 'Black Leg Chef',
    color: '#eab308', // Blonde gold
    accentColor: '#f97316', // Diable Jambe Flame
    auraColor: 'rgba(234, 179, 8, 0.4)',
    quote: 'Cooking is a gift from the gods.',
    actionMove: 'DIABLE JAMBE 🔥',
    baseSpeed: 1.4,
    agility: 0.9,
    personality: 'smooth',
    initialPos: { xPercent: 32, yPercent: 80 },
  },
  ichigo: {
    id: 'ichigo',
    name: 'Ichigo Kurosaki',
    universe: 'bleach',
    universeName: 'Bleach',
    role: 'Substitute Shinigami',
    color: '#ea580c', // Bright Orange
    accentColor: '#dc2626', // Getsuga Red-Black
    auraColor: 'rgba(234, 88, 12, 0.45)',
    quote: 'If fate is a millstone, we are the grist.',
    actionMove: 'GETSUGA TENSHO 🗡️',
    baseSpeed: 1.4,
    agility: 0.82,
    personality: 'powerful',
    initialPos: { xPercent: 70, yPercent: 45 },
  },
  gon: {
    id: 'gon',
    name: 'Gon Freecss',
    universe: 'hxh',
    universeName: 'Hunter x Hunter',
    role: 'Enhancer Hunter',
    color: '#16a34a', // Emerald
    accentColor: '#fde047', // Nen Aura
    auraColor: 'rgba(22, 163, 74, 0.4)',
    quote: 'First comes rock...',
    actionMove: 'JAJANKEN ✊',
    baseSpeed: 1.35,
    agility: 0.84,
    personality: 'curious',
    initialPos: { xPercent: 28, yPercent: 48 },
  },
  killua: {
    id: 'killua',
    name: 'Killua Zoldyck',
    universe: 'hxh',
    universeName: 'Hunter x Hunter',
    role: 'Lightning Assassin',
    color: '#67e8f9', // Electric Cyan
    accentColor: '#c084fc', // Lightning Violet
    auraColor: 'rgba(103, 232, 249, 0.5)',
    quote: 'Electricity is like part of my body.',
    actionMove: 'GODSPEED ⚡',
    baseSpeed: 1.85,
    agility: 0.96,
    personality: 'lightning',
    initialPos: { xPercent: 62, yPercent: 78 },
  },
  tanjiro: {
    id: 'tanjiro',
    name: 'Tanjiro Kamado',
    universe: 'demonslayer',
    universeName: 'Demon Slayer',
    role: 'Sun Breath Swordsman',
    color: '#059669', // Checkered Green
    accentColor: '#38bdf8', // Water Breathing Blue
    auraColor: 'rgba(5, 150, 105, 0.4)',
    quote: 'Head up, keep moving forward!',
    actionMove: 'WATER BREATHING 🌊',
    baseSpeed: 1.3,
    agility: 0.82,
    personality: 'balanced',
    initialPos: { xPercent: 45, yPercent: 35 },
  },
  zenitsu: {
    id: 'zenitsu',
    name: 'Zenitsu Agatsuma',
    universe: 'demonslayer',
    universeName: 'Demon Slayer',
    role: 'Thunderclap Hashira',
    color: '#facc15', // Bright Yellow
    accentColor: '#f59e0b', // Amber Flash
    auraColor: 'rgba(250, 204, 21, 0.5)',
    quote: 'Thunder Breathing, First Form!',
    actionMove: 'THUNDERCLAP FLASH ⚡',
    baseSpeed: 1.75,
    agility: 0.95,
    personality: 'burst',
    initialPos: { xPercent: 85, yPercent: 18 },
  },
  inosuke: {
    id: 'inosuke',
    name: 'Inosuke Hashibira',
    universe: 'demonslayer',
    universeName: 'Demon Slayer',
    role: 'Beast Breathing Warrior',
    color: '#0284c7', // Sky blue eyes
    accentColor: '#94a3b8', // Boar Slate
    auraColor: 'rgba(2, 132, 199, 0.4)',
    quote: 'COMING THROUGH! INOSUKE-SAMA!',
    actionMove: 'BEAST RUSH 🐗',
    baseSpeed: 1.55,
    agility: 0.78,
    personality: 'wild',
    initialPos: { xPercent: 12, yPercent: 18 },
  },
};

export const CHARACTER_IDS = Object.keys(CHARACTERS) as CharacterId[];

export const UNIVERSE_PRESETS: Record<string, { label: string; ids: CharacterId[] }> = {
  all: { label: 'All Stars (11)', ids: CHARACTER_IDS },
  duel: { label: 'Hero × Villain (Naruto vs Sasuke)', ids: ['naruto', 'sasuke'] },
  core5: { label: 'Featured 5', ids: ['naruto', 'sasuke', 'luffy', 'killua', 'tanjiro'] },
  onepiece: { label: 'One Piece (Luffy, Zoro, Sanji)', ids: ['luffy', 'zoro', 'sanji'] },
  naruto: { label: 'Naruto Duel (Naruto & Sasuke)', ids: ['naruto', 'sasuke'] },
  demonslayer: { label: 'Demon Slayer Trio', ids: ['tanjiro', 'zenitsu', 'inosuke'] },
  hxh: { label: 'Hunter x Hunter Duo', ids: ['gon', 'killua'] },
};
