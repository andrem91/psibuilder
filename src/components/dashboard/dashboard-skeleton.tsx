"use client";

import { Skeleton } from "@/components/ui/skeleton";

export function DashboardCardSkeleton() {
    return (
        <div className="bg-white rounded-2xl border border-gray-200 p-6">
            {/* Ícone */}
            <Skeleton className="w-12 h-12 rounded-xl mb-4" />

            {/* Título */}
            <Skeleton className="h-6 w-3/4 mb-2" />

            {/* Descrição */}
            <Skeleton className="h-4 w-full mb-1" />
            <Skeleton className="h-4 w-2/3 mb-4" />

            {/* Botão */}
            <Skeleton className="h-10 w-32" />
        </div>
    );
}

export function DashboardGridSkeleton() {
    return (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <DashboardCardSkeleton />
            <DashboardCardSkeleton />
            <DashboardCardSkeleton />
        </div>
    );
}
