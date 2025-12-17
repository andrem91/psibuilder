"use client";

import { useState, useTransition } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Field, FieldLabel, FieldError, FieldGroup } from "@/components/ui/field";
import {
    profileSchema,
    securitySchema,
    integrationsSchema,
    type ProfileFormData,
    type SecurityFormData,
    type IntegrationsFormData,
} from "@/lib/schemas/account";

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

type TabId = "profile" | "security" | "integrations";

const tabs = [
    { id: "profile" as TabId, label: "Dados Pessoais", icon: "👤" },
    { id: "security" as TabId, label: "Segurança", icon: "🔒" },
    { id: "integrations" as TabId, label: "Integrações", icon: "🔗" },
];

export function AccountPageClient({ profile, site }: AccountPageClientProps) {
    const [activeTab, setActiveTab] = useState<TabId>("profile");
    const [isPending, startTransition] = useTransition();

    // Profile Form
    const profileForm = useForm<ProfileFormData>({
        resolver: zodResolver(profileSchema),
        defaultValues: {
            full_name: profile.full_name || "",
            email: profile.email || "",
            whatsapp: profile.whatsapp || "",
            crp: profile.crp || "",
        },
    });

    // Security Form
    const securityForm = useForm<SecurityFormData>({
        resolver: zodResolver(securitySchema),
        defaultValues: {
            current_password: "",
            new_password: "",
            confirm_password: "",
        },
    });

    // Integrations Form
    const integrationsForm = useForm<IntegrationsFormData>({
        resolver: zodResolver(integrationsSchema),
        defaultValues: {
            google_analytics_id: site?.google_analytics_id || "",
            clarity_id: site?.clarity_id || "",
            facebook_pixel_id: site?.facebook_pixel_id || "",
            gtm_id: site?.gtm_id || "",
        },
    });

    const handleSaveProfile = async (data: ProfileFormData) => {
        startTransition(async () => {
            try {
                const response = await fetch("/api/account/update-profile", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(data),
                });

                if (!response.ok) {
                    const result = await response.json();
                    throw new Error(result.error || "Erro ao salvar");
                }

                toast.success("Perfil atualizado com sucesso!");
            } catch (err) {
                toast.error(err instanceof Error ? err.message : "Erro ao salvar");
            }
        });
    };

    const handleChangePassword = async (data: SecurityFormData) => {
        startTransition(async () => {
            try {
                const response = await fetch("/api/account/change-password", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        current_password: data.current_password,
                        new_password: data.new_password,
                    }),
                });

                if (!response.ok) {
                    const result = await response.json();
                    throw new Error(result.error || "Erro ao alterar senha");
                }

                toast.success("Senha alterada com sucesso!");
                securityForm.reset();
            } catch (err) {
                toast.error(err instanceof Error ? err.message : "Erro ao alterar senha");
            }
        });
    };

    const handleSaveIntegrations = async (data: IntegrationsFormData) => {
        startTransition(async () => {
            try {
                const response = await fetch("/api/account/update-integrations", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(data),
                });

                if (!response.ok) {
                    const result = await response.json();
                    throw new Error(result.error || "Erro ao salvar");
                }

                toast.success("Integrações salvas com sucesso!");
            } catch (err) {
                toast.error(err instanceof Error ? err.message : "Erro ao salvar");
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
                        <form onSubmit={profileForm.handleSubmit(handleSaveProfile)} className="space-y-6">
                            <div className="grid md:grid-cols-2 gap-6">
                                <Controller
                                    name="full_name"
                                    control={profileForm.control}
                                    render={({ field, fieldState }) => (
                                        <Field data-invalid={fieldState.invalid}>
                                            <FieldLabel htmlFor="full_name">Nome completo</FieldLabel>
                                            <Input id="full_name" aria-invalid={fieldState.invalid} {...field} />
                                            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                                        </Field>
                                    )}
                                />
                                <Controller
                                    name="email"
                                    control={profileForm.control}
                                    render={({ field, fieldState }) => (
                                        <Field data-invalid={fieldState.invalid}>
                                            <FieldLabel htmlFor="email">E-mail</FieldLabel>
                                            <Input id="email" type="email" aria-invalid={fieldState.invalid} {...field} />
                                            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                                        </Field>
                                    )}
                                />
                            </div>

                            <div className="grid md:grid-cols-2 gap-6">
                                <Controller
                                    name="whatsapp"
                                    control={profileForm.control}
                                    render={({ field, fieldState }) => (
                                        <Field data-invalid={fieldState.invalid}>
                                            <FieldLabel htmlFor="whatsapp">WhatsApp</FieldLabel>
                                            <Input id="whatsapp" placeholder="(11) 99999-9999" aria-invalid={fieldState.invalid} {...field} />
                                            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                                        </Field>
                                    )}
                                />
                                <Controller
                                    name="crp"
                                    control={profileForm.control}
                                    render={({ field, fieldState }) => (
                                        <Field data-invalid={fieldState.invalid}>
                                            <FieldLabel htmlFor="crp">CRP</FieldLabel>
                                            <Input id="crp" placeholder="00/00000" aria-invalid={fieldState.invalid} {...field} />
                                            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                                        </Field>
                                    )}
                                />
                            </div>

                            <div className="flex justify-end pt-4">
                                <Button type="submit" isLoading={isPending}>
                                    Salvar Alterações
                                </Button>
                            </div>
                        </form>
                    )}

                    {/* Tab Segurança */}
                    {activeTab === "security" && (
                        <form onSubmit={securityForm.handleSubmit(handleChangePassword)} className="space-y-6 max-w-md">
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                                    Alterar Senha
                                </h3>
                                <p className="text-sm text-gray-500 mb-6">
                                    Para sua segurança, escolha uma senha forte com pelo menos 6 caracteres.
                                </p>
                            </div>

                            <FieldGroup>
                                <Controller
                                    name="current_password"
                                    control={securityForm.control}
                                    render={({ field, fieldState }) => (
                                        <Field data-invalid={fieldState.invalid}>
                                            <FieldLabel htmlFor="current_password">Senha atual</FieldLabel>
                                            <Input id="current_password" type="password" aria-invalid={fieldState.invalid} {...field} />
                                            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                                        </Field>
                                    )}
                                />

                                <Controller
                                    name="new_password"
                                    control={securityForm.control}
                                    render={({ field, fieldState }) => (
                                        <Field data-invalid={fieldState.invalid}>
                                            <FieldLabel htmlFor="new_password">Nova senha</FieldLabel>
                                            <Input id="new_password" type="password" aria-invalid={fieldState.invalid} {...field} />
                                            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                                        </Field>
                                    )}
                                />

                                <Controller
                                    name="confirm_password"
                                    control={securityForm.control}
                                    render={({ field, fieldState }) => (
                                        <Field data-invalid={fieldState.invalid}>
                                            <FieldLabel htmlFor="confirm_password">Confirmar nova senha</FieldLabel>
                                            <Input id="confirm_password" type="password" aria-invalid={fieldState.invalid} {...field} />
                                            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                                        </Field>
                                    )}
                                />
                            </FieldGroup>

                            <div className="flex justify-end pt-4">
                                <Button type="submit" isLoading={isPending}>
                                    Alterar Senha
                                </Button>
                            </div>
                        </form>
                    )}

                    {/* Tab Integrações */}
                    {activeTab === "integrations" && (
                        <form onSubmit={integrationsForm.handleSubmit(handleSaveIntegrations)} className="space-y-8">
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
                                        <Controller
                                            name="google_analytics_id"
                                            control={integrationsForm.control}
                                            render={({ field, fieldState }) => (
                                                <Field data-invalid={fieldState.invalid}>
                                                    <FieldLabel htmlFor="google_analytics_id">ID de Medição</FieldLabel>
                                                    <Input id="google_analytics_id" placeholder="G-XXXXXXXXXX" aria-invalid={fieldState.invalid} {...field} />
                                                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                                                </Field>
                                            )}
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
                                        <Controller
                                            name="clarity_id"
                                            control={integrationsForm.control}
                                            render={({ field, fieldState }) => (
                                                <Field data-invalid={fieldState.invalid}>
                                                    <FieldLabel htmlFor="clarity_id">ID do Projeto</FieldLabel>
                                                    <Input id="clarity_id" placeholder="xxxxxxxxxx" aria-invalid={fieldState.invalid} {...field} />
                                                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                                                </Field>
                                            )}
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
                                        <Controller
                                            name="facebook_pixel_id"
                                            control={integrationsForm.control}
                                            render={({ field, fieldState }) => (
                                                <Field data-invalid={fieldState.invalid}>
                                                    <FieldLabel htmlFor="facebook_pixel_id">ID do Pixel</FieldLabel>
                                                    <Input id="facebook_pixel_id" placeholder="1234567890123456" aria-invalid={fieldState.invalid} {...field} />
                                                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                                                </Field>
                                            )}
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
                                        <Controller
                                            name="gtm_id"
                                            control={integrationsForm.control}
                                            render={({ field, fieldState }) => (
                                                <Field data-invalid={fieldState.invalid}>
                                                    <FieldLabel htmlFor="gtm_id">ID do Contêiner</FieldLabel>
                                                    <Input id="gtm_id" placeholder="GTM-XXXXXXX" aria-invalid={fieldState.invalid} {...field} />
                                                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                                                </Field>
                                            )}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="flex justify-end pt-4">
                                <Button type="submit" isLoading={isPending}>
                                    Salvar Integrações
                                </Button>
                            </div>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
}
