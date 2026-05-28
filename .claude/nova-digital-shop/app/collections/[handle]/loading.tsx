export default function CollectionLoading() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="h-4 w-24 bg-gray-200 rounded mb-4 animate-pulse" />
      <div className="h-10 w-64 bg-gray-200 rounded mb-4 animate-pulse" />
      <div className="h-6 w-96 bg-gray-200 rounded mb-8 animate-pulse" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="border border-gray-200 rounded-lg overflow-hidden">
            <div className="aspect-video bg-gray-200 animate-pulse" />
            <div className="p-4 space-y-2">
              <div className="h-5 w-3/4 bg-gray-200 rounded animate-pulse" />
              <div className="h-4 w-full bg-gray-200 rounded animate-pulse" />
              <div className="h-4 w-1/4 bg-gray-200 rounded animate-pulse" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}