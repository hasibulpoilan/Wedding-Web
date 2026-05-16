const EVENT_KEYWORDS = {
  haldi: ['haldi'],
  sangeet: ['sangeet', 'sandhya'],
  wedding: ['wedding', 'ceremony', 'vivah'],
  reception: ['reception', 'dinner'],
  carnival: ['carnival', 'mehendi', 'welcome'],
};

export const SHARE_CARD_TEMPLATES = [
  {
    id: 'welcome',
    labelKey: 'shareTplWelcome',
    label: 'Welcome',
    type: 'fixed',
    theme: {
      bg: 'linear-gradient(165deg, #e8f5e9 0%, #FDFBF7 45%, #f1f8e9 100%)',
      accent: '#1B3022',
      gold: '#C5A059',
    },
  },
  {
    id: 'couple',
    labelKey: 'shareTplCouple',
    label: 'Couple',
    type: 'fixed',
    theme: {
      bg: 'linear-gradient(165deg, #e8f5e9 0%, #FDFBF7 50%, #fff8e1 100%)',
      accent: '#1B3022',
      gold: '#C5A059',
    },
  },
  {
    id: 'haldi',
    labelKey: 'shareTplHaldi',
    label: 'Haldi',
    type: 'event',
    keywords: EVENT_KEYWORDS.haldi,
    defaultTitle: 'Haldi Ceremony',
    theme: {
      bg: 'linear-gradient(180deg, #fff9c4 0%, #ffeb3b 35%, #fdd835 100%)',
      accent: '#5d4037',
      gold: '#f57f17',
    },
  },
  {
    id: 'sangeet',
    labelKey: 'shareTplSangeet',
    label: 'Sangeet',
    type: 'event',
    keywords: EVENT_KEYWORDS.sangeet,
    defaultTitle: 'Sangeet Sandhya',
    theme: {
      bg: 'linear-gradient(180deg, #1a1a2e 0%, #16213e 50%, #0f0f23 100%)',
      accent: '#ffffff',
      gold: '#e040fb',
    },
  },
  {
    id: 'wedding',
    labelKey: 'shareTplWedding',
    label: 'Wedding',
    type: 'event',
    keywords: EVENT_KEYWORDS.wedding,
    defaultTitle: 'Wedding Ceremony',
    theme: {
      bg: 'linear-gradient(180deg, #4a0e0e 0%, #6d1a1a 40%, #8B0000 100%)',
      accent: '#fff8e1',
      gold: '#DFBD7D',
    },
  },
  {
    id: 'reception',
    labelKey: 'shareTplReception',
    label: 'Reception',
    type: 'event',
    keywords: EVENT_KEYWORDS.reception,
    defaultTitle: 'Reception & Dinner',
    theme: {
      bg: 'linear-gradient(180deg, #0d1b2a 0%, #1b263b 50%, #415a77 100%)',
      accent: '#e0e1dd',
      gold: '#C5A059',
    },
  },
  {
    id: 'classic',
    labelKey: 'shareTplClassic',
    label: 'Classic',
    type: 'fixed',
    theme: {
      bg: '#FDFBF7',
      accent: '#1B3022',
      gold: '#C5A059',
    },
  },
];

export function findEventByKeywords(config, keywords = []) {
  const events = (config?.events || []).filter((e) => e.enabled !== false);
  return events.find((e) => {
    const id = (e.id || '').toLowerCase();
    const title = (e.title || '').toLowerCase();
    return keywords.some((k) => id.includes(k) || title.includes(k));
  });
}

export function getEventDataForTemplate(config, template) {
  if (template.type === 'event' && template.keywords) {
    const matched = findEventByKeywords(config, template.keywords);
    if (matched) {
      return {
        title: matched.title,
        date: matched.date,
        time: matched.time,
        venue: matched.venueName || config?.venue || '',
      };
    }
  }

  const mainDate = config?.date
    ? new Date(config.date).toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      })
    : '';

  return {
    title: template.defaultTitle || template.label,
    date: mainDate,
    time: '',
    venue: config?.venue || '',
  };
}

export function getAvailableShareTemplates() {
  return SHARE_CARD_TEMPLATES;
}

export function getTemplateById(id) {
  return SHARE_CARD_TEMPLATES.find((t) => t.id === id) || SHARE_CARD_TEMPLATES[0];
}
