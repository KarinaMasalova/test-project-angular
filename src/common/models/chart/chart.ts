export interface ChartOptions {
  responsive: boolean;
}

export interface ChartColors {
  backgroundColor: string | string[];
  hoverBackgroundColor: string | string[];
  borderColor: string;
  borderWidth: number;
}

export interface ChartDatasets {
  data: number[];
  label: string;
}
