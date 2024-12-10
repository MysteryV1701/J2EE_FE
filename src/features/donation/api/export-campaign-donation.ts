/* eslint-disable @typescript-eslint/no-explicit-any */
export const exportStatistic = async (request: {
  campaignId: number;
}): Promise<void> => {
  const response = await fetch(
    `http://localhost:8090/api/donations/export/${request.campaignId}`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem('access_token')}`,
        'Content-Type': 'application/octet-stream',
      },
    },
  );

  console.log(response);

  const blob = await response.blob();
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'donations.xlsx';
  document.body.appendChild(a);
  a.click();
  a.remove();
  window.URL.revokeObjectURL(url);
};
