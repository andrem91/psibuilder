"use client";

import { Skeleton } from "@/components/ui/skeleton";

export function BlogListSkeleton() {
    return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="divide-y divide-gray-100">
                {[1, 2, 3].map((i) => (
                    <div key={i} className="p-6">
                        <div className="flex gap-6">
                            {/* Imagem skeleton */}
                            <Skeleton className="w-32 h-24 rounded-lg flex-shrink-0" />

                            <div className="flex-1 space-y-3">
                                {/* Badge skeleton */}
                                <Skeleton className="h-5 w-20" />

                                {/* Título skeleton */}
                                <Skeleton className="h-6 w-3/4" />

                                {/* Excerpt skeleton */}
                                <Skeleton className="h-4 w-full" />
                                <Skeleton className="h-4 w-2/3" />

                                {/* Data skeleton */}
                                <Skeleton className="h-4 w-24" />
                            </div>

                            {/* Actions skeleton */}
                            <div className="flex items-start gap-2">
                                <Skeleton className="w-9 h-9 rounded" />
                                <Skeleton className="w-9 h-9 rounded" />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
