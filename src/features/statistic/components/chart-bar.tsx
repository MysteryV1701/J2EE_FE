import { ResponsiveBar } from '@nivo/bar';
import { format } from 'date-fns';

interface CampaignData {
  campaigns: {
    startDate: string;
    name: string;
  };
}

interface StatisticBarChartProps {
  data: CampaignData[];
  totalCampaigns: number;
}

export const StatisticBarChart = ({ data, totalCampaigns }: StatisticBarChartProps) => {
  const chartData = data.reduce<{ month: string; countCampaign: number }[]>((acc, item) => {
    const month = format(new Date(item.campaigns.startDate), 'yyyy-MM');
    const existing = acc.find((d) => d.month === month);
    if (existing) {
      existing.countCampaign += 1;
    } else {
      acc.push({
        month,
        countCampaign: 1,
      });
    }
    return acc;
  }, []);

  const maxCountCampaign = Math.max(...chartData.map(d => d.countCampaign));
  const tickValues = Array.from({ length: maxCountCampaign + 1 }, (_, i) => i);

  return (
    <div style={{ height: 400 }}>
      <h2>Tổng số chiến dịch theo khoảng thời gian trên: {totalCampaigns}</h2>
      <ResponsiveBar
        data={chartData}
        keys={['countCampaign']}
        indexBy="month"
        margin={{ top: 50, right: 50, bottom: 50, left: 60 }}
        padding={0.3}
        valueScale={{ type: 'linear' }}
        colors={{ scheme: 'nivo' }}
        indexScale={{ type: 'band', round: true }}
        axisBottom={{
          legend: 'Thời gian',
          legendPosition: 'middle',
          legendOffset: 40,
        }}
        axisLeft={{
          legend: 'Số lượng chiến dịch',
          legendPosition: 'middle',
          legendOffset: -50,
          tickValues: tickValues,
        }}
        tooltip={({ indexValue, value, color }) => (
          <div style={{ padding: '5px', color: color, background: '#fff' }}>
            <strong>{indexValue}</strong>
            <br />
            Số lượng chiến dịch: {value}
          </div>
        )}
      />
    </div>
  );
};