export default function ProductDetailLoading() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="grid md:grid-cols-2 gap-12">
        <div className="space-y-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="aspect-video bg-gray-200 rounded-lg animate-pulse" />
          ))}
        </div>
        <div className="space-y-4">
          <div className="h-10 w-3/4 bg-gray-200 rounded animate-pulse" />
          <div className="h-8 w-1/4 bg-gray-200 rounded animate-pulse" />
          <div className="space-y-2">
            <div className="h-4 w-full bg-gray-200 rounded animate-pulse" />
            <div className="h-4 w-5/6 bg-gray-200 rounded animate-pulse" />
            <div className="h-4 w-2/3 bg-gray-200 rounded animate-pulse" />
          </div>
          <div className="h-12 w-full bg-gray-200 rounded-lg animate-pulse mt-6" />
        </div>
      </div>
    </div>
  )
}