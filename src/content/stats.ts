export type Stat = {
  value: number;
  /** text rendered inside the rolling number, e.g. "B" in "2B" */
  unit?: string;
  suffix: string;
  label: string;
};

export const STATS: Stat[] = [
  { value: 150, suffix: "+", label: "Products Shipped" },
  { value: 50, suffix: "+", label: "Global Team Members" },
  { value: 97, suffix: "%", label: "Client Satisfaction" },
  { value: 20, suffix: "+", label: "Industries Served" },
  { value: 48, suffix: "hr", label: "Time to Kickoff" },
  { value: 2, unit: "B", suffix: "+", label: "Client Revenue Influenced" },
];
