import { Skeleton } from "@/components/ui/skeleton";

export default function ContaLoading() {
    return (
        <div className="p-6 lg:p-8 space-y-6">
            {/* Header */}
            <div>
                <Skeleton className="h-8 w-40 mb-2" />
                <Skeleton className="h-5 w-64" />
            </div>

            {/* Tabs skeleton */}
            <div className="flex gap-4 border-b pb-4">
                <Skeleton className="h-10 w-24" />
                <Skeleton className="h-10 w-24" />
                <Skeleton className="h-10 w-28" />
            </div>

            {/* Form skeleton */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6 space-y-6">
                <div className="space-y-2">
                    <Skeleton className="h-4 w-20" />
                    <Skeleton className="h-10 w-full" />
                </div>
                <div className="space-y-2">
                    <Skeleton className="h-4 w-20" />
                    <Skeleton className="h-10 w-full" />
                </div>
                <div className="space-y-2">
                    <Skeleton className="h-4 w-20" />
                    <Skeleton className="h-10 w-full" />
                </div>
                <Skeleton className="h-12 w-32" />
            </div>
        </div>
    );
}
