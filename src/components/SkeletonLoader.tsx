interface SkeletonLoaderProps {
  className?: string;
  variant?: "text" | "card" | "image" | "circle";
}

export function SkeletonLoader({
  className = "",
  variant = "text",
}: SkeletonLoaderProps) {
  const base =
    "animate-pulse bg-slate-200 dark:bg-slate-700 rounded-md motion-reduce:animate-none";

  const variants = {
    text: "h-4 w-full",
    card: "h-48 w-full rounded-xl",
    image: "h-40 w-full rounded-lg",
    circle: "h-24 w-24 rounded-full",
  };

  return (
    <div
      className={`${base} ${variants[variant]} ${className}`}
      aria-hidden="true"
      role="presentation"
    />
  );
}

export function ProjectCardSkeleton() {
  return (
    <article className="rounded-xl border border-slate-200 bg-white p-6 dark:border-slate-700 dark:bg-surface-card">
      <SkeletonLoader variant="image" className="mb-4" />
      <SkeletonLoader className="mb-2 h-6 w-3/4" />
      <SkeletonLoader className="mb-4 h-4 w-full" />
      <div className="flex gap-2">
        <SkeletonLoader className="h-6 w-16" />
        <SkeletonLoader className="h-6 w-16" />
        <SkeletonLoader className="h-6 w-16" />
      </div>
    </article>
  );
}

export function ProjectPageSkeleton() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-16">
      <SkeletonLoader className="mb-4 h-8 w-1/3" />
      <SkeletonLoader variant="image" className="mb-8 h-64" />
      <SkeletonLoader className="mb-3 h-4 w-full" />
      <SkeletonLoader className="mb-3 h-4 w-full" />
      <SkeletonLoader className="mb-3 h-4 w-2/3" />
    </div>
  );
}
