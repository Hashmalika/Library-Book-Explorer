import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Legend,
  Cell,
} from "recharts";

export default function StatusChart({ books }) {
  const availableBooks = books.filter((book) => book.available === true);
  const borrowedBooks = books.filter((book) => book.available === false);

  const availableCount = availableBooks.length;
  const borrowedCount = borrowedBooks.length;

  const statusData = [
    { name: "Available 📗", count: availableCount, color: "#4CAF50" }, // Green
    { name: "Borrowed 📕", count: borrowedCount, color: "#EF4444" },   // Red
  ];

  // Genre count helper
  const genreDistribution = (booksArray) => {
    const genreMap = {};
    booksArray.forEach((book) => {
      genreMap[book.genre] = (genreMap[book.genre] || 0) + 1;
    });
    // Convert to array
    return Object.keys(genreMap).map((genre) => ({
      name: genre,
      count: genreMap[genre],
    }));
  };

  const availableGenreData = genreDistribution(availableBooks);
  const borrowedGenreData = genreDistribution(borrowedBooks);

  return (
    // <div className="status-chart-container">

    //   <h2 className="status-chart-title">📊 Available/Borrowed Status Distribution</h2>
    //   <div style={{ display: "flex", justifyContent: "center" }}>
    //     <ResponsiveContainer width="40%" height={250}>
    //       <BarChart data={statusData} barCategoryGap="10%" barGap={2}>
    //         <CartesianGrid strokeDasharray="3 3" />
    //         <XAxis dataKey="name" />
    //         <YAxis allowDecimals={false} />
    //         <Tooltip />
    //         <Legend />
    //         <Bar dataKey="count" name="Book Count" barSize={25}>
    //           {statusData.map((entry, index) => (
    //            <Cell key={`cell-status-${index}`} fill={entry.color} />
    //           ))}
    //         </Bar>
    //       </BarChart>
    //     </ResponsiveContainer>
    //   </div>
      
    //   <h2 className="status-chart-title">📗 Available Genre Distribution</h2>
    //   <div style={{ display: "flex", justifyContent: "center" }}>
    //     <ResponsiveContainer width="40%" height={250}>
    //      <BarChart data={availableGenreData} barCategoryGap="10%" barGap={2}>
    //         <CartesianGrid strokeDasharray="3 3" />
    //         <XAxis dataKey="name" />
    //         <YAxis allowDecimals={false} />
    //         <Tooltip />
    //         <Legend />
    //         <Bar dataKey="count" name="Available" barSize={25}>
    //           {availableGenreData.map((entry, index) => (
    //             <Cell key={`cell-avail-${index}`} fill="#4CAF50" />
    //           ))}
    //         </Bar>
    //       </BarChart>
    //     </ResponsiveContainer>
    //   </div>

    //   <h2 className="status-chart-title">📕 Borrowed Genre Distribution</h2>
    //   <div style={{ display: "flex", justifyContent: "center" }}>
    //     <ResponsiveContainer width="40%" height={250} >
    //       <BarChart data={borrowedGenreData} barCategoryGap="10%" barGap={2}>
    //         <CartesianGrid strokeDasharray="3 3" />
    //         <XAxis dataKey="name" />
    //         <YAxis allowDecimals={false} />
    //         <Tooltip />
    //         <Legend />
    //         <Bar dataKey="count" name="Borrowed" barSize={25}>
    //           {borrowedGenreData.map((entry, index) => (
    //             <Cell key={`cell-borrow-${index}`} fill="#EF4444" />
    //           ))}
    //         </Bar>
    //       </BarChart>
    //     </ResponsiveContainer>
    //   </div>
    // '</div>
    <div>
      <h2 className="status-chart-title" style={{ textAlign: "center" }}>
        Availability Status
      </h2>
      <div className="status-chart-container">
        <div style={{ display: "flex", justifyContent: "center", gap: "20px", flexWrap: "wrap" }}>
        {/* Available/Borrowed Status */}
          <div>
            <p style={{ textAlign: "center", fontWeight: "bold" }}>📊 Status Distribution</p>
            <br>
            </br>
            <ResponsiveContainer width={300} height={250}>
             <BarChart data={statusData} barCategoryGap="10%" barGap={2}>
               <CartesianGrid strokeDasharray="3 3" />
               <XAxis dataKey="name" />
               <YAxis allowDecimals={false} />
               <Tooltip />
               <Legend />
               <Bar dataKey="count" name="Book Count" barSize={25}>
                 {statusData.map((entry, index) => (
                   <Cell key={`cell-status-${index}`} fill={entry.color} />
                  ))}
               </Bar>
             </BarChart>
           </ResponsiveContainer>
          </div>

          {/* Available Genre */}
          <div>
           <p style={{ textAlign: "center", fontWeight: "bold" }}>📗 Available Genres</p>
           <br>
           </br>
           <ResponsiveContainer width={400} height={250}>
             <BarChart data={availableGenreData} barCategoryGap="10%" barGap={2}>
               <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Legend />
                <Bar dataKey="count" name="Available" barSize={25}>
                 {availableGenreData.map((entry, index) => (
                   <Cell key={`cell-avail-${index}`} fill="#4CAF50" />
                 ))}
                </Bar>
             </BarChart>
            </ResponsiveContainer>
         </div>

         {/* Borrowed Genre */}
          <div>
            <p style={{ textAlign: "center", fontWeight: "bold" }}>📕 Borrowed Genres</p>
           <br>
           </br>
           <ResponsiveContainer width={400} height={250}>
              <BarChart data={borrowedGenreData} barCategoryGap="10%" barGap={2}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Legend />
              <Bar dataKey="count" name="Borrowed" barSize={25}>
                {borrowedGenreData.map((entry, index) => (
                  <Cell key={`cell-borrow-${index}`} fill="#EF4444" />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  </div>

  );
}

