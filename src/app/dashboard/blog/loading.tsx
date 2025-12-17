import { Skeleton } from "@/components/ui/skeleton";

export default function BlogLoading() {
    return (
        <div className="p-6 lg:p-8 space-y-6">
            {/* Header */}
            <div className="flex justify-between items-center">
                <div>
                    <Skeleton className="h-8 w-32 mb-2" />
                    <Skeleton className="h-5 w-64" />
                </div>
                <Skeleton className="h-10 w-36" />
            </div>

            {/* Blog list skeleton */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="divide-y divide-gray-100">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="p-6">
                            <div className="flex gap-6">
                                <Skeleton className="w-32 h-24 rounded-lg flex-shrink-0" />
                                <div className="flex-1 space-y-3">
                                    <Skeleton className="h-5 w-20" />
                                    <Skeleton className="h-6 w-3/4" />
                                    <Skeleton className="h-4 w-full" />
                                    <Skeleton className="h-4 w-24" />
                                </div>
                                <div className="flex items-start gap-2">
                                    <Skeleton className="w-9 h-9 rounded" />
                                    <Skeleton className="w-9 h-9 rounded" />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
