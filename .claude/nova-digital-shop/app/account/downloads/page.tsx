import Link from 'next/link'

export default function DownloadsPage() {
  return (
    <div className="container mx-auto px-4 py-16 text-center">
      <h1 className="text-3xl font-bold text-gray-900 mb-4">My Downloads</h1>
      <div className="max-w-md mx-auto bg-white border border-gray-200 rounded-lg p-8">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-12 h-12 text-gray-400 mx-auto mb-4"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"
          />
        </svg>
        <p className="text-gray-600 mb-6">
          Sign in to view and download your purchased products.
        </p>
        <p className="text-sm text-gray-500 mb-6">
          After purchasing, your downloads will appear here. You&apos;ll also receive a download
          link via email.
        </p>
        <Link
          href="/products"
          className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
        >
          Browse Products
        </Link>
      </div>
    </div>
  )
}