import Link from 'next/link';

export default function Footer() {
    return (
        <footer className="bg-gradient-to-b from-gray-50 to-gray-100 border-t border-gray-200">
            <div className="max-w-7xl mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* Brand */}
                    <div>
                        <div className="flex items-center gap-2 mb-4">
                            <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-lg flex items-center justify-center">
                                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                </svg>
                            </div>
                            <span className="text-lg font-bold text-gray-900">PeaceMatcher</span>
                        </div>
                        <p className="text-sm text-gray-600 leading-relaxed">
                            AI-powered healthcare platform making quality healthcare accessible to every family, everywhere, anytime.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">Platform</h3>
                        <ul className="space-y-3">
                            {[
                                { name: 'AI Assistant', href: '/home' },
                                { name: 'Telehealth', href: '/telehealth' },
                                { name: 'Dashboard', href: '/dashboard' },
                                { name: 'Services', href: '/services' },
                            ].map(link => (
                                <li key={link.href}>
                                    <Link href={link.href} className="text-sm text-gray-600 hover:text-emerald-600 transition-colors">
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Resources */}
                    <div>
                        <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">Resources</h3>
                        <ul className="space-y-3">
                            {[
                                { name: 'Health Articles', href: '/articles' },
                                { name: 'Clinician Portal', href: '/clinician' },
                                { name: 'Guardian Care', href: '/guardians' },
                                { name: 'Support', href: '/support' },
                            ].map(link => (
                                <li key={link.href}>
                                    <Link href={link.href} className="text-sm text-gray-600 hover:text-emerald-600 transition-colors">
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">Contact</h3>
                        <ul className="space-y-3 text-sm text-gray-600">
                            <li className="flex items-center gap-2">
                                <svg className="w-4 h-4 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                                support@PeaceMatcher.health
                            </li>
                            <li className="flex items-center gap-2">
                                <svg className="w-4 h-4 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                Healthcare Innovation Hub
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="mt-10 pt-6 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <p className="text-xs text-gray-500">
                        © 2026 PeaceMatcher. Made with ❤️ for better healthcare.
                    </p>
                    <div className="flex items-center gap-4 text-xs text-gray-500">
                        <span>HIPAA Compliant</span>
                        <span>•</span>
                        <span>Privacy Policy</span>
                        <span>•</span>
                        <span>Terms of Service</span>
                    </div>
                </div>

                {/* Disclaimer */}
                <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-lg">
                    <p className="text-xs text-amber-700 text-center">
                        ⚠️ <strong>Medical Disclaimer:</strong> PeaceMatcher provides AI-assisted health information only and is not a substitute for professional medical advice. Always consult a qualified healthcare provider for medical decisions.
                    </p>
                </div>
            </div>
        </footer>
    );
}
