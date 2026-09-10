export type ExperienceEntry = {
  org: string;
  unit?: string;
  role: string;
  period: string;
  logo: string;
  summary: string;
};

export const experience: ExperienceEntry[] = [
  {
    org: 'The Walt Disney Company',
    unit: 'Enterprise Technology Operations Center',
    role: 'HyperCare Operations Analyst',
    period: 'September 2022 - present',
    logo: '/images/experience/disney.png',
    summary:
      'I help teams prepare for technology changes, major events, and service transitions. A lot of the work is making sure the right people know what is changing and what to do if something goes wrong.',
  },
  {
    org: 'The Walt Disney Company',
    unit: 'Disney Technology Operations Center',
    role: 'Technical Operations Center Analyst',
    period: 'September 2021 - September 2022',
    logo: '/images/experience/disney.png',
    summary:
      'I monitored applications and infrastructure, responded to alerts, and helped coordinate incidents when something broke.',
  },
  {
    org: 'United States Marine Corps',
    role: 'Senior System Administrator',
    period: 'January 2019 - August 2021',
    logo: '/images/experience/marine-corps.png',
    summary:
      'I managed server, network, identity, and communications systems. I also trained five junior administrators.',
  },
  {
    org: 'United States Marine Corps',
    role: 'Junior System Administrator / Data Systems Technician',
    period: 'January 2017 - January 2019',
    logo: '/images/experience/marine-corps.png',
    summary:
      'I supported technology and communications across 23 units. I worked with Exchange, SQL Server, VMware, Cisco systems, and the day-to-day problems that came with keeping them running.',
  },
];
