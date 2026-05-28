'use client'

export default function ProductDetailError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="container mx-auto px-4 py-24 text-center">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Something went wrong</h2>
      <p className="text-gray-600 mb-8 max-w-md mx-auto">
        We couldn&apos;t load this product. Please try again.
      </p>
      <button
        onClick={reset}
        className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
      >
        Try Again
      </button>
    </div>
  )
}