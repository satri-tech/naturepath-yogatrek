export type TopAnalyticType = {
  id: string;
  icon: JSX.Element;
  title: string;
  value: number;
  prefix?: string;
  rate?: number;
  rate_increase?: boolean;
  img: string;
  className?: string;
};