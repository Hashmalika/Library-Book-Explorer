import { useEffect, useState } from "react";

import { X, Star } from "lucide-react";

export default function BookDetailModal({ book, onClose }) {
  const [coverUrl, setCoverUrl] = useState("");

  useEffect(() => {
    if (book?.title) {
      const fetchCover = async () => {
        try {
          const query = encodeURIComponent(book.title) +
            (book.author ? `+inauthor:${encodeURIComponent(book.author)}` : "");
          const res = await fetch(`https://www.googleapis.com/books/v1/volumes?q=intitle:${query}`);
          const data = await res.json();
          const image = data.items?.[0]?.volumeInfo?.imageLinks?.thumbnail?.replace("http:", "https:") || null;
          setCoverUrl(image);
        } catch (err) {
          console.error("Image fetch failed:", err);
          setCoverUrl(null);
        }
      };

      fetchCover();
    }
  }, [book]);
  
  if (!book) return null;

  return (
    <div className="modal-backdrop">
      <div className="modal-content">
        <button className="modal-close-btn" onClick={onClose}>
          <X size={22} />
        </button>
        
        {coverUrl && (
          <img
            src={coverUrl}
            alt={book.title}
            className="modal-book-image"
            style={{
              width: "100%",
              maxHeight: "260px",
              objectFit: "contain",
              borderRadius: "12px",
              marginBottom: "20px",
              boxShadow: "0 4px 16px rgba(0, 0, 0, 0.1)",
            }}
          />
        )}
        <h2 className="modal-title">{book.title}</h2>
        <div className="modal-info">
          <p><strong>Author:</strong> {book.author || "Unknown"}</p>
          <p><strong>Genre:</strong> {book.genre}</p>
          <p><strong>Publish Date:</strong> {book.publish_date || "N/A"}</p>
          <p>
            <strong>Status:</strong>{" "}
            <span className={book.available ? "status-available" : "status-borrowed"}>
              {book.available ? "Available" : "Borrowed"}
            </span>
          </p>
          <p><strong>Price:</strong> ₹{parseFloat(book.price).toFixed(2)}</p>
          <p><strong>Rating:</strong>{" "}
            <span className="rating">
              {[...Array(Math.round(book.rating || 4))].map((_, i) => (
                <Star key={i} size={16} fill="#facc15" color="#facc15" />
              ))}
              <span className="rating-value">({(book.rating || 4).toFixed(1)})</span>
            </span>
          </p>
        </div>

        <button className="apply-button" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
}


