'use client';

import { useState } from 'react';

const EMERGENCY_CONTACTS = [
    { name: 'Emergency Ambulance', number: '108', description: 'National ambulance service', icon: '🚑' },
    { name: 'Police', number: '112', description: 'All-in-one emergency', icon: '🚔' },
    { name: 'Women Helpline', number: '1091', description: '24/7 women safety', icon: '👩' },
    { name: 'Child Helpline', number: '1098', description: 'Child emergency', icon: '👶' },
    { name: 'Poison Control', number: '1066', description: 'Poison information', icon: '⚠️' },
    { name: 'Mental Health', number: 'iCall: 9152987821', description: 'Mental health helpline', icon: '🧠' },
];

const NEARBY_HOSPITALS = [
    { name: 'City General Hospital', distance: '1.2 km', type: 'Government', emergency: true },
    { name: 'Apollo Hospital', distance: '2.8 km', type: 'Private', emergency: true },
    { name: 'AIIMS District Center', distance: '3.5 km', type: 'Government', emergency: true },
    { name: 'Max Healthcare', distance: '4.1 km', type: 'Private', emergency: true },
];

export default function EmergencySOS() {
    const [isOpen, setIsOpen] = useState(false);
    const [activeTab, setActiveTab] = useState<'contacts' | 'hospitals'>('contacts');

    return (
        <>
            {/* Floating SOS Button */}
            <button
                onClick={() => setIsOpen(true)}
                className="fixed bottom-6 right-6 z-40 w-16 h-16 rounded-full bg-gradient-to-br from-red-500 to-red-600 text-white shadow-lg shadow-red-500/30 flex items-center justify-center hover:from-red-600 hover:to-red-700 hover:shadow-xl hover:shadow-red-500/40 transition-all hover:scale-105 group"
                aria-label="Emergency SOS"
            >
                <div className="text-center">
                    <svg className="w-6 h-6 mx-auto group-hover:animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5"
                            d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                    <span className="text-[9px] font-bold tracking-wider">SOS</span>
                </div>
            </button>

            {/* SOS Modal */}
            {isOpen && (
                <>
                    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50" onClick={() => setIsOpen(false)} />
                    <div className="fixed inset-x-4 top-1/2 -translate-y-1/2 z-50 max-w-lg mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden max-h-[85vh] flex flex-col">
                        {/* Header */}
                        <div className="bg-gradient-to-r from-red-500 to-red-600 px-6 py-4 flex items-center justify-between flex-shrink-0">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                            d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                                    </svg>
                                </div>
                                <div>
                                    <h2 className="text-white font-bold text-lg">Emergency SOS</h2>
                                    <p className="text-red-100 text-xs">Quick access to emergency services</p>
                                </div>
                            </div>
                            <button onClick={() => setIsOpen(false)} className="text-white/70 hover:text-white p-1">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        {/* Tabs */}
                        <div className="flex border-b border-gray-100 flex-shrink-0">
                            <button onClick={() => setActiveTab('contacts')}
                                className={`flex-1 py-3 text-sm font-semibold transition-colors ${activeTab === 'contacts' ? 'text-red-600 border-b-2 border-red-500' : 'text-gray-500 hover:text-gray-700'}`}>
                                Emergency Contacts
                            </button>
                            <button onClick={() => setActiveTab('hospitals')}
                                className={`flex-1 py-3 text-sm font-semibold transition-colors ${activeTab === 'hospitals' ? 'text-red-600 border-b-2 border-red-500' : 'text-gray-500 hover:text-gray-700'}`}>
                                Nearest Hospitals
                            </button>
                        </div>

                        {/* Content */}
                        <div className="overflow-y-auto p-4 flex-1">
                            {activeTab === 'contacts' ? (
                                <div className="space-y-2">
                                    {EMERGENCY_CONTACTS.map((contact, i) => (
                                        <a key={i} href={`tel:${contact.number.replace(/[^0-9]/g, '')}`}
                                            className="flex items-center gap-4 p-4 rounded-2xl border border-gray-100 hover:bg-red-50 hover:border-red-200 transition-all group">
                                            <span className="text-2xl">{contact.icon}</span>
                                            <div className="flex-1">
                                                <p className="font-semibold text-gray-900">{contact.name}</p>
                                                <p className="text-xs text-gray-500">{contact.description}</p>
                                            </div>
                                            <div className="text-right">
                                                <p className="font-bold text-red-600 text-lg">{contact.number}</p>
                                                <p className="text-[10px] text-gray-400 group-hover:text-red-500">Tap to call</p>
                                            </div>
                                        </a>
                                    ))}
                                </div>
                            ) : (
                                <div className="space-y-2">
                                    {NEARBY_HOSPITALS.map((hospital, i) => (
                                        <div key={i} className="flex items-center gap-4 p-4 rounded-2xl border border-gray-100 hover:bg-blue-50 hover:border-blue-200 transition-all">
                                            <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center flex-shrink-0">
                                                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                                        d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                                </svg>
                                            </div>
                                            <div className="flex-1">
                                                <p className="font-semibold text-gray-900">{hospital.name}</p>
                                                <div className="flex items-center gap-2 mt-0.5">
                                                    <span className="text-xs text-gray-500">{hospital.type}</span>
                                                    {hospital.emergency && (
                                                        <span className="text-[10px] px-2 py-0.5 bg-green-100 text-green-700 rounded-full font-semibold">24/7 ER</span>
                                                    )}
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <p className="font-bold text-blue-600">{hospital.distance}</p>
                                                <p className="text-[10px] text-gray-400">away</p>
                                            </div>
                                        </div>
                                    ))}
                                    <p className="text-center text-xs text-gray-400 mt-3">
                                        📍 Distances are approximate. Enable location for accurate results.
                                    </p>
                                </div>
                            )}
                        </div>

                        {/* Emergency Call Button */}
                        <div className="p-4 border-t border-gray-100 flex-shrink-0">
                            <a href="tel:108"
                                className="block w-full py-4 text-center bg-gradient-to-r from-red-500 to-red-600 text-white font-bold rounded-2xl shadow-lg shadow-red-500/20 hover:from-red-600 hover:to-red-700 transition-all text-lg">
                                📞 Call Ambulance (108)
                            </a>
                        </div>
                    </div>
                </>
            )}
        </>
    );
}
