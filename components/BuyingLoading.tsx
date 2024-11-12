import React from 'react'

const BuyingLoading = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-90 z-50">
      <div className="relative flex flex-col items-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-purple-500 border-opacity-75"></div>
        <p className="text-purple-500 mt-4 text-lg font-semibold">Loading...</p>
      </div>
    </div>
  )
}

export default BuyingLoading