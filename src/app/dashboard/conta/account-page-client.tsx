"use client";

import { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface AccountPageClientProps {
    profile: {
        id: string;
        full_name: string;
        email: string;
        whatsapp: string;
        crp: string;
    };
    site: {
        id: string;
        subdomain: string;
        google_analytics_id?: string;
        clarity_id?: string;
        facebook_pixel_id?: string;
        gtm_id?: string;
    } | null;
}

// Tabs disponíveis
type TabId = "profile" | "security" | "integrations";

const tabs = [
    { id: "profile" as TabId, label: "Dados Pessoais", icon: "👤" },
    { id: "security" as TabId, label: "Segurança", icon: "🔒" },
    { id: "integrations" as TabId, label: "Integrações", icon: "🔗" },
];

export function AccountPageClient({ profile, site }: AccountPageClientProps) {
    const [activeTab, setActiveTab] = useState<TabId>("profile");
    const [isPending, startTransition] = useTransition();
    const [success, setSuccess] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    // Estados do formulário de perfil
    const [profileData, setProfileData] = useState({
        full_name: profile.full_name || "",
        email: profile.email || "",
        whatsapp: profile.whatsapp || "",
        crp: profile.crp || "",
    });

    // Estados do formulário de segurança
    const [securityData, setSecurityData] = useState({
        current_password: "",
        new_password: "",
        confirm_password: "",
    });

    // Estados do formulário de integrações
    const [integrationsData, setIntegrationsData] = useState({
        google_analytics_id: site?.google_analytics_id || "",
        clarity_id: site?.clarity_id || "",
        facebook_pixel_id: site?.facebook_pixel_id || "",
        gtm_id: site?.gtm_id || "",
    });

    const handleSaveProfile = async () => {
        setError(null);
        startTransition(async () => {
            try {
                const response = await fetch("/api/account/update-profile", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(profileData),
                });

                if (!response.ok) {
                    const data = await response.json();
                    throw new Error(data.error || "Erro ao salvar");
                }

                setSuccess("Perfil atualizado com sucesso!");
                setTimeout(() => setSuccess(null), 3000);
            } catch (_err) {
                setError(_err instanceof Error ? _err.message : "Erro ao salvar");
            }
        });
    };

    const handleChangePassword = async () => {
        setError(null);

        if (securityData.new_password !== securityData.confirm_password) {
            setError("As senhas não coincidem");
            return;
        }

        if (securityData.new_password.length < 6) {
            setError("A nova senha deve ter pelo menos 6 caracteres");
            return;
        }

        startTransition(async () => {
            try {
                const response = await fetch("/api/account/change-password", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        current_password: securityData.current_password,
                        new_password: securityData.new_password,
                    }),
                });

                if (!response.ok) {
                    const data = await response.json();
                    throw new Error(data.error || "Erro ao alterar senha");
                }

                setSuccess("Senha alterada com sucesso!");
                setSecurityData({
                    current_password: "",
                    new_password: "",
                    confirm_password: "",
                });
                setTimeout(() => setSuccess(null), 3000);
            } catch (_err) {
                setError(_err instanceof Error ? _err.message : "Erro ao alterar senha");
            }
        });
    };

    const handleSaveIntegrations = async () => {
        setError(null);
        startTransition(async () => {
            try {
                const response = await fetch("/api/account/update-integrations", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(integrationsData),
                });

                if (!response.ok) {
                    const data = await response.json();
                    throw new Error(data.error || "Erro ao salvar");
                }

                setSuccess("Integrações salvas com sucesso!");
                setTimeout(() => setSuccess(null), 3000);
            } catch (_err) {
                setError(_err instanceof Error ? _err.message : "Erro ao salvar");
            }
        });
    };

    return (
        <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900">Minha Conta</h1>
                <p className="text-gray-500 mt-2">
                    Gerencie seus dados pessoais, segurança e integrações
                </p>
            </div>

            {/* Mensagens */}
            {success && (
                <div className="mb-6 p-4 bg-green-50 border border-green-200 text-green-700 rounded-xl">
                    {success}
                </div>
            )}
            {error && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl">
                    {error}
                </div>
            )}

            {/* Tabs */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                {/* Tab Navigation */}
                <div className="flex border-b border-gray-100">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`flex-1 px-6 py-4 text-sm font-medium transition-colors ${activeTab === tab.id
                                ? "bg-indigo-50 text-indigo-700 border-b-2 border-indigo-500"
                                : "text-gray-600 hover:bg-gray-50"
                                }`}
                        >
                            <span className="mr-2">{tab.icon}</span>
                            {tab.label}
                        </button>
                    ))}
                </div>

                {/* Tab Content */}
                <div className="p-8">
                    {/* Tab Perfil */}
                    {activeTab === "profile" && (
                        <div className="space-y-6">
                            <div className="grid md:grid-cols-2 gap-6">
                                <Input
                                    label="Nome completo"
                                    value={profileData.full_name}
                                    onChange={(e) =>
                                        setProfileData({ ...profileData, full_name: e.target.value })
                                    }
                                />
                                <Input
                                    label="E-mail"
                                    type="email"
                                    value={profileData.email}
                                    onChange={(e) =>
                                        setProfileData({ ...profileData, email: e.target.value })
                                    }
                                />
                            </div>

                            <div className="grid md:grid-cols-2 gap-6">
                                <Input
                                    label="WhatsApp"
                                    placeholder="(11) 99999-9999"
                                    value={profileData.whatsapp}
                                    onChange={(e) =>
                                        setProfileData({ ...profileData, whatsapp: e.target.value })
                                    }
                                />
                                <Input
                                    label="CRP"
                                    placeholder="00/00000"
                                    value={profileData.crp}
                                    onChange={(e) =>
                                        setProfileData({ ...profileData, crp: e.target.value })
                                    }
                                />
                            </div>

                            <div className="flex justify-end pt-4">
                                <Button onClick={handleSaveProfile} isLoading={isPending}>
                                    Salvar Alterações
                                </Button>
                            </div>
                        </div>
                    )}

                    {/* Tab Segurança */}
                    {activeTab === "security" && (
                        <div className="space-y-6 max-w-md">
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                                    Alterar Senha
                                </h3>
                                <p className="text-sm text-gray-500 mb-6">
                                    Para sua segurança, escolha uma senha forte com pelo menos 6 caracteres.
                                </p>
                            </div>

                            <Input
                                label="Senha atual"
                                type="password"
                                value={securityData.current_password}
                                onChange={(e) =>
                                    setSecurityData({ ...securityData, current_password: e.target.value })
                                }
                            />

                            <Input
                                label="Nova senha"
                                type="password"
                                value={securityData.new_password}
                                onChange={(e) =>
                                    setSecurityData({ ...securityData, new_password: e.target.value })
                                }
                            />

                            <Input
                                label="Confirmar nova senha"
                                type="password"
                                value={securityData.confirm_password}
                                onChange={(e) =>
                                    setSecurityData({ ...securityData, confirm_password: e.target.value })
                                }
                            />

                            <div className="flex justify-end pt-4">
                                <Button
                                    onClick={handleChangePassword}
                                    isLoading={isPending}
                                    disabled={!securityData.current_password || !securityData.new_password}
                                >
                                    Alterar Senha
                                </Button>
                            </div>
                        </div>
                    )}

                    {/* Tab Integrações */}
                    {activeTab === "integrations" && (
                        <div className="space-y-8">
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                    Integrações de Rastreamento
                                </h3>
                                <p className="text-sm text-gray-500">
                                    Conecte ferramentas de análise para acompanhar o desempenho do seu site.
                                </p>
                            </div>

                            {/* Google Analytics */}
                            <div className="p-6 bg-gray-50 rounded-xl">
                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-sm">
                                        <svg className="w-6 h-6 text-orange-500" viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M22.84 2.998c-.643-.36-1.455-.178-1.814.465l-1.93 3.447a6.473 6.473 0 00-3.592-1.088c-3.589 0-6.504 2.915-6.504 6.504s2.915 6.504 6.504 6.504c2.89 0 5.344-1.887 6.188-4.5h-2.266c-.732 1.344-2.17 2.25-3.922 2.25-2.396 0-4.339-1.943-4.339-4.339s1.943-4.339 4.339-4.339c1.19 0 2.27.48 3.054 1.259l-2.13 3.804c-.36.643-.178 1.455.465 1.814.643.36 1.455.178 1.814-.465l5.598-10c.36-.643.178-1.455-.465-1.814z" />
                                        </svg>
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="font-medium text-gray-900">Google Analytics</h4>
                                        <p className="text-sm text-gray-500 mb-3">
                                            Acompanhe visitantes, origem do tráfego e comportamento no site.
                                        </p>
                                        <Input
                                            label="ID de Medição"
                                            placeholder="G-XXXXXXXXXX"
                                            value={integrationsData.google_analytics_id}
                                            onChange={(e) =>
                                                setIntegrationsData({ ...integrationsData, google_analytics_id: e.target.value })
                                            }
                                        />
                                        <a
                                            href="https://support.google.com/analytics/answer/9539598"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-xs text-indigo-600 hover:underline mt-2 inline-block"
                                        >
                                            Como encontrar meu ID? →
                                        </a>
                                    </div>
                                </div>
                            </div>

                            {/* Microsoft Clarity */}
                            <div className="p-6 bg-gray-50 rounded-xl">
                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-sm">
                                        <svg className="w-6 h-6 text-blue-500" viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                                        </svg>
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="font-medium text-gray-900">Microsoft Clarity</h4>
                                        <p className="text-sm text-gray-500 mb-3">
                                            Mapas de calor, gravações de sessão e análise de comportamento gratuitos.
                                        </p>
                                        <Input
                                            label="ID do Projeto"
                                            placeholder="xxxxxxxxxx"
                                            value={integrationsData.clarity_id}
                                            onChange={(e) =>
                                                setIntegrationsData({ ...integrationsData, clarity_id: e.target.value })
                                            }
                                        />
                                        <a
                                            href="https://clarity.microsoft.com/"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-xs text-indigo-600 hover:underline mt-2 inline-block"
                                        >
                                            Criar conta gratuita →
                                        </a>
                                    </div>
                                </div>
                            </div>

                            {/* Facebook Pixel */}
                            <div className="p-6 bg-gray-50 rounded-xl">
                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-sm">
                                        <svg className="w-6 h-6 text-blue-600" viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M18.77 7.46H14.5v-1.9c0-.9.6-1.1 1-1.1h3V.5h-4.33C10.24.5 9.5 3.44 9.5 5.32v2.15h-3v4h3v12h5v-12h3.85l.42-4z" />
                                        </svg>
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="font-medium text-gray-900">Facebook Pixel</h4>
                                        <p className="text-sm text-gray-500 mb-3">
                                            Rastreie conversões e otimize anúncios no Facebook e Instagram.
                                        </p>
                                        <Input
                                            label="ID do Pixel"
                                            placeholder="1234567890123456"
                                            value={integrationsData.facebook_pixel_id}
                                            onChange={(e) =>
                                                setIntegrationsData({ ...integrationsData, facebook_pixel_id: e.target.value })
                                            }
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Google Tag Manager */}
                            <div className="p-6 bg-gray-50 rounded-xl">
                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-sm">
                                        <svg className="w-6 h-6 text-blue-400" viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M12 2L2 7v10l10 5 10-5V7l-10-5zm0 2.18l6.9 3.45L12 11.09 5.1 7.63 12 4.18zM4 8.82l7 3.5v7.36l-7-3.5V8.82zm9 10.86v-7.36l7-3.5v7.36l-7 3.5z" />
                                        </svg>
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="font-medium text-gray-900">Google Tag Manager</h4>
                                        <p className="text-sm text-gray-500 mb-3">
                                            Gerencie todas as suas tags de marketing em um só lugar.
                                        </p>
                                        <Input
                                            label="ID do Contêiner"
                                            placeholder="GTM-XXXXXXX"
                                            value={integrationsData.gtm_id}
                                            onChange={(e) =>
                                                setIntegrationsData({ ...integrationsData, gtm_id: e.target.value })
                                            }
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="flex justify-end pt-4">
                                <Button onClick={handleSaveIntegrations} isLoading={isPending}>
                                    Salvar Integrações
                                </Button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
