export type ProductCategory = 'notion' | 'canva' | 'automation' | 'lightroom'

export interface PreviewScreen {
  /** Label shown below the preview image */
  label: string
  /** Brief description of what this screen shows */
  description: string
  /** If true, the preview is blurred with a lock overlay */
  isLocked: boolean
}

export interface ProductContent {
  tagline: string
  /** Visual previews of the product screens/pages */
  previewScreens: PreviewScreen[]
  format: string
  compatibility: string[]
}

const contentMap: Record<ProductCategory, ProductContent> = {
  notion: {
    tagline: 'See what your workspace will look like:',
    previewScreens: [
      {
        label: 'Dashboard Overview',
        description: 'Your central hub with daily, weekly & monthly views',
        isLocked: false,
      },
      {
        label: 'Habit Tracker',
        description: 'Track your habits with stats and streaks',
        isLocked: true,
      },
      {
        label: 'Goal Setting',
        description: 'Set and track your goals with progress bars',
        isLocked: true,
      },
      {
        label: 'Journal & Gratitude Log',
        description: 'Daily journaling with gratitude prompts',
        isLocked: true,
      },
    ],
    format: 'Notion workspace template',
    compatibility: ['Free Notion account', 'Notion web & desktop app'],
  },
  canva: {
    tagline: 'A sneak peek at your templates:',
    previewScreens: [
      {
        label: 'Instagram Post',
        description: '1080×1080 pixel template — fully editable',
        isLocked: false,
      },
      {
        label: 'Instagram Story',
        description: '1080×1920 pixel template with animations',
        isLocked: true,
      },
      {
        label: 'Facebook Cover',
        description: 'Professional banner for your Facebook page',
        isLocked: true,
      },
      {
        label: 'LinkedIn Banner',
        description: 'Stand out with a branded LinkedIn header',
        isLocked: true,
      },
    ],
    format: 'Canva template links',
    compatibility: ['Free Canva account', 'Canva Pro (for premium elements)'],
  },
  automation: {
    tagline: 'Preview the workflow structure:',
    previewScreens: [
      {
        label: 'Scenario Overview',
        description: 'High-level view of the automation flow',
        isLocked: false,
      },
      {
        label: 'Module Configuration',
        description: 'Detailed module settings and triggers',
        isLocked: true,
      },
      {
        label: 'Data Mapping',
        description: 'How data flows between apps and filters',
        isLocked: true,
      },
    ],
    format: 'Make blueprint + PDF guide',
    compatibility: ['Make account (free tier works)', 'Google account (for Sheets integration)'],
  },
  lightroom: {
    tagline: 'See the difference presets make:',
    previewScreens: [
      {
        label: 'Before / After',
        description: 'See how the preset transforms your photos',
        isLocked: false,
      },
      {
        label: 'Portrait Examples',
        description: 'Presets applied to portrait photography',
        isLocked: true,
      },
      {
        label: 'Landscape Examples',
        description: 'Presets applied to landscape shots',
        isLocked: true,
      },
    ],
    format: 'XMP / DNG files',
    compatibility: ['Adobe Lightroom Desktop', 'Adobe Lightroom Mobile', 'Adobe Lightroom Classic'],
  },
}

/**
 * Returns "What's Inside" preview content for a given product handle.
 * Only shows a teaser of preview screens — full contents unlocked after purchase.
 */
export function getProductContent(handle: string, productType: string): ProductContent {
  const category = detectCategory(handle, productType)
  return contentMap[category]
}

function detectCategory(handle: string, productType: string): ProductCategory {
  const lower = `${handle} ${productType}`.toLowerCase()

  if (lower.includes('notion')) return 'notion'
  if (lower.includes('canva')) return 'canva'
  if (lower.includes('lightroom') || lower.includes('preset')) return 'lightroom'
  if (lower.includes('automation') || lower.includes('workflow') || lower.includes('make'))
    return 'automation'

  return 'notion'
}