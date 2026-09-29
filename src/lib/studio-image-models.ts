export interface ImageModelOption {
  id: string;
  name: string;
  badge?: string;
  resolution: string;
  description: string;
}

export const AVAILABLE_IMAGE_MODELS: ImageModelOption[] = [
  {
    id: 'gpt-image-2.5-sunburst-4k',
    name: 'GPT Image 2.5 Sunburst 4K',
    badge: 'Default (4K UHD)',
    resolution: '4K Ultra HD',
    description: 'Model utama resolusi tinggi 4K dengan visual sunburst kaya warna.',
  },
  {
    id: 'gpt-image-2.5-flare-4k',
    name: 'GPT Image 2.5 Flare 4K',
    badge: '4K UHD',
    resolution: '4K Ultra HD',
    description: 'Model 4K dengan efek pencahayaan flare sinematik modern.',
  },
  {
    id: 'gpt-image-2-4k',
    name: 'GPT Image 2 4K',
    badge: 'High Reliability',
    resolution: '4K Ultra HD',
    description: 'Model 4K generasi kedua dengan stabilitas dan ketersediaan tinggi.',
  },
  {
    id: 'gpt-image-2.5-sunburst',
    name: 'GPT Image 2.5 Sunburst',
    badge: 'Standard HD',
    resolution: '1024x1024',
    description: 'Model sunburst resolusi standar untuk render cepat.',
  },
  {
    id: 'gpt-image-2.5-flare',
    name: 'GPT Image 2.5 Flare',
    badge: 'Standard HD',
    resolution: '1024x1024',
    description: 'Model flare resolusi standar untuk visual berkarakter dinamis.',
  },
  {
    id: 'gpt-image-2.5',
    name: 'GPT Image 2.5',
    badge: 'Standard',
    resolution: '1024x1024',
    description: 'Model standar versi 2.5.',
  },
  {
    id: 'gpt-image-2',
    name: 'GPT Image 2',
    badge: 'Standard',
    resolution: '1024x1024',
    description: 'Model standar versi 2.',
  },
];

export const DEFAULT_IMAGE_MODEL = 'gpt-image-2.5-sunburst-4k';

export interface GenerateImageOptions {
  prompt: string;
  requestedModel?: string;
  slug?: string;
  size?: string;
  saveToDisk?: boolean;
}

export interface GenerateImageResult {
  ok: boolean;
  cover: string; // path /images/blog/...
  requestedModel: string;
  usedModel: string;
  switched: boolean;
  switchReason?: string;
  modelAttempts: { model: string; success: boolean; error?: string }[];
}
