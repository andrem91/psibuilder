"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { OnboardingProgress } from "./onboarding-progress";
import { saveOnboardingStep, completeOnboarding } from "@/app/dashboard/onboarding/actions";

// Especialidades disponíveis
const SPECIALTIES = [
    "Ansiedade",
    "Depressão",
    "Terapia de Casal",
    "Terapia Familiar",
    "Luto",
    "Autoestima",
    "Estresse",
    "TDAH",
    "Autismo",
    "Infantil",
    "Adolescentes",
    "Carreira",
    "Transtornos Alimentares",
    "Dependência Química",
] as const;

interface OnboardingWizardProps {
    initialData?: {
        full_name?: string;
        crp?: string;
        whatsapp?: string;
        bio?: string;
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
        specialties: initialData?.specialties || [],
    });

    const totalSteps = 4;

    const steps = [
        { label: "Dados", completed: currentStep > 1 },
        { label: "CRP", completed: currentStep > 2 },
        { label: "Especialidades", completed: currentStep > 3 },
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
            case 3:
                if (formData.specialties.length === 0) {
                    setError("Selecione pelo menos uma especialidade");
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

    // Toggle especialidade
    const toggleSpecialty = (specialty: string) => {
        setFormData((prev) => ({
            ...prev,
            specialties: prev.specialties.includes(specialty)
                ? prev.specialties.filter((s) => s !== specialty)
                : [...prev.specialties, specialty],
        }));
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

            {/* Step 3: Especialidades */}
            {currentStep === 3 && (
                <div className="space-y-6">
                    <div className="text-center mb-8">
                        <h2 className="text-2xl font-bold text-gray-900">
                            Suas especialidades 💼
                        </h2>
                        <p className="text-gray-500 mt-2">
                            Selecione as áreas em que você atua ou adicione outras
                        </p>
                    </div>

                    {/* Sugestões de especialidades */}
                    <div>
                        <p className="text-sm font-medium text-gray-700 mb-3">
                            Sugestões (clique para selecionar):
                        </p>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                            {SPECIALTIES.map((specialty) => {
                                const isSelected = formData.specialties.includes(specialty);
                                return (
                                    <button
                                        key={specialty}
                                        type="button"
                                        onClick={() => toggleSpecialty(specialty)}
                                        className={`p-3 rounded-xl border-2 text-sm font-medium transition-all ${isSelected
                                            ? "border-indigo-500 bg-indigo-50 text-indigo-700"
                                            : "border-gray-200 hover:border-gray-300 text-gray-600"
                                            }`}
                                    >
                                        {specialty}
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* Campo para adicionar especialidade customizada */}
                    <div>
                        <p className="text-sm font-medium text-gray-700 mb-2">
                            Adicionar outra especialidade:
                        </p>
                        <div className="flex gap-2">
                            <input
                                type="text"
                                id="custom-specialty"
                                placeholder="Ex: Psicologia do Idoso, Perinatal..."
                                className="flex-1 px-4 py-2 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") {
                                        e.preventDefault();
                                        const input = e.target as HTMLInputElement;
                                        const value = input.value.trim();
                                        if (value && !formData.specialties.includes(value)) {
                                            setFormData((prev) => ({
                                                ...prev,
                                                specialties: [...prev.specialties, value],
                                            }));
                                            input.value = "";
                                        }
                                    }
                                }}
                            />
                            <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={() => {
                                    const input = document.getElementById("custom-specialty") as HTMLInputElement;
                                    const value = input?.value.trim();
                                    if (value && !formData.specialties.includes(value)) {
                                        setFormData((prev) => ({
                                            ...prev,
                                            specialties: [...prev.specialties, value],
                                        }));
                                        input.value = "";
                                    }
                                }}
                            >
                                Adicionar
                            </Button>
                        </div>
                    </div>

                    {/* Especialidades selecionadas */}
                    {formData.specialties.length > 0 && (
                        <div>
                            <p className="text-sm font-medium text-gray-700 mb-2">
                                Suas especialidades ({formData.specialties.length}):
                            </p>
                            <div className="flex flex-wrap gap-2">
                                {formData.specialties.map((specialty) => (
                                    <span
                                        key={specialty}
                                        className="inline-flex items-center gap-1 px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm"
                                    >
                                        {specialty}
                                        <button
                                            type="button"
                                            onClick={() => toggleSpecialty(specialty)}
                                            className="hover:text-indigo-900"
                                        >
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                            </svg>
                                        </button>
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            )}

            {/* Step 4: Bio */}
            {currentStep === 4 && (
                <div className="space-y-6">
                    <div className="text-center mb-8">
                        <h2 className="text-2xl font-bold text-gray-900">
                            Quase lá! ✨
                        </h2>
                        <p className="text-gray-500 mt-2">
                            Escreva uma breve apresentação sobre você
                        </p>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Sobre mim
                        </label>
                        <textarea
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 resize-none"
                            rows={5}
                            placeholder="Conte um pouco sobre sua formação, experiência e abordagem terapêutica..."
                            value={formData.bio}
                            onChange={(e) =>
                                setFormData({ ...formData, bio: e.target.value })
                            }
                        />
                        <p className="text-sm text-gray-500 mt-2">
                            {formData.bio.length}/500 caracteres
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
