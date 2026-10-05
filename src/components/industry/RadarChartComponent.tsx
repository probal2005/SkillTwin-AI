import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer, Legend } from 'recharts';
import type { IndustryTrend } from '@/types';

interface RadarChartComponentProps {
  data: IndustryTrend[];
}

export function RadarChartComponent({ data }: RadarChartComponentProps) {
  const chartData = data.flatMap((cat) =>
    cat.skills.map((s) => ({
      subject: s.name,
      High: cat.category === 'High Demand' ? s.level : 0,
      Emerging: cat.category === 'Emerging' ? s.level : 0,
      Core: cat.category === 'Core Analyst' ? s.level : 0,
    })),
  ).reduce((acc: Record<string, any>[], curr) => {
    const existing = acc.find((a) => a.subject === curr.subject);
    if (existing) {
      existing.High = existing.High || curr.High;
      existing.Emerging = existing.Emerging || curr.Emerging;
      existing.Core = existing.Core || curr.Core;
    } else {
      acc.push(curr);
    }
    return acc;
  }, []);

  return (
    <div style={{ width: '100%', height: 400 }}>
      <ResponsiveContainer>
        <RadarChart data={chartData} margin={{ top: 20, right: 30, left: 30, bottom: 10 }}>
          <PolarGrid stroke="rgba(255,255,255,0.08)" />
          <PolarAngleAxis
            dataKey="subject"
            tick={{ fill: 'rgba(255,255,255,0.5)', fontSize: 11 }}
          />
          <PolarRadiusAxis
            domain={[0, 100]}
            tick={{ fill: 'rgba(255,255,255,0.2)', fontSize: 9 }}
            axisLine={false}
          />
          <Radar
            name="High Demand"
            dataKey="High"
            stroke="#6366f1"
            fill="#6366f1"
            fillOpacity={0.3}
            animationDuration={800}
          />
          <Radar
            name="Emerging"
            dataKey="Emerging"
            stroke="#22d3ee"
            fill="#22d3ee"
            fillOpacity={0.2}
            animationDuration={800}
          />
          <Radar
            name="Core Analyst"
            dataKey="Core"
            stroke="#22c55e"
            fill="#22c55e"
            fillOpacity={0.15}
            animationDuration={800}
          />
          <Legend
            wrapperStyle={{ fontSize: 12, color: 'rgba(255,255,255,0.5)' }}
            formatter={(value) => <span style={{ color: 'rgba(255,255,255,0.5)' }}>{value}</span>}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}
