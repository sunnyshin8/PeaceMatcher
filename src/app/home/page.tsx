import ChatInterface from '@/components/ChatInterface';
import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen bg-[#f8faf9]">
      {/* Hero Section with Chat Interface */}
      <section className="bg-gradient-to-br from-emerald-500 via-emerald-600 to-teal-600 py-12 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />

        <div className="container mx-auto px-4 relative">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-2 tracking-tight">
              AI Health Assistant
            </h1>
            <p className="text-emerald-100 text-lg max-w-lg mx-auto">
              Get instant, AI-powered health guidance. Ask about symptoms, medicines, or dosages.
            </p>
          </div>
          <div className="max-w-3xl mx-auto">
            <ChatInterface />
          </div>
        </div>
      </section>

      {/* Health Articles Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-1">Health Articles</h2>
              <p className="text-sm text-gray-500">Stay informed with the latest health insights</p>
            </div>
            <Link href="/articles" className="text-sm font-semibold text-emerald-600 hover:text-emerald-700 transition-colors">
              View all →
            </Link>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "Understanding Diabetes: Prevention and Management",
                author: "Dr. Anjali Sharma",
                category: "Diabetes",
                readTime: "8 min read",
                views: "12.5k views",
                color: '#059669',
              },
              {
                title: "Heart Health: Common Risk Factors",
                author: "Dr. Rajesh Kumar",
                category: "Heart Health",
                readTime: "6 min read",
                views: "8.2k views",
                color: '#0d9488',
              },
              {
                title: "Nutrition During Pregnancy: Essential Guidelines",
                author: "Dr. Priya Mehta",
                category: "Women's Health",
                readTime: "10 min read",
                views: "15.2k views",
                color: '#0ea5e9',
              }
            ].map((article, index) => (
              <div key={index} className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group">
                {/* Color bar */}
                <div className="h-1" style={{ background: article.color }} />
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold" style={{ backgroundColor: `${article.color}15`, color: article.color }}>
                      {article.category}
                    </span>
                    <span className="text-xs text-gray-400">by {article.author}</span>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-3 group-hover:text-emerald-600 transition-colors">
                    {article.title}
                  </h3>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-xs text-gray-400 gap-3">
                      <span>{article.readTime}</span>
                      <span>{article.views}</span>
                    </div>
                    <span className="text-emerald-500 text-sm font-semibold group-hover:translate-x-1 transition-transform">
                      Read →
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Access Cards */}
      <section className="py-12 bg-white border-t border-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-center text-gray-900 mb-2">Quick Access</h2>
          <p className="text-center text-gray-500 mb-10 text-sm">
            Jump to key features with a single tap
          </p>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 max-w-4xl mx-auto">
            {[
              { title: "Book Appointment", description: "Schedule with verified doctors", icon: "📅", href: "/appointments", color: "#059669" },
              { title: "Telehealth", description: "Video consultation with doctors", icon: "📹", href: "/telehealth", color: "#0d9488" },
              { title: "Guardian Care", description: "Manage family health", icon: "👨‍👩‍👧", href: "/guardians", color: "#0ea5e9" },
              { title: "Clinician Portal", description: "Advanced clinical tools", icon: "🩺", href: "/clinician", color: "#8b5cf6" },
            ].map((item, index) => (
              <Link key={index} href={item.href} className="block group">
                <div className="bg-gray-50 rounded-2xl p-5 border border-gray-100 hover:border-emerald-200 hover:bg-emerald-50/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
                  <span className="text-3xl mb-3 block">{item.icon}</span>
                  <h3 className="text-base font-bold text-gray-900 mb-1 group-hover:text-emerald-600 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-gray-500">{item.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}