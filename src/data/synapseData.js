// AETHERIA Spatial Thought Data Engine

export const MOCK_CATEGORIES = [
  { id: 'all', label: 'All Thought Spheres', color: '#ffffff' },
  { id: 'philosophy', label: 'Cosmic Philosophy', color: '#c084fc' },
  { id: 'creativity', label: 'Generative Arts', color: '#e879f9' },
  { id: 'mindfulness', label: 'Mindful Tech', color: '#38bdf8' },
  { id: 'future', label: 'Post-AI Futures', color: '#ff7700' }
];

export const MOCK_NODES = [
  {
    id: 'node-1',
    title: 'The death of infinite scroll',
    creator: 'Maya Chen',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    category: 'mindfulness',
    resonanceCount: 142,
    perspectivesCount: 18,
    evolutionCount: 7,
    shortSentence: 'Can social platforms become places we intentionally enter rather than places we disappear into?',
    content: 'For a decade, digital interaction was trapped in vertically endless feeds designed for dopamine loops. By organizing thoughts into spatial constellations, we restore depth, context, and choice. You do not scroll—you navigate.',
    tags: ['attention', 'digitalwellbeing', 'socialdesign'],
    x: 450,
    y: 330,
    radius: 42,
    color: '#38bdf8',
    audioFrequency: 432,
    perspectives: [
      { author: 'Maya Chen', text: 'Attention isn\'t necessarily the enemy. Unconscious attention is.' },
      { author: 'Arjun Mehta', text: 'Perhaps the problem isn\'t the feed. It\'s that the feed never ends.' },
      { author: 'Elena Rostova', text: 'Maybe social platforms should have an intentional stopping point.' }
    ],
    connections: [
      { targetId: 'node-2', type: 'conceptual', label: 'Conceptual Link' },
      { targetId: 'node-3', type: 'resonance', label: 'Resonates With' },
      { targetId: 'node-9', type: 'creative', label: 'Creative Influence' }
    ]
  },
  {
    id: 'node-2',
    title: 'Can silence become a form of communication?',
    creator: 'Julian Vance',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    category: 'philosophy',
    resonanceCount: 89,
    perspectivesCount: 12,
    evolutionCount: 4,
    shortSentence: 'In a world of constant noise, un-expressed presence carries more signal than broadcasted posts.',
    content: 'What if social software measured shared quiet rather than character counts? Silence between connected nodes creates space for contemplation.',
    tags: ['silence', 'presence', 'quiettech'],
    x: 210,
    y: 230,
    radius: 36,
    color: '#c084fc',
    audioFrequency: 528,
    perspectives: [
      { author: 'Julian Vance', text: 'Silence allows thoughts to settle before judgment.' },
      { author: 'Soren Zhao', text: 'Shared silence in physical space is intimacy. In digital space, it is presence.' }
    ],
    connections: [
      { targetId: 'node-1', type: 'conceptual', label: 'Conceptual Link' },
      { targetId: 'node-8', type: 'creative', label: 'Creative Influence' },
      { targetId: 'node-5', type: 'resonance', label: 'Resonates With' }
    ]
  },
  {
    id: 'node-3',
    title: 'Designing for slower internet',
    creator: 'Evelyn Thorne',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
    category: 'mindfulness',
    resonanceCount: 116,
    perspectivesCount: 14,
    evolutionCount: 5,
    shortSentence: 'Hyper-speed feeds create hyper-shallow comprehension. Slowness invites intention.',
    content: 'Bandwidth constraints forced early internet users to read deeply. Artificial friction in interaction design produces richer reflection.',
    tags: ['slowweb', 'friction', 'intention'],
    x: 690,
    y: 200,
    radius: 38,
    color: '#38bdf8',
    audioFrequency: 639,
    perspectives: [
      { author: 'Evelyn Thorne', text: 'Speed is an efficiency metric, not a human understanding metric.' },
      { author: 'Devon Kai', text: 'Intentional latency gives the brain time to synthesize.' }
    ],
    connections: [
      { targetId: 'node-1', type: 'resonance', label: 'Resonates With' },
      { targetId: 'node-4', type: 'debate', label: 'Alternative Perspective' }
    ]
  },
  {
    id: 'node-4',
    title: 'When AI becomes culturally invisible',
    creator: 'Devon Kai',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    category: 'future',
    resonanceCount: 204,
    perspectivesCount: 26,
    evolutionCount: 11,
    shortSentence: 'The ultimate state of artificial intelligence is when we stop talking about AI and start talking with each other.',
    content: 'AI will fade into the background like electricity or plumbing. The focus shifts back to human conceptual symbiosis.',
    tags: ['symbiosis', 'futuretech', 'culture'],
    x: 880,
    y: 380,
    radius: 44,
    color: '#ff7700',
    audioFrequency: 741,
    perspectives: [
      { author: 'Devon Kai', text: 'Tools become profound when they dissolve into background utility.' },
      { author: 'Lyra Sterling', text: 'When syntax generation is free, original perspective becomes priceless.' }
    ],
    connections: [
      { targetId: 'node-3', type: 'debate', label: 'Alternative Perspective' },
      { targetId: 'node-9', type: 'creative', label: 'Creative Influence' },
      { targetId: 'node-6', type: 'conceptual', label: 'Conceptual Link' }
    ]
  },
  {
    id: 'node-5',
    title: 'Can digital spaces create genuine presence?',
    creator: 'Soren Zhao',
    avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80',
    category: 'philosophy',
    resonanceCount: 178,
    perspectivesCount: 21,
    evolutionCount: 8,
    shortSentence: 'Presence is not video pixels—it is shared attentional focus in a persistent spatial realm.',
    content: 'Synchronous co-awareness allows people to feel together without needing active conversation. Quiet co-working or co-thinking.',
    tags: ['copresence', 'spatialux', 'connection'],
    x: 340,
    y: 620,
    radius: 40,
    color: '#c084fc',
    audioFrequency: 852,
    perspectives: [
      { author: 'Soren Zhao', text: 'Co-presence is feeling the warmth of someone thinking in the same room.' },
      { author: 'Aria Sol', text: 'Ambient audio frequencies bridge spatial distance silently.' }
    ],
    connections: [
      { targetId: 'node-2', type: 'resonance', label: 'Resonates With' },
      { targetId: 'node-7', type: 'conceptual', label: 'Conceptual Link' }
    ]
  },
  {
    id: 'node-6',
    title: 'Post-metropolitan digital nomads',
    creator: 'Zane Ross',
    avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=150&auto=format&fit=crop&q=80',
    category: 'future',
    resonanceCount: 95,
    perspectivesCount: 10,
    evolutionCount: 3,
    shortSentence: 'Physical location is unbundling; micro-societies form around shared conceptual frequency.',
    content: 'The post-city human lives everywhere physically, but anchored digitally in high-resonance thought sanctuaries.',
    tags: ['nomads', 'societaldesign', 'decentralized'],
    x: 770,
    y: 590,
    radius: 36,
    color: '#ff7700',
    audioFrequency: 396,
    perspectives: [
      { author: 'Zane Ross', text: 'Geography was our first social algorithm. Frequency is our second.' }
    ],
    connections: [
      { targetId: 'node-4', type: 'conceptual', label: 'Conceptual Link' },
      { targetId: 'node-7', type: 'debate', label: 'Alternative Perspective' }
    ]
  },
  {
    id: 'node-7',
    title: 'Synthetic empathy & relational depth',
    creator: 'Lyra Sterling',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
    category: 'philosophy',
    resonanceCount: 153,
    perspectivesCount: 19,
    evolutionCount: 6,
    shortSentence: 'Re-building mutual understanding in hyper-polarized digital ecosystems through multi-node mapping.',
    content: 'When social interactions are framed as shared constellation spaces, disagreement turns into multi-perspective mapping instead of binary conflict.',
    tags: ['empathy', 'relationaldepth', 'mindscapes'],
    x: 540,
    y: 490,
    radius: 39,
    color: '#c084fc',
    audioFrequency: 528,
    perspectives: [
      { author: 'Lyra Sterling', text: 'Polarization happens when thoughts are forced into single-stream feeds.' }
    ],
    connections: [
      { targetId: 'node-5', type: 'conceptual', label: 'Conceptual Link' },
      { targetId: 'node-6', type: 'debate', label: 'Alternative Perspective' },
      { targetId: 'node-9', type: 'resonance', label: 'Resonates With' }
    ]
  },
  {
    id: 'node-8',
    title: 'Acoustic presence & soundscapes',
    creator: 'Aria Sol',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    category: 'creativity',
    resonanceCount: 131,
    perspectivesCount: 15,
    evolutionCount: 5,
    shortSentence: 'Communicating ambient emotion through micro-tonal frequencies instead of text overload.',
    content: 'Tone and resonance convey immediate emotional temperature before a single word is read.',
    tags: ['soundscapes', 'acoustic', 'ambient'],
    x: 180,
    y: 470,
    radius: 35,
    color: '#e879f9',
    audioFrequency: 432,
    perspectives: [
      { author: 'Aria Sol', text: 'Frequencies communicate mood faster than vocabulary.' }
    ],
    connections: [
      { targetId: 'node-2', type: 'creative', label: 'Creative Influence' }
    ]
  },
  {
    id: 'node-9',
    title: 'Generative symbiosis',
    creator: 'Kaelen Voss',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    category: 'creativity',
    resonanceCount: 210,
    perspectivesCount: 28,
    evolutionCount: 12,
    shortSentence: 'Co-creating with intelligence as a collaborative brush rather than an automated surrogate.',
    content: 'True creative augmentation occurs when AI acts like interactive digital marble—reacting to artistic intent without stripping the human hand of its soulful friction.',
    tags: ['generative', 'symbiosis', 'art'],
    x: 590,
    y: 310,
    radius: 43,
    color: '#e879f9',
    audioFrequency: 639,
    perspectives: [
      { author: 'Kaelen Voss', text: 'Friction in tool design creates memory in human experience.' }
    ],
    connections: [
      { targetId: 'node-1', type: 'creative', label: 'Creative Influence' },
      { targetId: 'node-4', type: 'creative', label: 'Creative Influence' },
      { targetId: 'node-7', type: 'resonance', label: 'Resonates With' }
    ]
  }
];

export const VIBE_REALMS = [
  {
    id: 'realm-1',
    name: 'COSMIC PHILOSOPHY',
    activeCount: 47,
    category: 'philosophy',
    tone: 'Theta Waves 432Hz',
    description: 'Questions that don\'t need immediate answers.',
    fragments: [
      { title: 'WHAT IF MEMORY IS A FORM OF TIME TRAVEL?', author: 'Maya Chen', resonances: 84 },
      { title: 'DOES CONSCIOUSNESS REQUIRE A PHYSICAL BODY?', author: 'Julian Vance', resonances: 112 },
      { title: 'WHY DO HUMANS NEED MEANING TO FUNCTION?', author: 'Lyra Sterling', resonances: 96 }
    ],
    currentlyResonating: [
      { title: 'THE FUTURE OF ATTENTION', count: 23, status: 'RESONATING' },
      { title: 'CAN DIGITAL SPACES FEEL INTIMATE?', count: 17, status: 'EMERGING' },
      { title: 'DOES TECHNOLOGY NEED TO BE FAST?', count: 14, status: 'RETURNED TO' }
    ]
  },
  {
    id: 'realm-2',
    name: 'GENERATIVE ARTS',
    activeCount: 62,
    category: 'creativity',
    tone: 'Gamma Harmonic 639Hz',
    description: 'Where making becomes a way of thinking.',
    fragments: [
      { title: 'THE PROMPT IS NOT THE ARTWORK; THE DIALOGUE IS.', author: 'Kaelen Voss', resonances: 140 },
      { title: 'DIGITAL FRICTION PRODUCES SOULFUL ART.', author: 'Aria Sol', resonances: 95 }
    ],
    currentlyResonating: [
      { title: 'ACOUSTIC PRESENCE & FREQUENCIES', count: 31, status: 'EXPANDING' },
      { title: 'CREATIVE DIALOGUE OVER OUTPUT GENERATION', count: 19, status: 'RESONATING' }
    ]
  },
  {
    id: 'realm-3',
    name: 'MINDFUL TECHNOLOGY',
    activeCount: 88,
    category: 'mindfulness',
    tone: 'Solfeggio 528Hz',
    description: 'Technology designed around human attention.',
    fragments: [
      { title: 'SOFTWARE THAT CELEBRATES USER DEPARTURE.', author: 'Cassian Rhys', resonances: 176 },
      { title: 'ATTENTION SANCTUARIES OVER RETENTION ENGINE.', author: 'Evelyn Thorne', resonances: 124 }
    ],
    currentlyResonating: [
      { title: 'THE DEATH OF INFINITE SCROLL', count: 42, status: 'EXPANDING' },
      { title: 'DESIGNING FOR SLOWER INTERNET', count: 28, status: 'RETURNED TO' }
    ]
  },
  {
    id: 'realm-4',
    name: 'POST-AI FUTURES',
    activeCount: 51,
    category: 'future',
    tone: 'Solfeggio 741Hz',
    description: 'Imagining what comes after the obvious.',
    fragments: [
      { title: 'DECENTRALIZED SPATIAL MICRO-SOCIETIES.', author: 'Zane Ross', resonances: 89 },
      { title: 'WHEN AI BECOMES CULTURALLY INVISIBLE.', author: 'Devon Kai', resonances: 204 }
    ],
    currentlyResonating: [
      { title: 'POST-METROPOLITAN DIGITAL NOMADS', count: 25, status: 'EMERGING' },
      { title: 'SYNTHETIC EMPATHY & RELATIONAL DEPTH', count: 21, status: 'RESONATING' }
    ]
  }
];
