export type ExperienceEntry = {
  org: string;
  unit?: string;
  role: string;
  period: string;
  /** Short monogram shown until a real logo asset is provided. */
  mark: string;
  summary: string;
};

export const experience: ExperienceEntry[] = [
  {
    org: 'The Walt Disney Company',
    unit: 'Enterprise Technology Operations Center',
    role: 'HyperCare Operations Analyst',
    period: '2022 — present',
    mark: 'WD',
    summary:
      'Readiness planning for major enterprise events, ITIL tooling adoption, and liaison to leadership on service impacts.',
  },
  {
    org: 'The Walt Disney Company',
    unit: 'Disney Technology Operations Center',
    role: 'Technical Operations Center Analyst',
    period: '2021 — 2022',
    mark: 'WD',
    summary:
      'Real-time incident response for critical infrastructure across VMware, vSphere, and Active Directory environments.',
  },
  {
    org: 'United States Marine Corps',
    role: 'Senior System Administrator',
    period: '2019 — 2021',
    mark: 'MC',
    summary:
      'Ran day-to-day server environments, trained five junior administrators, zero security breaches on watch.',
  },
  {
    org: 'United States Marine Corps',
    role: 'Junior System Administrator / Data Systems Technician',
    period: '2017 — 2019',
    mark: 'MC',
    summary:
      'Supported 23 units in field deployments; built virtualized Exchange and SQL servers and secure Cisco telephony.',
  },
];
