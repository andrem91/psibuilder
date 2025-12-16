"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RichTextEditor } from "@/components/ui/rich-text-editor";
import { OnboardingProgress } from "./onboarding-progress";
import { saveOnboardingStep, completeOnboarding } from "@/app/dashboard/onboarding/actions";

// Especialidades disponíveis - não mais usadas no onboarding
// Agora são pré-populadas automaticamente e editadas no Dashboard

interface OnboardingWizardProps {
    initialData?: {
        full_name?: string;
        crp?: string;
        whatsapp?: string;
        bio?: string;
        bio_short?: string;
        specialties?: string[];
    };
    profileId: string;
}

export function OnboardingWizard({ initialData, profileId }: OnboardingWizardProps) {
    const router = useRouter();
    const [isPending, startTransition] = useTransition();
    const [currentStep, setCurrentStep] = useState(1);
    const [error, setError] = useState<string | null>(null);

    // Form data
    const [formData, setFormData] = useState({
        full_name: initialData?.full_name || "",
        crp: initialData?.crp || "",
        whatsapp: initialData?.whatsapp || "",
        bio: initialData?.bio || "",
        bio_short: initialData?.bio_short || "",
        specialties: initialData?.specialties || [],
    });

    const totalSteps = 3;

    const steps = [
        { label: "Dados", completed: currentStep > 1 },
        { label: "CRP", completed: currentStep > 2 },
        { label: "Finalizar", completed: false },
    ];

    // Validação por step
    const validateStep = (): boolean => {
        setError(null);

        switch (currentStep) {
            case 1:
                if (!formData.full_name.trim()) {
                    setError("Por favor, informe seu nome completo");
                    return false;
                }
                if (!formData.whatsapp.trim()) {
                    setError("Por favor, informe seu WhatsApp");
                    return false;
                }
                return true;
            case 2:
                if (!formData.crp.trim()) {
                    setError("Por favor, informe seu CRP");
                    return false;
                }
                // Validação básica de formato CRP (XX/XXXXX)
                if (!/^\d{2}\/\d{4,6}$/.test(formData.crp)) {
                    setError("Formato do CRP inválido. Use: 06/12345");
                    return false;
                }
                return true;
            default:
                return true;
        }
    };

    // Próximo passo
    const handleNext = async () => {
        if (!validateStep()) return;

        // Salvar dados do step atual
        startTransition(async () => {
            const result = await saveOnboardingStep(profileId, formData);
            if (result.error) {
                setError(result.error);
                return;
            }

            if (currentStep < totalSteps) {
                setCurrentStep(currentStep + 1);
            }
        });
    };

    // Finalizar onboarding
    const handleComplete = async () => {
        if (!formData.bio.trim()) {
            setError("Por favor, escreva uma breve descrição sobre você");
            return;
        }

        startTransition(async () => {
            const result = await completeOnboarding(profileId, formData);
            if (result.error) {
                setError(result.error);
                return;
            }

            // Redirecionar para o dashboard com mensagem de sucesso
            router.push("/dashboard?onboarding=complete");
        });
    };

    return (
        <div className="max-w-2xl mx-auto">
            <OnboardingProgress
                currentStep={currentStep}
                totalSteps={totalSteps}
                steps={steps}
            />

            {/* Error message */}
            {error && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-600 rounded-lg text-sm">
                    {error}
                </div>
            )}

            {/* Step 1: Dados básicos */}
            {currentStep === 1 && (
                <div className="space-y-6">
                    <div className="text-center mb-8">
                        <h2 className="text-2xl font-bold text-gray-900">
                            Vamos começar! 👋
                        </h2>
                        <p className="text-gray-500 mt-2">
                            Primeiro, nos conte um pouco sobre você
                        </p>
                    </div>

                    <Input
                        label="Nome completo"
                        placeholder="Dr(a). Maria Silva"
                        value={formData.full_name}
                        onChange={(e) =>
                            setFormData({ ...formData, full_name: e.target.value })
                        }
                    />

                    <Input
                        label="WhatsApp"
                        placeholder="11999999999"
                        value={formData.whatsapp}
                        onChange={(e) =>
                            setFormData({ ...formData, whatsapp: e.target.value })
                        }
                    />
                </div>
            )}

            {/* Step 2: CRP */}
            {currentStep === 2 && (
                <div className="space-y-6">
                    <div className="text-center mb-8">
                        <h2 className="text-2xl font-bold text-gray-900">
                            Seu registro profissional 📋
                        </h2>
                        <p className="text-gray-500 mt-2">
                            Informe seu CRP para validarmos seu cadastro
                        </p>
                    </div>

                    <Input
                        label="Número do CRP"
                        placeholder="06/12345"
                        value={formData.crp}
                        onChange={(e) =>
                            setFormData({ ...formData, crp: e.target.value })
                        }
                    />

                    <p className="text-sm text-gray-500">
                        O CRP será exibido no seu site para transmitir credibilidade aos pacientes.
                    </p>
                </div>
            )}

            {/* Step 3: Bio */}
            {currentStep === 3 && (
                <div className="space-y-6">
                    <div className="text-center mb-8">
                        <h2 className="text-2xl font-bold text-gray-900">
                            Quase lá! ✨
                        </h2>
                        <p className="text-gray-500 mt-2">
                            Escreva sua apresentação para os pacientes
                        </p>
                    </div>

                    {/* Frase de apresentação */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Frase de apresentação (exibida no topo do site)
                        </label>
                        <Input
                            placeholder="Ex: Psicóloga especialista em ansiedade e autoestima"
                            value={formData.bio_short}
                            onChange={(e) =>
                                setFormData({ ...formData, bio_short: e.target.value })
                            }
                        />
                        <p className="text-sm text-gray-500 mt-1">
                            Uma frase curta que resume sua atuação (máx. 150 caracteres)
                        </p>
                    </div>

                    {/* Sobre mim completo */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Sobre mim (texto completo com formatação)
                        </label>
                        <div className="border border-gray-300 rounded-xl overflow-hidden">
                            <RichTextEditor
                                content={formData.bio}
                                onChange={(html) =>
                                    setFormData({ ...formData, bio: html })
                                }
                                placeholder="Conte um pouco sobre sua formação, experiência e abordagem terapêutica..."
                            />
                        </div>
                        <p className="text-sm text-gray-500 mt-2">
                            Use os controles acima para formatar o texto com negrito, itálico, listas, etc.
                        </p>
                    </div>
                </div>
            )}

            {/* Navigation buttons */}
            <div className="flex justify-between mt-8">
                {currentStep > 1 && (
                    <Button
                        type="button"
                        variant="outline"
                        onClick={() => setCurrentStep(currentStep - 1)}
                        disabled={isPending}
                    >
                        Voltar
                    </Button>
                )}

                <div className="ml-auto">
                    {currentStep < totalSteps ? (
                        <Button
                            type="button"
                            onClick={handleNext}
                            isLoading={isPending}
                        >
                            Próximo
                        </Button>
                    ) : (
                        <Button
                            type="button"
                            onClick={handleComplete}
                            isLoading={isPending}
                            className="bg-green-600 hover:bg-green-700"
                        >
                            Criar meu site! 🚀
                        </Button>
                    )}
                </div>
            </div>
        </div>
    );
}
