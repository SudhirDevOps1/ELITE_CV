
import React from 'react';

export const TEMPLATES = [
  { id: 'modern', name: 'Elite Modern', description: 'Dual-pane tech-focused with left sidebar' },
  { id: 'corporate', name: 'Executive Pro', description: 'Classic center-aligned high-density layout' },
  { id: 'academic', name: 'Academic Scholar', description: 'Traditional serif CV for research and education' },
  { id: 'minimal_tech', name: 'Tech Minimalist', description: 'High-contrast monospace for engineers' },
  { id: 'swiss', name: 'Swiss Design', description: 'Strict geometric typography based on modernist grid' },
  { id: 'right_sidebar', name: 'Right Sidebar', description: 'Modern inverted layout with focal sidebar' },
  { id: 'creative_gradient', name: 'Creative Aura', description: 'Vibrant accents for design and marketing' },
  { id: 'clean_column', name: 'Clean Columnar', description: 'Elegant split layout with balanced white space' },
  { id: 'compact_grid', name: 'Density Master', description: 'Optimized for experienced pros with long histories' },
  { id: 'elite_finance', name: 'Elite Finance', description: 'Strict, premium look for banking and legal' },
];

export const FONTS = [
  { name: 'Inter', value: "'Inter', sans-serif" },
  { name: 'Montserrat', value: "'Montserrat', sans-serif" },
  { name: 'Open Sans', value: "'Open Sans', sans-serif" },
  { name: 'Playfair Display', value: "'Playfair Display', serif" },
  { name: 'Roboto Mono', value: "'Roboto Mono', monospace" },
];

export const COLORS = [
  { name: 'Royal Blue', value: '#2563eb' },
  { name: 'Emerald', value: '#10b981' },
  { name: 'Vivid Violet', value: '#8b5cf6' },
  { name: 'Rose Red', value: '#e11d48' },
  { name: 'Gold Rush', value: '#d97706' },
  { name: 'Midnight Black', value: '#0f172a' },
];

export const INITIAL_DATA: any = {
  id: 'resume-1',
  title: 'Elite Professional Document',
  updatedAt: Date.now(),
  basics: {
    fullName: 'SUDHIR KUMAR',
    jobTitle: 'Senior Full Stack Developer',
    email: 'sudhir.devops@example.com',
    phone: '+91 98765 43210',
    location: 'Bangalore, India',
    website: 'sudhir.dev',
    linkedIn: 'linkedin.com/in/sudhirdevops1',
  },
  summary: 'Innovative software architect with over 5 years of experience in high-performance web systems. Expertise in scaling React applications and automating infrastructure using DevOps practices. Passionate about building seamless user experiences and solving complex technical challenges.',
  experience: [
    {
      id: 'exp-1',
      company: 'ProFlow Solutions',
      position: 'Lead Engineer',
      location: 'Bangalore',
      startDate: 'Aug 2021',
      endDate: 'Present',
      description: 'Architected a real-time analytics dashboard used by 50k+ daily active users.\nLed a team of 10 developers to migrate legacy monolith to microservices.\nReduced deployment time by 60% through custom CI/CD pipelines.',
    },
    {
      id: 'exp-2',
      company: 'Creative Tech Pvt Ltd',
      position: 'Software Developer',
      location: 'Remote',
      startDate: 'Jan 2019',
      endDate: 'Jul 2021',
      description: 'Developed 15+ high-conversion landing pages using Next.js.\nIntegrated third-party payment gateways and auth systems.\nOptimized database queries, improving API response time by 40%.',
    }
  ],
  education: [
    {
      id: 'edu-1',
      school: 'Indian Institute of Technology',
      degree: 'B.Tech',
      field: 'Computer Science',
      location: 'Delhi',
      startDate: '2015',
      endDate: '2019',
    }
  ],
  skills: ['React.js', 'TypeScript', 'Node.js', 'AWS', 'Docker', 'Kubernetes', 'Tailwind CSS', 'System Design'],
  projects: [
    {
      id: 'proj-1',
      name: 'CloudSync Platform',
      link: 'github.com/SudhirDevOps1/cloudsync',
      description: 'A decentralized file storage solution with end-to-end encryption.',
    }
  ],
  certifications: ['AWS Solution Architect', 'Google Cloud Professional'],
  languages: ['English', 'Hindi', 'German'],
  achievements: ['Smart India Hackathon Winner 2018', 'Open Source Contributor of the Year'],
  hobbies: ['Tech Blogging', 'Mountain Trekking', 'Chess'],
  settings: {
    template: 'modern',
    primaryColor: '#2563eb',
    fontFamily: "'Inter', sans-serif",
    fontSize: 10,
    spacing: 15,
    lineHeight: 1.5,
  },
};
