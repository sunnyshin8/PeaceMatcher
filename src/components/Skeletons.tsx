export function CardSkeleton() {
    return (
        <div className="bg-white rounded-2xl border border-gray-100 p-6 animate-pulse">
            <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-gray-200" />
                <div className="flex-1">
                    <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
                    <div className="h-3 bg-gray-100 rounded w-1/2" />
                </div>
            </div>
            <div className="space-y-2">
                <div className="h-3 bg-gray-100 rounded w-full" />
                <div className="h-3 bg-gray-100 rounded w-5/6" />
                <div className="h-3 bg-gray-100 rounded w-2/3" />
            </div>
        </div>
    );
}

export function StatSkeleton() {
    return (
        <div className="bg-white rounded-2xl border border-gray-100 p-5 animate-pulse">
            <div className="flex items-center justify-between mb-3">
                <div className="w-11 h-11 rounded-xl bg-gray-200" />
                <div className="w-14 h-5 rounded-lg bg-gray-200" />
            </div>
            <div className="h-7 bg-gray-200 rounded w-1/3 mb-2" />
            <div className="h-4 bg-gray-100 rounded w-2/3" />
        </div>
    );
}

export function ChartSkeleton() {
    return (
        <div className="bg-white rounded-2xl border border-gray-100 p-6 animate-pulse">
            <div className="h-5 bg-gray-200 rounded w-1/3 mb-4" />
            <div className="h-48 bg-gray-100 rounded-xl flex items-end justify-around px-4 pb-4">
                {[40, 65, 45, 80, 55, 30, 70].map((h, i) => (
                    <div key={i} className="w-8 bg-gray-200 rounded-t" style={{ height: `${h}%` }} />
                ))}
            </div>
        </div>
    );
}

export function ListSkeleton({ rows = 5 }: { rows?: number }) {
    return (
        <div className="bg-white rounded-2xl border border-gray-100 p-5 animate-pulse space-y-3">
            <div className="h-5 bg-gray-200 rounded w-1/4 mb-3" />
            {Array.from({ length: rows }).map((_, i) => (
                <div key={i} className="flex items-center gap-3 p-2">
                    <div className="w-8 h-8 rounded-full bg-gray-200 flex-shrink-0" />
                    <div className="flex-1">
                        <div className="h-3.5 bg-gray-200 rounded w-3/4 mb-1.5" />
                        <div className="h-3 bg-gray-100 rounded w-1/2" />
                    </div>
                </div>
            ))}
        </div>
    );
}

export function PageSkeleton() {
    return (
        <div className="min-h-screen bg-[#f8faf9] py-6 px-4">
            <div className="max-w-7xl mx-auto">
                {/* Title skeleton */}
                <div className="animate-pulse mb-6">
                    <div className="h-8 bg-gray-200 rounded w-1/3 mb-2" />
                    <div className="h-4 bg-gray-100 rounded w-1/2" />
                </div>
                {/* Stats row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                    {[1, 2, 3, 4].map(i => <StatSkeleton key={i} />)}
                </div>
                {/* Charts */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <ChartSkeleton />
                    <ListSkeleton />
                </div>
            </div>
        </div>
    );
}
