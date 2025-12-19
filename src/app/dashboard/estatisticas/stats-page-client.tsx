"use client";

import { useState } from "react";

interface StatsData {
    pageViews: number;
    uniqueVisitors: number;
    whatsappClicks: number;
    ctaClicks: number;
    conversionRate: number;
    topReferrers: { source: string; count: number }[];
    dailyStats: { date: string; views: number; visitors: number }[];
    changes: {
        pageViews: string | null;
        uniqueVisitors: string | null;
        whatsappClicks: string | null;
        ctaClicks: string | null;
    };
}

interface StatsPageClientProps {
    stats: StatsData;
    siteName: string;
    dateRange: string;
}

// Componente de Card de Métrica
function MetricCard({
    title,
    value,
    change,
    icon,
    color,
}: {
    title: string;
    value: string | number;
    change?: string | null;
    icon: React.ReactNode;
    color: string;
}) {
    return (
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-start justify-between">
                <div>
                    <p className="text-sm text-gray-500 mb-1">{title}</p>
                    <p className="text-3xl font-bold text-gray-900">{value}</p>
                    {change && (
                        <p className={`text-sm mt-2 ${change.startsWith("+") ? "text-green-600" : change.startsWith("-") ? "text-red-500" : "text-gray-500"}`}>
                            {change} vs semana anterior
                        </p>
                    )}
                </div>
                <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: `${color}15` }}
                >
                    <div style={{ color }}>{icon}</div>
                </div>
            </div>
        </div>
    );
}

// Ícones
const EyeIcon = () => (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
    </svg>
);

const UsersIcon = () => (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
    </svg>
);

const PhoneIcon = () => (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
    </svg>
);

const CursorIcon = () => (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
    </svg>
);

export function StatsPageClient({ stats, siteName, dateRange: _dateRange }: StatsPageClientProps) {
    const [selectedPeriod, setSelectedPeriod] = useState("7d");

    const periods = [
        { id: "7d", label: "7 dias" },
        { id: "30d", label: "30 dias" },
        { id: "90d", label: "90 dias" },
    ];

    const hasData = stats.pageViews > 0 || stats.uniqueVisitors > 0;

    return (
        <div className="max-w-6xl mx-auto">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Estatísticas</h1>
                    <p className="text-gray-500 mt-1">
                        Acompanhe o desempenho do seu site: <strong>{siteName}</strong>
                    </p>
                </div>

                {/* Seletor de Período */}
                <div className="flex bg-gray-100 rounded-xl p-1">
                    {periods.map((period) => (
                        <button
                            key={period.id}
                            onClick={() => setSelectedPeriod(period.id)}
                            className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${selectedPeriod === period.id
                                ? "bg-white text-gray-900 shadow-sm"
                                : "text-gray-600 hover:text-gray-900"
                                }`}
                        >
                            {period.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Cards de Métricas */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                <MetricCard
                    title="Visualizações"
                    value={stats.pageViews.toLocaleString("pt-BR")}
                    change={stats.changes.pageViews}
                    icon={<EyeIcon />}
                    color="#6366f1"
                />
                <MetricCard
                    title="Visitantes Únicos"
                    value={stats.uniqueVisitors.toLocaleString("pt-BR")}
                    change={stats.changes.uniqueVisitors}
                    icon={<UsersIcon />}
                    color="#10b981"
                />
                <MetricCard
                    title="Cliques no WhatsApp"
                    value={stats.whatsappClicks}
                    change={stats.changes.whatsappClicks}
                    icon={<PhoneIcon />}
                    color="#22c55e"
                />
                <MetricCard
                    title="Cliques em Agendar"
                    value={stats.ctaClicks}
                    change={stats.changes.ctaClicks}
                    icon={<CursorIcon />}
                    color="#f59e0b"
                />
            </div>

            {/* Taxa de Conversão */}
            <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl p-8 text-white mb-8">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                        <p className="text-indigo-100 text-sm mb-1">Taxa de Conversão (WhatsApp)</p>
                        <p className="text-4xl font-bold">{stats.conversionRate.toFixed(1)}%</p>
                        <p className="text-indigo-200 text-sm mt-2">
                            {stats.whatsappClicks} de {stats.uniqueVisitors} visitantes entraram em contato
                        </p>
                    </div>
                    <div className="bg-white/20 backdrop-blur rounded-xl p-4">
                        <p className="text-sm text-indigo-100 mb-1">Comparativo do mercado</p>
                        <p className="text-lg font-semibold">Média: 2-5%</p>
                        {stats.conversionRate > 5 && (
                            <p className="text-sm text-green-300 mt-1">🎉 Você está acima da média!</p>
                        )}
                    </div>
                </div>
            </div>

            {/* Gráfico Simplificado (Barras) */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-6">Visitantes nos últimos 7 dias</h3>
                {hasData ? (
                    <div className="flex items-end justify-between gap-2 h-40">
                        {stats.dailyStats.map((day, index) => {
                            const maxViews = Math.max(...stats.dailyStats.map((d) => d.views));
                            const height = maxViews > 0 ? (day.views / maxViews) * 100 : 0;
                            return (
                                <div key={index} className="flex-1 flex flex-col items-center gap-2">
                                    <div
                                        className="w-full bg-indigo-500 rounded-t-lg transition-all hover:bg-indigo-600"
                                        style={{ height: `${Math.max(height, 5)}%` }}
                                        title={`${day.views} visualizações`}
                                    />
                                    <span className="text-xs text-gray-500">{day.date}</span>
                                </div>
                            );
                        })}
                    </div>
                ) : (
                    <div className="flex items-center justify-center h-40 text-gray-400">
                        <p>Ainda não há dados. Compartilhe seu site para começar!</p>
                    </div>
                )}
            </div>

            {/* Origem do Tráfego */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-6">De onde vêm seus visitantes</h3>
                <div className="space-y-4">
                    {stats.topReferrers.length > 0 ? (
                        stats.topReferrers.map((referrer, index) => {
                            const maxCount = Math.max(...stats.topReferrers.map((r) => r.count));
                            const percentage = maxCount > 0 ? (referrer.count / maxCount) * 100 : 0;
                            return (
                                <div key={index} className="flex items-center gap-4">
                                    <span className="w-32 text-sm text-gray-700 truncate">{referrer.source}</span>
                                    <div className="flex-1 bg-gray-100 rounded-full h-3 overflow-hidden">
                                        <div
                                            className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full transition-all"
                                            style={{ width: `${percentage}%` }}
                                        />
                                    </div>
                                    <span className="text-sm font-medium text-gray-900 w-16 text-right">
                                        {referrer.count}
                                    </span>
                                </div>
                            );
                        })
                    ) : (
                        <p className="text-gray-500 text-center py-8">
                            Ainda não há dados de origem. Compartilhe seu site para começar a receber visitantes!
                        </p>
                    )}
                </div>
            </div>

            {/* Dica */}
            <div className="mt-8 bg-amber-50 border border-amber-200 rounded-xl p-6">
                <div className="flex gap-4">
                    <span className="text-2xl">💡</span>
                    <div>
                        <h4 className="font-semibold text-amber-900 mb-1">Dica para aumentar conversões</h4>
                        <p className="text-sm text-amber-800">
                            Compartilhe seu site nas redes sociais e no Google Meu Negócio.
                            Psicólogos que mantêm presença ativa nestas plataformas têm 40% mais cliques no WhatsApp.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
