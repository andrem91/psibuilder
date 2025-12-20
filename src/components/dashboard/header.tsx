"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { signOut } from "@/app/(auth)/actions";
import { DashboardTheme } from "@/contexts/dashboard-theme-provider";

interface HeaderProps {
    user: {
        name: string;
        email: string;
        avatar?: string;
    };
    onMenuClick: () => void;
    greeting?: string;
    theme?: DashboardTheme;
}

export function Header({ user, onMenuClick, greeting, theme }: HeaderProps) {
    const primaryColor = theme?.primaryColor || "#6366f1";

    return (
        <header className="sticky top-0 z-30 bg-white border-b border-gray-200">
            <div className="flex items-center justify-between px-4 py-3 lg:px-6">
                {/* Menu mobile */}
                <button
                    onClick={onMenuClick}
                    className="p-2 rounded-lg hover:bg-gray-100 lg:hidden"
                    aria-label="Abrir menu"
                >
                    <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </button>

                {/* Saudação personalizada */}
                <div className="hidden lg:block">
                    <h1 className="text-lg font-semibold text-gray-900">
                        {greeting || "Painel"}
                    </h1>
                </div>

                {/* Área direita */}
                <div className="flex items-center gap-4">
                    {/* Notificações */}
                    <button className="relative p-2 rounded-lg hover:bg-gray-100">
                        <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                        </svg>
                        {/* Badge de notificação */}
                        <span
                            className="absolute top-1 right-1 w-2 h-2 rounded-full"
                            style={{ backgroundColor: primaryColor }}
                        />
                    </button>

                    {/* Divisor */}
                    <div className="h-8 w-px bg-gray-200" />

                    {/* Perfil */}
                    <div className="flex items-center gap-3">
                        {/* Avatar com cor primária de fallback */}
                        <div
                            className="relative w-9 h-9 rounded-full flex items-center justify-center overflow-hidden"
                            style={{
                                background: user.avatar
                                    ? undefined
                                    : `linear-gradient(135deg, ${primaryColor}, ${primaryColor}dd)`,
                            }}
                        >
                            {user.avatar ? (
                                <Image
                                    src={user.avatar}
                                    alt={user.name}
                                    fill
                                    className="object-cover"
                                    sizes="36px"
                                />
                            ) : (
                                <span className="text-white font-medium text-sm">
                                    {user.name.charAt(0).toUpperCase()}
                                </span>
                            )}
                        </div>

                        {/* Nome (hidden em mobile) */}
                        <div className="hidden md:block">
                            <p className="text-sm font-medium text-gray-900 truncate max-w-[150px]">
                                {user.name}
                            </p>
                            <p className="text-xs text-gray-500 truncate max-w-[150px]">
                                {user.email}
                            </p>
                        </div>

                        {/* Logout */}
                        <form action={signOut}>
                            <Button variant="ghost" size="sm" className="text-gray-500">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                </svg>
                            </Button>
                        </form>
                    </div>
                </div>
            </div>
        </header>
    );
}
