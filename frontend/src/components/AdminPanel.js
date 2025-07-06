import { useState } from "react";
// import Select from "react-select";

// const availabilityOptions = [
//   { value: true, label: "Available" },
//   { value: false, label: "Borrowed" }
// ];



export default function AdminPanel({ onBookAdded, onBookDeleted }) {
  const [newBook, setNewBook] = useState({
    id: "",
    title: "",
    author: "",
    genre: "",
    price: "",
    publishDate: "",
    available: true,
    rating: ""
  });

  const [updateData, setUpdateData] = useState({
    id: "",
    title: "",
    price: "",
    rating: "",
    available: true
  });

  const [viewMode, setViewMode] = useState("add"); // or "update"
   

 


  const handleAdd = async () => {
    const { id, title, author, genre, price, publishDate, available, rating } = newBook;

    if (!id || !title || !genre || !price || !author || !publishDate || !rating) {
      alert("Please fill all fields");
      return;
    }

    try {
      const response = await fetch("http://127.0.0.1:5000/api/books", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...newBook,
          price: parseFloat(price),
          rating: parseFloat(rating),
          available: available === "true" || available === true,
        }),
      });

      if (response.ok) {
        const addedBook = await response.json();
        onBookAdded(addedBook);
        alert("Book added successfully");
        setNewBook({
          id: "",
          title: "",
          author: "",
          genre: "",
          price: "",
          publishDate: "",
          available: true,
          rating: ""
        });
      } else {
        alert("Failed to add book");
      }
    } catch (err) {
      console.error(err);
      alert("Error adding book");
    }
  };

  const handleDelete = async () => {
    if (!newBook.id) {
      alert("Enter the ID of the book to delete");
      return;
    }

    try {
      const response = await fetch(`http://127.0.0.1:5000/api/books/${newBook.id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        onBookDeleted(newBook.id);
        alert("Book deleted successfully");
        setNewBook({ ...newBook, id: "" });
      } else {
        alert("Failed to delete book");
      }
    } catch (err) {
      console.error(err);
      alert("Error deleting book");
    }
  };

  const handleUpdate = async () => {
    const { id, title, price, rating, available } = updateData;

    if (!id || !title || !price || !rating) {
      alert("Please fill all update fields");
      return;
    }

    try {
      const response = await fetch(`http://127.0.0.1:5000/api/books/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          price: parseFloat(price),
          rating: parseFloat(rating),
          available: available === "true" || available === true
        }),
      });

      const result = await response.json();

      if (response.ok) {
        alert(result.message || "Book updated successfully");
        onBookAdded();
        setUpdateData({
          id: "",
          title: "",
          price: "",
          rating: "",
          available: true
        });
      } else {
        alert("Failed to update book: " + result.message);
      }
    } catch (err) {
      console.error(err);
      alert("Error updating book");
    }
  };

  return (
    <div className="admin-panel">
      <h2>Admin Panel</h2>
      
      <div className='section-card'>
        <div className="admin-toggle">
          <button
            className={`toggle-button ${viewMode === "add" ? "active" : ""}`}
            onClick={() => setViewMode("add")}
          >
            Add Book
         </button>
         <button
            className={`toggle-button ${viewMode === "update" ? "active" : ""}`}
           onClick={() => setViewMode("update")}
          >
            Update Book
          </button>
        </div>

        {viewMode === "add" && (
          <div className='section-card-inside'>
         {/* ADD BOOK SECTION */}
            {/* <h3> Add New Book</h3> */}
           <input type="text" placeholder="ID" value={newBook.id} onChange={(e) => setNewBook({ ...newBook, id: e.target.value })} />
           <input type="text" placeholder="Title" value={newBook.title} onChange={(e) => setNewBook({ ...newBook, title: e.target.value })} />
           <input type="text" placeholder="Author" value={newBook.author} onChange={(e) => setNewBook({ ...newBook, author: e.target.value })} />
           <input type="text" placeholder="Genre" value={newBook.genre} onChange={(e) => setNewBook({ ...newBook, genre: e.target.value })} />
           <input type="number" placeholder="Price" value={newBook.price} onChange={(e) => setNewBook({ ...newBook, price: e.target.value })} />
           <input type="date" placeholder="Publish Date" value={newBook.publishDate} onChange={(e) => setNewBook({ ...newBook, publishDate: e.target.value })} />
           <input type="number" step="0.1" min="0" max="5" placeholder="Rating (0-5)" value={newBook.rating} onChange={(e) => setNewBook({ ...newBook, rating: e.target.value })} />
           <select value={newBook.available} onChange={(e) => setNewBook({ ...newBook, available: e.target.value === "true" })}>
             <option value="true">Available</option>
             <option value="false">Borrowed</option>
           </select>
           {/* <Select
             styles={customStyles}
             options={availabilityOptions}        
             value={availabilityOptions.find(opt => opt.value === newBook.available)}
             onChange={(selected) =>
               setNewBook({ ...newBook, available: selected.value })
             }
           /> */}

           <br />
           <button className="admin-button" onClick={handleAdd}>➕ Add Book</button>
           <button className="admin-button" onClick={handleDelete}>🗑️ Delete Book by ID</button>

           <hr />
          </div>
        )}

        {viewMode === "update" && (
          <div className='section-card-inside'>
            {/* UPDATE SECTION */}
            {/* <h3> Update Book</h3> */}
            <input type="text" placeholder="Book ID (to update)" value={updateData.id} onChange={(e) => setUpdateData({ ...updateData, id: e.target.value })} />
            <input type="text" placeholder="Title" value={updateData.title} onChange={(e) => setUpdateData({ ...updateData, title: e.target.value })} />
            <input type="number" placeholder="New Price" value={updateData.price} onChange={(e) => setUpdateData({ ...updateData, price: e.target.value })} />
            <input type="number" step="0.1" min="0" max="5" placeholder="New Rating" value={updateData.rating} onChange={(e) => setUpdateData({ ...updateData, rating: e.target.value })} />
           <select value={updateData.available} onChange={(e) => setUpdateData({ ...updateData, available: e.target.value === "true" })}>
              <option value="true">Available</option>
              <option value="false">Borrowed</option>
           </select>

           {/* <Select
              styles={customStyles}
              options={availabilityOptions}
              // isSearchable={false}
             value={availabilityOptions.find(opt => opt.value === updateData.available)}
             onChange={(selected) =>
                setUpdateData({ ...updateData, available: selected.value })
              }
           /> */}

           <br />
           <button className="admin-button" onClick={handleUpdate}> Update Book</button>
         </div>
        )}
     </div>
   </div>
  );
}
