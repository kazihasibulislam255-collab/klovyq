import { Star } from 'lucide-react';

interface StarRatingProps {
  rating: number;
  size?: number;
  showValue?: boolean;
  reviewCount?: number;
}

export default function StarRating({ rating, size = 14, showValue = false, reviewCount }: StarRatingProps) {
  return (
    <div className="flex items-center gap-1">
      <div className="flex items-center">
        {[1, 2, 3, 4, 5].map(star => (
          <Star
            key={star}
            size={size}
            className={
              star <= Math.floor(rating)
                ? 'fill-gold-400 text-gold-400'
                : star <= rating
                ? 'fill-gold-200 text-gold-400'
                : 'text-ink-200'
            }
          />
        ))}
      </div>
      {showValue && (
        <span className="text-xs font-medium text-ink-500 ml-1">
          {rating.toFixed(1)}
          {reviewCount !== undefined && ` (${reviewCount})`}
        </span>
      )}
    </div>
  );
}
