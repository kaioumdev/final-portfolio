export interface ExperienceEntry {
  id: string;
  type: 'work' | 'education';
  organization: string;
  role: string;
  startDate: string;
  endDate: string;
  endYear: number;
  description: string;
  certLink?: string;
}

export const EXPERIENCE: ExperienceEntry[] = [
  {
    id: 'work-3',
    type: 'work',
    organization: 'Startup Company (Airbnb-style Platform)',
    role: 'Frontend Engineer — React.js',
    startDate: '2026',
    endDate: 'Present',
    endYear: 9999,
    description:
      'Building and scaling a complex Airbnb-style property rental platform using React.js. ' +
      'Responsible for implementing dynamic UI flows, real-time search and filtering, booking systems, ' +
      'and seamless API integrations. Collaborating closely with product and design teams in an agile environment.',
  },
  {
    id: 'work-2',
    type: 'work',
    organization: 'Startup Company',
    role: 'Full-Stack Developer — React & React Native (Expo)',
    startDate: '2025',
    endDate: '2025',
    endYear: 2025,
    description:
      'Developed cross-platform web and mobile applications using React.js and React Native with Expo. ' +
      'Built reusable component libraries, integrated REST APIs, implemented authentication flows, ' +
      'and delivered production-ready features in a fast-moving startup environment.',
  },
  {
    id: 'work-1',
    type: 'work',
    organization: 'GirlScript Summer of Code (GSSoC 2024)',
    role: 'Open-Source Contributor — Ranked #344 Globally',
    startDate: 'Jun 2024',
    endDate: 'Oct 2024',
    endYear: 2024,
    description:
      'Active contributor in GSSoC 2024 — ranked #344 globally out of thousands of contributors. ' +
      'Contributed to multiple open-source repositories, collaborated with international teams, ' +
      'and shipped meaningful improvements to production codebases.',
    certLink: 'https://drive.google.com/file/d/1qI-iLt8Uhp12C7CzYzJ-1q_e3SUD8iuq/view?usp=sharing',
  },
  {
    id: 'work-0',
    type: 'work',
    organization: 'Hacktoberfest · GSSoC-ext',
    role: 'Open-Source Contributor — Level 1–4 Badges',
    startDate: '2023',
    endDate: '2024',
    endYear: 2024,
    description:
      'Participated in Hacktoberfest and earned all Level 1–4 achievement badges. ' +
      'Additionally contributed to SWOC (Script Winter of Code) and GSSoC-ext, ' +
      'engaging with the global open-source developer community across multiple programs.',
    certLink: 'https://camo.githubusercontent.com/34329c4fdae76398f81eea601bcf21c05e59f6dfacc495cf37c9550534679712/68747470733a2f2f686f6c6f70696e2e6d652f6b616979756d646576',
  },
];

export const EDUCATION: ExperienceEntry[] = [
  {
    id: 'edu-1',
    type: 'education',
    organization: 'National University',
    role: 'B.A. Political Science',
    startDate: '2020',
    endDate: '2024',
    endYear: 2024,
    description:
      'Completed a Bachelor\'s degree while independently developing strong software engineering skills. ' +
      'Self-taught full-stack web development in parallel, building production-grade applications ' +
      'and contributing to open-source projects throughout the degree.',
  },
];
