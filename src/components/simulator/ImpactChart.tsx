import { BarChart, Bar, XAxis, YAxis, Cell, ResponsiveContainer, LabelList } from 'recharts';

interface ImpactChartProps {
  data: { name: string; impact: number }[];
}

export function ImpactChart({ data }: ImpactChartProps) {
  const chartData = data.map((d) => ({
    name: d.name,
    impact: d.impact,
  }));

  return (
    <div className="glass-card p-6">
      <h4 className="text-sm font-semibold text-white mb-1">Potential Impact by Skill</h4>
      <p className="text-xs text-white/40 mb-5">Illustrative demo values — deterministic weighted model</p>
      <div style={{ width: '100%', height: 220 }}>
        <ResponsiveContainer>
          <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <XAxis
              dataKey="name"
              tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 12 }}
              axisLine={{ stroke: 'rgba(255,255,255,0.05)' }}
              tickLine={false}
            />
            <YAxis
              tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 11 }}
              axisLine={false}
              tickLine={false}
            />
            <Bar dataKey="impact" radius={[6, 6, 0, 0]} animationDuration={800}>
              {chartData.map((entry, idx) => (
                <Cell
                  key={idx}
                  fill={entry.impact >= 10 ? '#22c55e' : entry.impact >= 8 ? '#22d3ee' : '#f59e0b'}
                />
              ))}
              <LabelList
                dataKey="impact"
                position="top"
                formatter={(v: any) => `+${v}`}
                style={{ fill: 'rgba(255,255,255,0.6)', fontSize: 12, fontWeight: 600 }}
              />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
