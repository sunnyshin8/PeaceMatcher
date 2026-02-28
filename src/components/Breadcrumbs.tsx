'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const routeLabels: Record<string, string> = {
    '': 'Home',
    'home': 'AI Assistant',
    'dashboard': 'Dashboard',
    'telehealth': 'Telehealth',
    'appointments': 'Appointments',
    'clinician': 'Clinician Portal',
    'guardians': 'Guardian Care',
    'services': 'Services',
    'login': 'Login',
    'signup': 'Sign Up',
    'symptom-checker': 'Symptom Checker',
    'drug-interactions': 'Drug Interactions',
    'dosage-calculator': 'Dosage Calculator',
    'articles': 'Health Articles',
    'support': 'Support',
    'contact': 'Contact',
};

export default function Breadcrumbs() {
    const pathname = usePathname();
    if (pathname === '/') return null;

    const segments = pathname.split('/').filter(Boolean);

    return (
        <nav className="max-w-7xl mx-auto px-4 py-3" aria-label="Breadcrumb">
            <ol className="flex items-center gap-1.5 text-sm">
                <li>
                    <Link href="/" className="text-gray-400 hover:text-emerald-600 transition-colors">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                        </svg>
                    </Link>
                </li>
                {segments.map((segment, index) => {
                    const path = '/' + segments.slice(0, index + 1).join('/');
                    const isLast = index === segments.length - 1;
                    const label = routeLabels[segment] || segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, ' ');

                    return (
                        <li key={path} className="flex items-center gap-1.5">
                            <svg className="w-3.5 h-3.5 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                            </svg>
                            {isLast ? (
                                <span className="text-emerald-600 font-semibold">{label}</span>
                            ) : (
                                <Link href={path} className="text-gray-400 hover:text-emerald-600 transition-colors">
                                    {label}
                                </Link>
                            )}
                        </li>
                    );
                })}
            </ol>
        </nav>
    );
}
