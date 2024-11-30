import { ResponsiveBar } from '@nivo/bar';
import { format } from 'date-fns';

interface CampaignData {
  campaigns: {
    startDate: string;
    name: string;
  };
  totalDonations: number;
}

interface StatisticBarChartProps {
  data: CampaignData[];
  totalCampaigns: number;
  donations: number;
  dataType: string; 
}

export const StatisticBarChart = ({ data, totalCampaigns, dataType, donations}: StatisticBarChartProps) => {
  const chartData = data.reduce<{ month: string; countCampaign: number; totalDonations: number }[]>((acc, item) => {
    const month = format(new Date(item.campaigns.startDate), 'yyyy-MM');
    const existing = acc.find((d) => d.month === month);
    if (existing) {
      existing.countCampaign += 1;
      existing.totalDonations += item.totalDonations;
    } else {
      acc.push({
        month,
        countCampaign: 1,
        totalDonations: item.totalDonations,
      });
    }
    return acc;
  }, []);

  const maxCountCampaign = Math.max(...chartData.map(d => d.countCampaign));
  const maxTotalDonations = Math.max(...chartData.map(d => d.totalDonations));
  const tickValues = Array.from({ length: (dataType === 'campaign' ? maxCountCampaign : maxTotalDonations) + 1 }, (_, i) => i);

  return (
    <div style={{ height: 400 }}>
      <h2>Tổng số {dataType === 'campaign' ? 'chiến dịch' : 'đóng góp'} theo khoảng thời gian trên: {dataType === 'campaign' ? totalCampaigns : donations }</h2>
      <ResponsiveBar
        data={chartData}
        keys={[dataType === 'campaign' ? 'countCampaign' : 'totalDonations']}
        indexBy="month"
        margin={{ top: 50, right: 50, bottom: 50, left: 60 }}
        padding={0.3}
        valueScale={{ type: 'linear' }}
        indexScale={{ type: 'band', round: true }}
        colors={{ scheme: 'nivo' }}
        axisBottom={{
          legend: 'Thời gian',
          legendPosition: 'middle',
          legendOffset: 40,
        }}
        axisLeft={{
          legend: dataType === 'campaign' ? 'Số lượng chiến dịch' : 'Tổng số đóng góp',
          legendPosition: 'middle',
          legendOffset: -50,
          tickValues: tickValues,
        }}
        tooltip={({ indexValue, value, color, data }) => (
          <div style={{ padding: '5px', color: '#fff', background: color }}>
            <strong>{indexValue}</strong>
            <br />
            {dataType === 'campaign' ? 'Số lượng chiến dịch' : 'Tổng số đóng góp'}: {value}
          </div>
        )}
      />
    </div>
  );
};