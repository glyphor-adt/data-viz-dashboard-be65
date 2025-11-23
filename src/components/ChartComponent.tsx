import React from 'react';
import {
  ComposedChart,
  Line,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Area,
} from 'recharts'; // Recharts is being used.  Install with: npm install recharts

interface ChartData {
  name: string;
  value: number;
  value2?: number;
  value3?: number;
}

interface ChartComponentProps {
  data: ChartData[];
  chartType: 'line' | 'bar' | 'area' | 'composed';
  xAxisKey: string;
  yAxisKey: string;
  additionalSeries?: {
    key: string;
    type: 'line' | 'bar' | 'area';
    color: string;
  }[];
}

const ChartComponent: React.FC<ChartComponentProps> = ({
  data,
  chartType,
  xAxisKey,
  yAxisKey,
  additionalSeries = [],
}) => {
  const renderChart = () => {
    switch (chartType) {
      case 'line':
        return (
          <Line
            type="monotone"
            dataKey={yAxisKey}
            stroke="var(--primary)"
            strokeWidth={2}
          />
        );
      case 'bar':
        return (
          <Bar dataKey={yAxisKey} fill="var(--primary)" />
        );
      case 'area':
        return (
          <Area
            type="monotone"
            dataKey={yAxisKey}
            stroke="var(--primary)"
            fill="var(--primary)/20"
          />
        );
      case 'composed':
        return (
          <>
            <Line
              type="monotone"
              dataKey={yAxisKey}
              stroke="var(--primary)"
              strokeWidth={2}
            />
             {additionalSeries.map((series) => {
               switch (series.type) {
                 case 'line':
                   return (
                     <Line key={series.key} type="monotone" dataKey={series.key} stroke={series.color} strokeWidth={2} />
                   );
                 case 'bar':
                   return (
                     <Bar key={series.key} dataKey={series.key} fill={series.color} />
                   );
                 case 'area':
                   return (
                     <Area key={series.key} type="monotone" dataKey={series.key} stroke={series.color} fill={`${series.color}/20`} />
                   );
                 default:
                   return null;
               }
             })}
          </>
        );
      default:
        return null;
    }
  };

  return (
    <ResponsiveContainer width="100%" height={400}>
      <ComposedChart data={data}>
        <CartesianGrid stroke="var(--border)" />
        <XAxis dataKey={xAxisKey} stroke="var(--muted-foreground)"/>
        <YAxis stroke="var(--muted-foreground)"/>
        <Tooltip contentStyle={{backgroundColor: 'var(--background)', color: 'var(--foreground)'}}/>
        <Legend wrapperStyle={{ color: 'var(--foreground)' }} />
        {renderChart()}
      </ComposedChart>
    </ResponsiveContainer>
  );
};

export default ChartComponent;