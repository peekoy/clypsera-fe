'use client';

import { useEffect, useState } from 'react';

interface ScrollspySidebarProps {
  pathname: string;
}

const sectionMap: Record<string, { id: string; label: string }[]> = {
  '/privacy': [
    { id: 'introduction', label: 'Introduction' },
    { id: 'information-we-collect', label: 'Information We Collect' },
    { id: 'use-of-information', label: 'Use of Information' },
    { id: 'data-sharing-and-disclosure', label: 'Data Sharing and Disclosure' },
    { id: 'data-security', label: 'Data Security' },
    { id: 'policy-updates', label: 'Policy Updates' },
  ],
  '/terms': [
    { id: 'welcome-to-clypsera', label: 'Welcome to Clypsera' },
    { id: 'account-usage', label: 'Account Usage' },
    { id: 'data-policy', label: 'Data Policy' },
    { id: 'intellectual-property', label: 'Intellectual Property' },
    { id: 'changes-to-terms', label: 'Changes to Terms' },
  ],
};

export default function ScrollspySidebar({ pathname }: ScrollspySidebarProps) {
  const sections = sectionMap[pathname] || [];
  const [activeId, setActiveId] = useState(sections[0]?.id || '');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

        if (visible.length >= 0) {
          setActiveId(visible[0].target.id);
        }
      },
      {
        rootMargin: '-20% 0% -60% 0%',
        threshold: 0.1,
      }
    );

    sections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    // fallback biar section pertama tetap ke-set
    if (sections.length > 0) {
      setActiveId(sections[0].id);
    }

    return () => observer.disconnect();
  }, [sections]);

  return (
    <aside className='w-64 space-y-2 sticky top-24 h-fit'>
      {sections.map((section) => (
        <a
          key={section.id}
          href={`#${section.id}`}
          className={`block pl-4 pr-2 py-1 relative transition-all duration-200
    ${
      activeId === section.id
        ? 'text-teal-700 font-semibold before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:h-5 before:w-1 before:bg-teal-500 before:rounded-sm'
        : 'text-gray-400 font-semibold hover:text-teal-600'
    }`}
        >
          {section.label}
        </a>
      ))}
    </aside>
  );
}
