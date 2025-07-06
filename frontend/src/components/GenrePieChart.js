import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const COLORS = [
  "#4caf50",
  "#2196f3",
  "#ff9800",
  "#f44336",
  "#9c27b0",
  "#795548",
  "#607d8b",
  "#00bcd4",
  "#8bc34a",
  "#ffc107",
];

export default function GenrePieChart({ books }) {
  const genreCount = {};
  books.forEach((book) => {
    genreCount[book.genre] = (genreCount[book.genre] || 0) + 1;
  });

  const data = Object.entries(genreCount).map(([genre, count]) => ({
    name: genre,
    value: count,
  }));

  return (
    <div>
      <h2 className="chart-title">📚 Genre Distribution</h2>
      <div className="chart-container">
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              dataKey="value"
              data={data}
              cx="50%"
              cy="50%"
              outerRadius={90}
              label
            >
              {data.map((_, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

