import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

import "./StatsChart.css";

function StatsChart() {

  // Temporary data
  // Later we'll replace this with backend data.
  const data = [
    { month: "Jan", bookings: 12 },
    { month: "Feb", bookings: 18 },
    { month: "Mar", bookings: 10 },
    { month: "Apr", bookings: 22 },
    { month: "May", bookings: 16 },
    { month: "Jun", bookings: 28 },
    { month: "Jul", bookings: 19 },
    { month: "Aug", bookings: 25 },
    { month: "Sep", bookings: 14 },
    { month: "Oct", bookings: 20 },
    { month: "Nov", bookings: 26 },
    { month: "Dec", bookings: 31 },
  ];

  return (
    <div className="stats-chart-card">

      <div className="chart-header">

        <h4>Monthly Bookings</h4>

        <p>Bookings throughout the year</p>

      </div>

      <ResponsiveContainer width="100%" height={350}>

        <BarChart data={data}>

          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="month" />

          <YAxis />

          <Tooltip />

          <Bar
            dataKey="bookings"
            fill="#C8A45D"
            radius={[8,8,0,0]}
          />

        </BarChart>

      </ResponsiveContainer>

    </div>
  );

}

export default StatsChart;