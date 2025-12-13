import Link from "next/link";

interface SiteHeaderProps {
    siteName: string;
    logo?: string;
    primaryColor?: string;
    navItems?: { label: string; href: string }[];
}

export function SiteHeader({
    siteName,
    logo,
    primaryColor = "#6366f1",
    navItems = [],
}: SiteHeaderProps) {
    return (
        <header className="sticky top-0 z-50 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 border-b border-gray-100">
            <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
                {/* Logo / Nome */}
                <Link href="/" className="flex items-center gap-3">
                    {logo ? (
                        <img
                            src={logo}
                            alt={siteName}
                            className="w-10 h-10 rounded-full object-cover"
                        />
                    ) : (
                        <div
                            className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold"
                            style={{ backgroundColor: primaryColor }}
                        >
                            {siteName.charAt(0).toUpperCase()}
                        </div>
                    )}
                    <span className="text-lg font-semibold text-gray-900 hidden sm:block">
                        {siteName}
                    </span>
                </Link>

                {/* Navegação */}
                {navItems.length > 0 && (
                    <nav className="hidden md:flex items-center gap-6">
                        {navItems.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
                            >
                                {item.label}
                            </Link>
                        ))}
                    </nav>
                )}

                {/* CTA */}
                <a
                    href="#contato"
                    className="px-4 py-2 rounded-full text-sm font-medium text-white transition-all hover:opacity-90"
                    style={{ backgroundColor: primaryColor }}
                >
                    Agendar Consulta
                </a>
            </div>
        </header>
    );
}
