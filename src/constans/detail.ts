export const PAID_TYPES = ["rent", "buy"] as const;

export const TYPE_LABELS = {
  rent: "대여",
  buy: "구매",
  subscription: "구독",
  free: "무료",
  movie: "영화",
  series: "시리즈",
} as const;

export const REVIEW_PAGE_SIZE = 20;
