// src/app/error.tsx
'use client'

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error
  reset: () => void
}) {
  return (
    <div className="text-center py-20">
      <h2 className="text-xl text-red-600 mb-4">發生錯誤: {error.message}</h2>
      <button
        onClick={reset}
        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
      >
        重試
      </button>
    </div>
  )
}
