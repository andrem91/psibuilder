"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { ScrollLink } from "@/components/ui/scroll-link";
import { FontPreset } from "@/lib/font-presets";

interface SiteHeaderProps {
    siteName: string;
    logo?: string;
    primaryColor?: string;
    fontPreset?: FontPreset;
    navItems?: { label: string; href: string }[];
    logoHref?: string;
}

export function SiteHeader({
    siteName,
    logo,
    primaryColor = "#6366f1",
    fontPreset,
    navItems = [],
    logoHref = "/",
}: SiteHeaderProps) {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isClosing, setIsClosing] = useState(false);

    // Fechar menu com animação
    const handleCloseMenu = () => {
        setIsClosing(true);
        setTimeout(() => {
            setIsMobileMenuOpen(false);
            setIsClosing(false);
        }, 200); // duração da animação de saída
    };

    // Fechar menu ao redimensionar para desktop
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 768 && isMobileMenuOpen) {
                setIsMobileMenuOpen(false);
            }
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [isMobileMenuOpen]);

    // Estilo para nome estilizado (quando não tem logo)
    const styledNameStyle = fontPreset ? {
        fontFamily: `"${fontPreset.headingFont}", serif`,
        fontWeight: fontPreset.headingWeight,
    } : {};

    return (
        <header className="sticky top-0 z-50 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 border-b border-gray-100 safe-area-top">
            <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
                {/* Logo / Nome Estilizado */}
                <Link href={logoHref} className="flex items-center gap-3 touch-link">
                    {logo ? (
                        <div className="relative w-10 h-10 sm:w-12 sm:h-12">
                            <Image
                                src={logo}
                                alt={siteName}
                                fill
                                className="rounded-full object-cover"
                                sizes="(max-width: 640px) 40px, 48px"
                            />
                        </div>
                    ) : (
                        /* Nome estilizado quando não tem logo */
                        <div className="flex items-center gap-2">
                            {/* Inicial decorativa */}
                            <div
                                className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center text-white font-bold text-lg sm:text-xl"
                                style={{
                                    backgroundColor: primaryColor,
                                    ...styledNameStyle
                                }}
                            >
                                {siteName.charAt(0).toUpperCase()}
                            </div>
                        </div>
                    )}
                    {/* Nome sempre visível, estilizado com fonte do preset */}
                    <span
                        className="text-lg sm:text-xl text-gray-900 hidden sm:block"
                        style={styledNameStyle}
                    >
                        {siteName}
                    </span>
                </Link>

                {/* Navegação Desktop */}
                {navItems.length > 0 && (
                    <nav className="hidden md:flex items-center gap-6">
                        {navItems.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors py-2"
                            >
                                {item.label}
                            </Link>
                        ))}
                    </nav>
                )}

                {/* CTA Desktop & Hamburger Mobile */}
                <div className="flex items-center gap-2 sm:gap-3">
                    <ScrollLink
                        to="contato"
                        className="hidden sm:inline-flex touch-button px-5 py-2.5 rounded-full text-sm font-medium text-white transition-all hover:opacity-90 hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
                        style={{ backgroundColor: primaryColor }}
                    >
                        Agendar Consulta
                    </ScrollLink>

                    {/* Hamburger Button - Touch friendly */}
                    <button
                        onClick={() => isMobileMenuOpen ? handleCloseMenu() : setIsMobileMenuOpen(true)}
                        className={`md:hidden touch-target p-2 rounded-lg hover:bg-gray-100 transition-colors ${isMobileMenuOpen ? 'hamburger-open' : ''}`}
                        aria-label={isMobileMenuOpen ? "Fechar menu" : "Abrir menu"}
                        aria-expanded={isMobileMenuOpen}
                    >
                        <div className="w-6 h-6 flex flex-col justify-center items-center gap-1.5">
                            <span className="hamburger-line block w-5 h-0.5 bg-gray-700 rounded-full" />
                            <span className="hamburger-line block w-5 h-0.5 bg-gray-700 rounded-full" />
                            <span className="hamburger-line block w-5 h-0.5 bg-gray-700 rounded-full" />
                        </div>
                    </button>
                </div>
            </div>

            {/* Mobile Menu Dropdown com animação */}
            {isMobileMenuOpen && (
                <div className={`md:hidden border-t border-gray-100 bg-white ${isClosing ? 'mobile-menu-exit' : 'mobile-menu-enter'}`}>
                    <nav className="max-w-6xl mx-auto px-4 py-4 flex flex-col gap-1">
                        {navItems.map((item, index) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                onClick={handleCloseMenu}
                                className="mobile-menu-item touch-target py-3 px-4 text-base font-medium text-gray-700 hover:bg-gray-50 rounded-xl transition-colors"
                                style={{ animationDelay: `${index * 50}ms` }}
                            >
                                {item.label}
                            </Link>
                        ))}
                        <ScrollLink
                            to="contato"
                            onClick={handleCloseMenu}
                            className="mobile-menu-item touch-button mt-2 py-3 px-4 rounded-xl text-center text-base font-medium text-white transition-all hover:opacity-90 cursor-pointer"
                            style={{
                                backgroundColor: primaryColor,
                                animationDelay: `${navItems.length * 50}ms`
                            }}
                        >
                            Agendar Consulta
                        </ScrollLink>
                    </nav>
                </div>
            )}
        </header>
    );
}
