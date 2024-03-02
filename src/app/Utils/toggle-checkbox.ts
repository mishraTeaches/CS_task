export const toggleSelectAllDevices = (event: any, deviceData: any) => {
  const selectAll = event.target.checked;
  const data = deviceData;
  data.forEach((checkbox: any) => {
    checkbox['checked'] = selectAll;
  });
  return data;
};
