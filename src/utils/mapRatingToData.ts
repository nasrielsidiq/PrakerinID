import { DataPieChart } from "@/components/Charts/PieChartCompenent";
import { RatingSummary } from "@/models/feedback";

export const mapRatingToData = (
  summary: RatingSummary,
  color: string[]
): DataPieChart[] =>   {
  return [1, 2, 3, 4, 5].map((num, i) => ({
    name: `Bintang ${num}`,
    value: summary[`rating_${num}` as keyof RatingSummary],
    color: color[i],
  }));
};
