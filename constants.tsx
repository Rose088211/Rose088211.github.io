
import React from 'react';
import { Shield, Lock, Globe, Terminal, Cpu } from 'lucide-react';
import { BlogPost, Category } from './types';

export const CATEGORIES: Category[] = [
  'Web Security',
  'Network',
  'Pentesting',
  'Malware',
  'CTF'
];

export const MOCK_POSTS: BlogPost[] = [
  {
    id: '1',
    title: 'Anatomy of a Zero-Day Exploitation',
    excerpt: 'Understanding how sophisticated threat actors leverage unknown vulnerabilities to infiltrate secure perimeters.',
    content: 'A zero-day (also known as 0-day) is a computer-software vulnerability that is either unknown to those who should be interested in its mitigation (including the vendor of the target software) or known and a patch has not been released. Until the vulnerability is mitigated, hackers can exploit it to adversely affect computer programs, data, additional computers or a network. An exploit directed at a zero-day is called a zero-day exploit, or zero-day attack.',
    category: 'Web Security',
    author: 'Admin',
    date: '2024-05-15',
    imageUrl: 'https://picsum.photos/seed/cyber1/800/400',
    tags: ['Zero-Day', 'Exploit', 'Security']
  },
  {
    id: '2',
    title: 'Advanced Packet Sniffing Techniques',
    excerpt: 'Deep dive into Wireshark and TShark for network traffic analysis and forensic investigation.',
    content: 'Packet sniffing is the process of capturing and inspecting data packets as they travel across a network. It is a critical skill for network administrators and security professionals alike.',
    category: 'Network',
    author: 'Ghost_Root',
    date: '2024-05-10',
    imageUrl: 'https://picsum.photos/seed/cyber2/800/400',
    tags: ['Network', 'Wireshark', 'Forensics']
  },
  {
    id: '3',
    title: 'Bypassing Modern WAFs',
    excerpt: 'Tactics for evading Web Application Firewalls using encoding and specialized payloads.',
    content: 'Web Application Firewalls (WAFs) are designed to filter out malicious HTTP traffic. However, they are not infallible. This post explores common bypass techniques.',
    category: 'Web Security',
    author: 'Cipher',
    date: '2024-05-08',
    imageUrl: 'https://picsum.photos/seed/cyber3/800/400',
    tags: ['WAF', 'Bypass', 'Injection']
  },
  {
    id: '4',
    title: 'Reverse Engineering 101: GDB & Ghidra',
    excerpt: 'Starting your journey into malware analysis and binary exploitation with industry standard tools.',
    content: 'Reverse engineering is the process of taking something apart and seeing how it works. In software security, it often involves analyzing compiled binaries.',
    category: 'Malware',
    author: 'Admin',
    date: '2024-05-01',
    imageUrl: 'https://picsum.photos/seed/cyber4/800/400',
    tags: ['Reverse Engineering', 'Ghidra', 'Malware']
  }
];

export const NAV_LINKS = [
  { name: 'Dashboard', href: '#/' },
  { name: 'Articles', href: '#/articles' },
  { name: 'Security Lab', href: '#/lab' },
  { name: 'About', href: '#/about' }
];
