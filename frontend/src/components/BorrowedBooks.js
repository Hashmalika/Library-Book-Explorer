// import React from "react";
import { RotateCcw } from "lucide-react";


export default function BorrowedBooks({ borrowed, onReturn }) {
  return (
    <div className="borrowed-container">
      <h2 className="borrowed-title">
        📘 My Borrowed Books
        <span className="borrowed-count">({borrowed.length} books)</span>
      </h2>

      {borrowed.length === 0 ? (
        <p className="borrowed-empty">You haven't borrowed any books yet.</p>
      ) : (
        <ul className="borrowed-list">
          {borrowed.map((book) => (
            <li key={book.id} className="borrowed-item">
              <h3 className="book-title">{book.title}</h3>
              <p className="book-detail">Genre: {book.genre}</p>
              <p className="book-detail">Price: ₹{Number(book.price).toFixed(2)}</p>

              <button
                className="return-button"
                onClick={() => onReturn(book)}
              >
                <RotateCcw size={16} />
                Return Book
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
