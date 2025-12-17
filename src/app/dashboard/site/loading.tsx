import { Skeleton } from "@/components/ui/skeleton";

export default function SiteLoading() {
    return (
        <div className="p-6 lg:p-8 space-y-6">
            {/* Tabs skeleton */}
            <div className="flex gap-2 border-b">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                    <Skeleton key={i} className="h-10 w-24" />
                ))}
            </div>

            {/* Content skeleton */}
            <div className="space-y-6">
                <div className="bg-white rounded-2xl border border-gray-200 p-6 space-y-4">
                    <Skeleton className="h-6 w-48 mb-4" />

                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <Skeleton className="h-4 w-24" />
                            <Skeleton className="h-10 w-full" />
                        </div>
                        <div className="space-y-2">
                            <Skeleton className="h-4 w-24" />
                            <Skeleton className="h-10 w-full" />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Skeleton className="h-4 w-32" />
                        <Skeleton className="h-24 w-full" />
                    </div>
                </div>

                <Skeleton className="h-12 w-full" />
            </div>
        </div>
    );
}
