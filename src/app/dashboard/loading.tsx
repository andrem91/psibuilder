import { Skeleton } from "@/components/ui/skeleton";

export default function DashboardLoading() {
    return (
        <div className="p-6 lg:p-8 space-y-6">
            {/* Header skeleton */}
            <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl p-8">
                <div className="flex justify-between items-start">
                    <div className="space-y-3">
                        <Skeleton className="h-8 w-48 bg-white/20" />
                        <Skeleton className="h-5 w-64 bg-white/20" />
                    </div>
                    <Skeleton className="h-10 w-28 bg-white/20" />
                </div>
                <div className="mt-4">
                    <Skeleton className="h-2 w-full bg-white/20" />
                </div>
            </div>

            {/* Cards skeleton */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3].map((i) => (
                    <div key={i} className="bg-white rounded-2xl border border-gray-200 p-6">
                        <Skeleton className="w-12 h-12 rounded-xl mb-4" />
                        <Skeleton className="h-6 w-3/4 mb-2" />
                        <Skeleton className="h-4 w-full mb-1" />
                        <Skeleton className="h-4 w-2/3 mb-4" />
                        <Skeleton className="h-10 w-32" />
                    </div>
                ))}
            </div>
        </div>
    );
}
