import { useState, useEffect, useRef } from "react";

import BookList from "./components/BookList";
import BorrowedBooks from "./components/BorrowedBooks";
import BookDetailModal from "./components/BookDetailModal";
import GenrePieChart from "./components/GenrePieChart";
import StatusChart from "./components/StatusChart";
import AdminPanel from "./components/AdminPanel";

import {
  BookListIcon,
  BorrowedBooksIcon,
  AnalyticsIcon,
 
} from "./components/icon";

import "./index.css";

function App() {
  const [borrowed, setBorrowed] = useState([]);
  const [allBooks, setAllBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [view, setView] = useState("list");
  const [analyticsType, setAnalyticsType] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const analyticsBtnRef = useRef(null);
  const [dropdownPos, setDropdownPos] = useState({ top: 0, left: 0 });

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = () => {
    fetch("http://127.0.0.1:5000/api/books")
      .then((res) => res.json())
      .then((data) => {
        const normalized = data.map((book) => ({
          ...book,
          available: book.available === true || book.available === 1 || book.available === "1",
        }));
        setAllBooks(normalized);
      })
      .catch((err) => console.error("Failed to fetch books:", err));
  };

  const handleBorrow = (book) => {
    fetch(`http://127.0.0.1:5000/api/borrow/${book.id}`, {
      method: "POST",
    }).then(() => {
      setBorrowed((prev) => [...prev, { ...book, available: false }]);
      setAllBooks((prev) =>
        prev.map((b) => (b.id === book.id ? { ...b, available: false } : b))
      );
    });
  };

  const handleReturn = (book) => {
    fetch(`http://127.0.0.1:5000/api/return/${book.id}`, {
      method: "POST",
    }).then(() => {
      setBorrowed((prev) => prev.filter((b) => b.id !== book.id));
      setAllBooks((prev) =>
        prev.map((b) => (b.id === book.id ? { ...b, available: true } : b))
      );
    });
  };

  const handleBookAdded = () => {
    fetchBooks();
  };

  const handleBookDeleted = () => {
    fetchBooks();
  };

  const handleBookUpdated = () => {
    fetchBooks(); 
  };

  const btnStyle = {
    padding: "6px 12px",
    borderRadius: "6px",
    cursor: "pointer",
    border: "1px solid #ccc",
    
  };

  const dropdownBtn = {
    display: "block",
    padding: "6px 12px",
    width: "100%",
    // background: "rgb(224, 231, 255)",
    background: "#4f46e5",
    color: "#fff",
    // color: "#1e3a8a",
    border: "none",
    cursor: "pointer",
    textAlign: "left",
  };

  return (
    <div className="App" style={{ padding: "20px", backgroundColor: "#f7f7fb" }}>
      <div
        style={{
          background: "linear-gradient(135deg, #4b0082, #4169e1)",
          padding: "10px 20px",
          borderRadius: "8px",
          textAlign: "center",
          marginBottom: "16px",
        }}
      >
        <h1
          style={{
            fontSize: "2rem",
            fontWeight: "bold",
            marginBottom: "0",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px",
            fontFamily: "'Great Vibes', serif",
            color: "#fff",
            letterSpacing: "1px",
          }}
        >
          Library Book Explorer
        </h1>
      </div>

      {/* Navigation Buttons */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "center",
          gap: "12px",
          marginBottom: "24px",
          position: "relative",
        }}
      >
        <button onClick={() => setView("list")} 
        style={{ 
          ...btnStyle,
          background: view === "list"
           ? "#e0e7ff"
           : "linear-gradient(135deg, #4f46e5, #6d28d9)",
           color:view === "list"?" #4b0082":"#fff",
           boxShadow: view === "list"?" 0 4px 10px rgba(79, 70, 229, 0.3)":" 0 4px 10px rgba(0, 0, 0, 0.1)",

        }} className="apply-button">
          <BookListIcon style={{ marginRight: "6px" }} /> Book List
        </button>

        <button onClick={() => setView("borrowed")} 
        style={{ 
          ...btnStyle,
          background: view === "borrowed"
           ? "#e0e7ff"
           : "linear-gradient(135deg, #4f46e5, #6d28d9)",
           color:view === "borrowed"?" #4b0082":"#fff",
           boxShadow: view === "borrowed"?" 0 4px 10px rgba(79, 70, 229, 0.3)":" 0 4px 10px rgba(0, 0, 0, 0.1)",

        }}className="apply-button">
          <BorrowedBooksIcon style={{ marginRight: "6px" }} /> Borrowed Books
        </button>

        <button
          ref={analyticsBtnRef}
          onClick={() => {
            setView("analytics");
            const rect = analyticsBtnRef.current.getBoundingClientRect();
            const parentRect = analyticsBtnRef.current.offsetParent.getBoundingClientRect();
            setDropdownPos({
              top: rect.bottom - parentRect.top - 1,
              left: rect.left - parentRect.left,
            });
            setShowDropdown((prev) => !prev);
          }}
          style={{ 
            ...btnStyle,
            background: view === "analytics"
             ? "#e0e7ff"
             : "linear-gradient(135deg, #4f46e5, #6d28d9)",
            color:view === "analytics"?" #4b0082":"#fff",
            boxShadow: view === "analytics"?" 0 4px 10px rgba(79, 70, 229, 0.3)":" 0 4px 10px rgba(0, 0, 0, 0.1)",
         }}
          className="apply-button"
        >
          <AnalyticsIcon style={{ marginRight: "6px" }} /> Analytics ▾
        </button>

        <button onClick={() => setView("admin")} 
        style={{ 
          ...btnStyle,
          background: view === "admin"
           ? "#e0e7ff"
           : "linear-gradient(135deg, #4f46e5, #6d28d9)",
           color:view === "admin"?" #4b0082":"#fff",
           boxShadow: view === "admin"?" 0 4px 10px rgba(79, 70, 229, 0.3)":" 0 4px 10px rgba(0, 0, 0, 0.1)",

        }}className="apply-button">
          🛠️ Admin Panel
        </button>

        {showDropdown && (
          <div
            style={{
              position: "absolute",
              top: dropdownPos.top,
              left: dropdownPos.left,
              backgroundColor: "#4f46e5",
              border: "1px solid #ccc",
              borderRadius: "8px",
              zIndex: 1000,
              boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
              minWidth: "200px",
              overflow: "hidden",
            }}
          >
            <button
              style={dropdownBtn}
              className="apply-button"
              onClick={() => {
                setView("analytics");
                setAnalyticsType("genre");
                setShowDropdown(false);
              }}
            >
              Genre Distribution
            </button>
            <button
              style={dropdownBtn}
              className="apply-button"
              onClick={() => {
                setView("analytics");
                setAnalyticsType("status");
                setShowDropdown(false);
              }}
            >
              Availability Status
            </button>
          </div>
        )}
      </div>

      {/* Main Content */}
      {view === "list" && (
        <BookList onBorrow={handleBorrow} onSelectBook={setSelectedBook} />
      )}

      {view === "borrowed" && (
        <BorrowedBooks borrowed={borrowed} onReturn={handleReturn} />
      )}

      {view === "analytics" && (
        <>
          {analyticsType === "genre" && <GenrePieChart books={allBooks} />}
          {analyticsType === "status" && <StatusChart books={allBooks} />}
        </>
      )}

      {view === "admin" && (
        <AdminPanel onBookAdded={handleBookAdded} onBookDeleted={handleBookDeleted} onBookUpdated={handleBookUpdated}  />
      )}

      {/* Book Detail Modal */}
      <BookDetailModal book={selectedBook} onClose={() => setSelectedBook(null)} />
    </div>
  );
}

export default App;
