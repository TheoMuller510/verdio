export const ChallengeCardSkeleton = () => {
  return (
    <div className="card bg-base-100 shadow-md" aria-hidden="true">
      <div className="card-body">
        {/* en-tête : icône + titre */}
        <div className="flex items-center gap-3 mb-1">
          <div className="skeleton h-10 w-10 rounded-full shrink-0"></div>
          <div className="skeleton h-5 w-32"></div>
        </div>

        {/* description */}
        <div className="skeleton h-4 w-3/4"></div>
        <div className="skeleton h-4 w-3/4"></div>

        {/* badges */}
        <div className="flex gap-2 mt-3">
          <div className="skeleton h-6 w-16"></div>
          <div className="skeleton h-6 w-16"></div>
        </div>
      </div>
    </div>
  )
}
