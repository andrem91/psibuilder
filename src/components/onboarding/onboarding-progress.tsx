"use client";

import { cn } from "@/lib/utils";
import { Progress } from "@/components/ui/progress";

interface OnboardingProgressProps {
    currentStep: number;
    totalSteps: number;
    steps: { label: string; completed: boolean }[];
}

export function OnboardingProgress({
    currentStep,
    totalSteps,
    steps,
}: OnboardingProgressProps) {
    const progress = Math.round((currentStep / totalSteps) * 100);

    return (
        <div className="mb-8">
            {/* Progress bar */}
            <div className="relative mb-4">
                <Progress
                    value={progress}
                    className="h-2"
                />
                <div className="absolute -top-1 right-0 text-sm font-medium text-gray-500">
                    {progress}%
                </div>
            </div>

            {/* Steps indicators */}
            <div className="flex justify-between">
                {steps.map((step, index) => (
                    <div
                        key={index}
                        className={cn(
                            "flex flex-col items-center",
                            index + 1 <= currentStep ? "opacity-100" : "opacity-40"
                        )}
                    >
                        <div
                            className={cn(
                                "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all",
                                step.completed
                                    ? "bg-green-500 text-white"
                                    : index + 1 === currentStep
                                        ? "bg-indigo-500 text-white"
                                        : "bg-gray-200 text-gray-600"
                            )}
                        >
                            {step.completed ? (
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                            ) : (
                                index + 1
                            )}
                        </div>
                        <span className="text-xs mt-1 text-gray-600 hidden sm:block">
                            {step.label}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}
