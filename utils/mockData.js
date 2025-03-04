// utils/mockData.js
export default {
  billableHoursData: [
    { month: 'Jan', billable: 1420, nonBillable: 340 },
    { month: 'Feb', billable: 1580, nonBillable: 320 },
    { month: 'Mar', billable: 1650, nonBillable: 280 },
    { month: 'Apr', billable: 1340, nonBillable: 360 },
    { month: 'May', billable: 1720, nonBillable: 290 },
    { month: 'Jun', billable: 1860, nonBillable: 310 }
  ],
  
  practiceAreaData: [
    { name: 'Corporate', value: 42 },
    { name: 'Litigation', value: 28 },
    { name: 'Real Estate', value: 15 },
    { name: 'IP', value: 10 },
    { name: 'Family Law', value: 5 }
  ],
  
  attorneyPerformanceData: [
    { name: 'Smith, J.', billable: 168, revenue: 42000 },
    { name: 'Johnson, A.', billable: 182, revenue: 45500 },
    { name: 'Williams, S.', billable: 145, revenue: 36250 },
    { name: 'Brown, M.', billable: 176, revenue: 44000 },
    { name: 'Davis, L.', billable: 155, revenue: 38750 }
  ],
  
  revenueData: [
    { month: 'Jan', revenue: 285000, target: 275000 },
    { month: 'Feb', revenue: 312000, target: 280000 },
    { month: 'Mar', revenue: 342000, target: 290000 },
    { month: 'Apr', revenue: 305000, target: 295000 },
    { month: 'May', revenue: 368000, target: 300000 },
    { month: 'Jun', revenue: 395000, target: 310000 }
  ],
  
  matterStatusData: [
    { status: 'Open', count: 42 },
    { status: 'Pending', count: 18 },
    { status: 'Closed', count: 35 }
  ]
};
