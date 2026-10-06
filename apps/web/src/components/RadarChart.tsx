import React from 'react';
import ReactECharts from 'echarts-for-react';

interface RadarChartProps {
  dimensions: Array<{
    dimensionCode: string;
    dimensionName: string;
    journeyTitle: string;
    score: number;
  }>;
  candidateName?: string;
}

export const RadarChart: React.FC<RadarChartProps> = ({ dimensions, candidateName }) => {
  // Ordered D01 to D10
  const sorted = [...dimensions].sort((a, b) => a.dimensionCode.localeCompare(b.dimensionCode));

  const indicators = sorted.map((d) => ({
    name: `${d.dimensionCode}\n${d.journeyTitle}`,
    max: 5.0
  }));

  const values = sorted.map((d) => d.score);

  const option = {
    backgroundColor: 'transparent',
    tooltip: {
      trigger: 'item',
      backgroundColor: '#1E293B',
      borderColor: '#334155',
      textStyle: {
        color: '#F8FAFC',
        fontSize: 12
      },
      formatter: () => {
        let result = `<div style="font-weight:bold;margin-bottom:4px;color:#F59E0B">${candidateName || 'Calon'} — 10 Dimensi DES</div>`;
        sorted.forEach((dim) => {
          result += `<div style="display:flex;justify-content:space-between;gap:12px;font-size:11px;">
            <span>${dim.dimensionCode} ${dim.dimensionName}:</span>
            <span style="font-weight:bold;color:#38BDF8">${dim.score.toFixed(1)} / 5.0</span>
          </div>`;
        });
        return result;
      }
    },
    radar: {
      indicator: indicators,
      shape: 'polygon',
      splitNumber: 5,
      axisName: {
        color: '#334155',
        fontSize: 11,
        fontWeight: 700
      },
      splitLine: {
        lineStyle: {
          color: '#E2E8F0',
          width: 1
        }
      },
      splitArea: {
        show: true,
        areaStyle: {
          color: ['rgba(241, 245, 249, 0.7)', 'rgba(255, 255, 255, 0.95)']
        }
      },
      axisLine: {
        lineStyle: {
          color: '#CBD5E1'
        }
      }
    },
    series: [
      {
        name: 'DES Score',
        type: 'radar',
        data: [
          {
            value: values,
            name: candidateName || 'Skor Calon',
            symbol: 'circle',
            symbolSize: 6,
            lineStyle: {
              color: '#2563EB',
              width: 3,
              shadowColor: 'rgba(37, 99, 235, 0.3)',
              shadowBlur: 8
            },
            areaStyle: {
              color: 'rgba(37, 99, 235, 0.2)'
            },
            itemStyle: {
              color: '#2563EB',
              borderColor: '#FFFFFF',
              borderWidth: 2
            }
          }
        ]
      }
    ]
  };

  return (
    <div className="w-full h-80 sm:h-96">
      <ReactECharts option={option} style={{ height: '100%', width: '100%' }} />
    </div>
  );
};
