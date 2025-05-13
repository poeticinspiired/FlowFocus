import Link from 'next/link'

// Placeholder SVG icons (replace with Lucide/Feather for production)
function IconTask() {
  return (
    <svg width="32" height="32" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M8 9h8M8 13h6"/></svg>
  );
}
function IconTime() {
  return (
    <svg width="32" height="32" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
  );
}
function IconFaith() {
  return (
    <svg width="32" height="32" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 2l2.09 6.26L20 9.27l-5 3.64L16.18 20 12 16.77 7.82 20 9 12.91l-5-3.64 5.91-.91z"/></svg>
  );
}
function IconCommunity() {
  return (
    <svg width="32" height="32" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="7" r="4"/><path d="M5.5 21a7.5 7.5 0 0 1 13 0"/></svg>
  );
}
function IconAccessibility() {
  return (
    <svg width="32" height="32" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="4" r="2"/><path d="M12 6v6m0 0l-4 8m4-8l4 8"/></svg>
  );
}
function IconAnalytics() {
  return (
    <svg width="32" height="32" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="12" width="4" height="8"/><rect x="9" y="8" width="4" height="12"/><rect x="15" y="4" width="4" height="16"/></svg>
  );
}

export default function Home() {
  return (
    <main>
      {/* Hero Section */}
      <section className="min-h-[60vh] flex flex-col items-center justify-center bg-gradient-to-br from-[#1E1F29] via-[#1FAB89] to-[#F4EFEA] text-white text-center px-4 py-24 relative overflow-hidden">
        {/* Subtle geometric pattern or stars could be added here as a background image */}
        <h1 className="text-4xl md:text-6xl font-bold mb-4 drop-shadow-lg">
          FlowFocus
          <span className="block text-lg md:text-2xl font-normal text-[#D4AF37] mt-2">
            Faith-Driven Productivity Platform
          </span>
        </h1>
        <p className="max-w-xl mx-auto mb-8 text-lg md:text-2xl text-white/90">
          Align your productivity with mercy, purpose, and trust.
        </p>
        <div className="flex gap-4 justify-center">
          <Link
            href="/signup"
            className="bg-[#D4AF37] text-[#1E1F29] px-6 py-3 rounded-lg font-semibold shadow hover:bg-yellow-400 transition"
          >
            Get Started
          </Link>
          <Link
            href="/features"
            className="border border-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-[#1E1F29] transition"
          >
            See Features
          </Link>
        </div>
      </section>

      {/* Features Grid */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <FeatureCard
            title="Smart Task Management"
            description="AI-prioritized tasks based on urgency, value, and barakah—not just deadlines."
            icon={<IconTask />}
          />
          <FeatureCard
            title="Time Management"
            description="Adaptive timers and prayer-time aligned scheduling for focused work."
            icon={<IconTime />}
          />
          <FeatureCard
            title="Faith Integration"
            description="Qur'an recitations, dhikr reminders, and spiritual reflection tools."
            icon={<IconFaith />}
          />
          <FeatureCard
            title="Community Support"
            description="Join focus sessions and connect with like-minded individuals."
            icon={<IconCommunity />}
          />
          <FeatureCard
            title="Accessibility"
            description="Designed for all users, with support for various cognitive styles."
            icon={<IconAccessibility />}
          />
          <FeatureCard
            title="Barakah Analytics"
            description="Track your spiritual alignment and growth over time."
            icon={<IconAnalytics />}
          />
        </div>
      </section>
    </main>
  )
}

function FeatureCard({
  title,
  description,
  icon,
}: {
  title: string
  description: string
  icon: React.ReactNode
}) {
  return (
    <div className="p-6 rounded-lg border border-gray-200 hover:border-primary-500 transition-colors bg-white shadow-md flex flex-col items-center text-center">
      <div className="mb-4 text-primary-600">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  )
} 