import { useEffect, useState } from "react";
import { X, CheckCircle, XCircle } from "lucide-react";
import BookDetailModal from "./BookDetailModal";
import { FilterIcon } from "./icon";
import Select from "react-select";


export default function BookList({ onBorrow }) {
  const [books, setBooks] = useState([]);
  const [selectedBooks, setSelectedBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [showFilterPanel, setShowFilterPanel] = useState(true);

  const genreOptions = [
  { value: "", label: "All Genres" },
  { value: "Fiction", label: "Fiction" },
  { value: "Science", label: "Science" },
  { value: "Finance", label: "Finance" },
  { value: "Self-help", label: "Self-help" },
  { value: "Philosophy", label: "Philosophy" },
  { value: "Biography", label: "Biography" },
  { value: "Fantasy", label: "Fantasy" },
  { value: "Romance", label: "Romance" },
  { value: "Business", label: "Business" },
  { value: "History", label: "History" }
  ];

 const customStyles = {
   control: (provided, state) => ({
      ...provided,
      minHeight: "32px",
      height: "32px",
      padding: "0 0.4rem", // simulate input padding
      fontSize: "0.85rem",
      borderRadius: "6px",
      border: `1px solid ${state.isFocused ? "#4299e1" : "#ccc"}`,
      backgroundColor: "#fff",
      boxShadow: state.isFocused
      ? "0 0 0 3px rgba(66, 153, 225, 0.2)"
      : "none",
      outline: "none",
      display: "flex",
      alignItems: "center",
      cursor: "pointer",
      minWidth: "180px",
    }),
    option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isSelected
      ? " #4f46e5"
      : state.isFocused
      ? "rgb(199, 197, 246)"
      : "#fff",
    color: state.isSelected ? "#fff" : "#333",
    padding: "8px 12px",
    cursor: "pointer",
    }),

    valueContainer: (provided) => ({
      ...provided,
      padding: 0,
      height: "32px",
      display: "flex",
      alignItems: "center",
    }),
    input: (provided) => ({
      ...provided,
      margin: 0,
      padding: 0,
    }),
    singleValue: (provided) => ({
      ...provided,
      margin: 0,
      padding: 0,
    }),
    indicatorsContainer: (provided) => ({
      ...provided,
      height: "32px",
    }),
    dropdownIndicator: (provided) => ({
      ...provided,
    padding: "4px",
    }),  
    indicatorSeparator: () => ({
      display: "none", // ✅ this removes the vertical line
    }),

    menu: (provided) => ({
      ...provided,
      fontSize: "0.85rem",
      maxHeight: "150px", // Limit dropdown scroll height
     
    }),
    menuList: (provided) => ({
     ...provided,
     maxHeight: "150px",   //  scroll limit here
     overflowY: "auto",     // only one vertical scrollbar here
     padding: 0,
    }),
  };

  const availabilityOptions = [
    { value: "", label: "All" },
    { value: "true", label: "Available" },
    { value: "false", label: "Borrowed" },
  ];




  const [pendingFilters, setPendingFilters] = useState({
    search: "",
    genre: "",
    availability: "",
    priceRange: [0, 1000],
    sortBy: ""
  });

  const [filters, setFilters] = useState(pendingFilters);

  useEffect(() => {
    fetch("http://127.0.0.1:5000/api/books")
      .then((res) => res.json())
      .then((data) => {
        const normalized = data.map(book => ({
          ...book,
          available: book.available === true || book.available === 1 || book.available === "1"
        }));
        setBooks(normalized);
      })
      .catch((err) => console.error("Failed to fetch books:", err));
  }, []);

  useEffect(() => {
    setFilters((prev) => ({
      ...prev,
      sortBy: pendingFilters.sortBy
    }));
  }, [pendingFilters.sortBy]);

  

  const handleSelectBook = (book) => {
    if (!book.available) return;

    if (selectedBooks.find((b) => b.id === book.id)) {
      setSelectedBooks(selectedBooks.filter((b) => b.id !== book.id));
    } else {
      setSelectedBooks([...selectedBooks, book]);
      onBorrow(book);
    }
  };

  const removeFilter = (type) => {
    const updated = { ...filters };
    if (type === "genre") updated.genre = "";
    if (type === "availability") updated.availability = "";
    if (type === "price") updated.priceRange = [0, 1000];
    if (type === "sortBy") updated.sortBy = ""; 
    setPendingFilters(updated);
    setFilters(updated);
  };
  
  const clearAllFilters = () => {
   const resetFilters = {
      search: "",
      genre: "",
      availability: "",
      priceRange: [0, 1000],
      sortBy: ""
    };
    setPendingFilters(resetFilters);
    setFilters(resetFilters);
 };

  const applyFilters = () => {
    setFilters({ ...pendingFilters });
  };

  const filteredBooks = books
    .filter((book) =>
      book.title.toLowerCase().includes(filters.search.toLowerCase())
    )
    .filter((book) => (filters.genre ? book.genre === filters.genre : true))
    .filter((book) =>
      filters.availability === "true"
        ? book.available === true
        : filters.availability === "false"
        ? book.available === false
        : true
    )
    .filter(
      (book) =>
        parseFloat(book.price) >= filters.priceRange[0] &&
        parseFloat(book.price) <= filters.priceRange[1]
    );

  const sortedBooks = [...filteredBooks].sort((a, b) => {
    if (filters.sortBy === "title") return a.title.localeCompare(b.title);
    if (filters.sortBy === "priceLowHigh") return a.price - b.price;
    if (filters.sortBy === "priceHighLow") return b.price - a.price;
    if (filters.sortBy === "availability") return b.available - a.available;
    return 0;
  });

  const totalSelected = selectedBooks.length;
  const totalPrice = selectedBooks.reduce((sum, b) => sum + parseFloat(b.price), 0);

  return (
    <div className="booklist-container">
      <div className="filter-header">
        
         {/* <button
           className="apply-button small-toggle-btn"
           onClick={() => setShowFilterPanel((prev) => !prev)}
          >
           {showFilterPanel ? "Filters" : "Filters"}
          </button> */}
          <button
            className="apply-button small-toggle-btn"
            onClick={() => setShowFilterPanel((prev) => !prev)}
          >
            <FilterIcon style={{ marginRight: "6px" }} />
           Filters
          </button>

      </div>
      {showFilterPanel && (
        <div className="filter-bar-horizontal">
          <h3>Filter By</h3>
        
          <input
            type="text"
            className="filter-input"
            placeholder="Search by title..."
            value={pendingFilters.search}
            onChange={(e) =>
              setPendingFilters({ ...pendingFilters, search: e.target.value })
            }
          />
          <Select
            styles={customStyles}
            options={genreOptions}
            isSearchable={true}
            value={genreOptions.find(option => option.value === pendingFilters.genre)}
            onChange={(selectedOption) =>
             setPendingFilters({ ...pendingFilters, genre: selectedOption?.value || "" })
            }
          />
          {/* <select
            className="filter-input"
            value={pendingFilters.genre}
            onChange={(e) =>
              setPendingFilters({ ...pendingFilters, genre: e.target.value })
            }
          >
            <option value="">All Genres</option>
            <option value="Fiction">Fiction</option>
            <option value="Science">Science</option>
            <option value="Finance">Finance</option>
            <option value="Self-help">Self-help</option>
            <option value="Philosophy">Philosophy</option>
            <option value="Biography">Biography</option>
            <option value="Fantasy">Fantasy</option>
            <option value="Romance">Romance</option>
            <option value="Business">Business</option>
            <option value="History">History</option>
          </select> */}
          <Select
            styles={customStyles} // Reuse the same customStyles you created for Genre
            options={availabilityOptions}
            value={availabilityOptions.find(
              (option) => option.value === pendingFilters.availability
           )}
           onChange={(selectedOption) =>
             setPendingFilters({
               ...pendingFilters,
                availability: selectedOption?.value || ""
             })
            }
         />
          {/* <select
            className="filter-input"
            value={pendingFilters.availability}
            onChange={(e) =>
              setPendingFilters({
                ...pendingFilters,
                availability: e.target.value
              })
            }
          >
            <option value="">All</option>
            <option value="true">Available</option>
            <option value="false">Borrowed</option>
          </select> */}
          <div className="price-slider">
            <span>₹{pendingFilters.priceRange[0]}</span>
            <input
              type="range"
              min="0"
              max="1000"
              step="50"
              value={pendingFilters.priceRange[0]}
              onChange={(e) =>
                setPendingFilters({
                  ...pendingFilters,
                  priceRange: [
                    parseInt(e.target.value),
                    pendingFilters.priceRange[1]
                  ]
                })
              }
            />
            <input
              type="range"
              min="0"
              max="1000"
              step="50"
              value={pendingFilters.priceRange[1]}
              onChange={(e) =>
                setPendingFilters({
                  ...pendingFilters,
                  priceRange: [
                    pendingFilters.priceRange[0],
                    parseInt(e.target.value)
                  ]
                })
              }
            />
            <span>₹{pendingFilters.priceRange[1]}</span>
          </div>
          <button className="apply-button" onClick={applyFilters}>
            <FilterIcon size={16} style={{ marginRight: "6px" }} />
            Apply Filters
          </button>
        </div>
      )}

      <div className="main-content">
        <div className="active-filters">
          {filters.genre && (
            <span className="filter-tag">
              Genre: {filters.genre} <X size={14} onClick={() => removeFilter("genre")} />
            </span>
          )}
          {filters.availability && (
            <span className="filter-tag">
              {filters.availability === "true" ? "Available" : "Borrowed"}{" "}
              <X size={14} onClick={() => removeFilter("availability")} />
            </span>
          )}
          {(filters.priceRange[0] !== 0 || filters.priceRange[1] !== 1000) && (
            <span className="filter-tag">
              Price: ₹{filters.priceRange[0]}–₹{filters.priceRange[1]}{" "}
              <X size={14} onClick={() => removeFilter("price")} />
            </span>
          )}
          
          {(filters.genre || filters.availability || filters.sortBy || filters.priceRange[0] !== 0 || filters.priceRange[1] !== 1000 || filters.search) && (
            // <button
            //   className="filter-tag"
            //   onClick={clearAllFilters}
            //   style={{
            //      background: "transparent",
            //      color: "#4f46e5",
            //      border: "none",
            //      fontSize: "0.85rem",
            //      cursor: "pointer",
            //      marginLeft: "auto"
            //   }}
            // >
            //   Clear All Filters ✕
            // </button>
            <span className="filter-tag" onClick={clearAllFilters} style={{ cursor: "pointer",marginLeft:"auto"}}>
              Clear All Filters <X size={14} />
            </span>
         )}

          

          {filters.sortBy && (
              <span className="filter-tag">
                Sort: {
                  filters.sortBy === "title" ? "Title (A-Z)" :
                  filters.sortBy === "priceLowHigh" ? "Price Low–High" :
                  filters.sortBy === "priceHighLow" ? "Price High–Low" :
                  filters.sortBy === "availability" ? "Availability" :
                  filters.sortBy
                }
               <X size={14} onClick={() => removeFilter("sortBy")} />
             </span>
          )}
        </div>

        {totalSelected > 0 && (
          <div className="borrow-info">
            ✅ {totalSelected} book(s) selected | Total Price: ₹{totalPrice.toFixed(2)}
          </div>
        )}

        <div className="sort-bar">
          <span>Result {sortedBooks.length}</span>
          <select
            className="sort-dropdown"
            value={pendingFilters.sortBy}
            onChange={(e) =>
              setPendingFilters({ ...pendingFilters, sortBy: e.target.value })
            }
          >
            <option value="">Sort By</option>
            <option value="title">Title (A-Z)</option>
            <option value="priceLowHigh">Price: Low to High</option>
            <option value="priceHighLow">Price: High to Low</option>
            <option value="availability">Availability</option>
          </select>
        </div>

        <ul className="book-list">
          {sortedBooks.map((book) => (
            <li
              key={book.id}
              className={`book-card ${selectedBooks.find((b) => b.id === book.id) ? "selected" : ""}`}
            >
              <h3 onClick={() => setSelectedBook(book)} style={{ cursor: "pointer" }}>
                {book.title}
              </h3>
              <p>Genre: {book.genre}</p>
              <p>Price: ₹{parseFloat(book.price).toFixed(2)}</p>

              <div className="button-row">
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <button className="book-button" onClick={() => setSelectedBook(book)}>
                    Details
                  </button>
                  <span
                    style={{
                      padding: "4px 8px",
                      borderRadius: "12px",
                      fontSize: "0.75rem",
                      fontWeight: "bold",
                      display: "flex",
                      alignItems: "center",
                      gap: "4px",
                      backgroundColor: book.available ? "#d4f5d1" : "#fcdcdc",
                      color: book.available ? "#1f7a1f" : "#b30000",
                    }}
                  >
                    {book.available ? (
                      <>
                        <CheckCircle size={14} /> Available
                      </>
                    ) : (
                      <>
                        <XCircle size={14} /> Borrowed
                      </>
                    )}
                  </span>
                </div>

                <button className="book-button" onClick={() => handleSelectBook(book)}>
                  {selectedBooks.find((b) => b.id === book.id) ? "Remove" : "Select"}
                </button>
              </div>
            </li>
          ))}
        </ul>

        <BookDetailModal book={selectedBook} onClose={() => setSelectedBook(null)} />
      </div>
    </div>
  );
}