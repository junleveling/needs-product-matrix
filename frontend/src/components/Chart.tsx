'use client';

import { useState, useEffect } from 'react';
import * as echarts from 'echarts/core';
import { PieChart, BarChart, RadarChart } from 'echarts/charts';
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent
} from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers';

// 註冊必要的組件
echarts.use([
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent,
  PieChart,
  BarChart,
  RadarChart,
  CanvasRenderer
]);

interface ChartProps {
  chartType: 'pie' | 'bar' | 'radar';
  data: any;
  options?: any;
  style?: React.CSSProperties;
}

export default function Chart({ chartType, data, options = {}, style = {} }: ChartProps) {
  const [chartInstance, setChartInstance] = useState<echarts.ECharts | null>(null);
  const chartId = `chart-${Math.random().toString(36).substr(2, 9)}`;

  useEffect(() => {
    // 初始化圖表
    const chartContainer = document.getElementById(chartId);
    if (chartContainer) {
      const chart = echarts.init(chartContainer);
      setChartInstance(chart);
      
      // 監聽窗口大小變化，調整圖表大小
      const resizeHandler = () => {
        chart.resize();
      };
      window.addEventListener('resize', resizeHandler);
      
      return () => {
        chart.dispose();
        window.removeEventListener('resize', resizeHandler);
      };
    }
  }, [chartId]);

  useEffect(() => {
    if (chartInstance) {
      let chartOptions = {};
      
      // 根據圖表類型設置不同的配置
      if (chartType === 'pie') {
        chartOptions = {
          title: {
            text: options.title || '餅圖',
            left: 'center'
          },
          tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b}: {c} ({d}%)'
          },
          legend: {
            orient: 'horizontal',
            bottom: 'bottom'
          },
          series: [
            {
              name: options.seriesName || '數據',
              type: 'pie',
              radius: options.radius || '50%',
              data: data,
              emphasis: {
                itemStyle: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              }
            }
          ],
          color: options.colors || ['#1A365D', '#4A90E2', '#E6B035', '#2ECC71', '#F1C40F', '#E74C3C']
        };
      } else if (chartType === 'bar') {
        chartOptions = {
          title: {
            text: options.title || '柱狀圖',
            left: 'center'
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow'
            }
          },
          legend: {
            orient: 'horizontal',
            bottom: 'bottom'
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '15%',
            containLabel: true
          },
          xAxis: {
            type: 'category',
            data: options.xAxisData || data.map((item: any) => item.name)
          },
          yAxis: {
            type: 'value'
          },
          series: [
            {
              name: options.seriesName || '數據',
              type: 'bar',
              data: options.yAxisData || data.map((item: any) => item.value)
            }
          ],
          color: options.colors || ['#1A365D', '#4A90E2', '#E6B035', '#2ECC71', '#F1C40F', '#E74C3C']
        };
      } else if (chartType === 'radar') {
        chartOptions = {
          title: {
            text: options.title || '雷達圖',
            left: 'center'
          },
          tooltip: {
            trigger: 'item'
          },
          legend: {
            orient: 'horizontal',
            bottom: 'bottom'
          },
          radar: {
            indicator: options.indicators || data.indicators,
            radius: options.radius || '60%'
          },
          series: [
            {
              name: options.seriesName || '數據',
              type: 'radar',
              data: options.seriesData || [
                {
                  value: data.values,
                  name: data.name || '數據'
                }
              ]
            }
          ],
          color: options.colors || ['#1A365D', '#4A90E2', '#E6B035', '#2ECC71', '#F1C40F', '#E74C3C']
        };
      }
      
      // 合併自定義選項
      const finalOptions = { ...chartOptions, ...options };
      
      // 設置圖表選項
      chartInstance.setOption(finalOptions);
    }
  }, [chartInstance, chartType, data, options]);

  return (
    <div 
      id={chartId} 
      style={{ 
        width: '100%', 
        height: '300px', 
        ...style 
      }}
    ></div>
  );
}
