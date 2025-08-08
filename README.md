# Library-Book-Explorer

A full-stack web application for exploring, borrowing, and managing books in a library.  
Built with **React.js** on the frontend and **Flask** on the backend, this system allows users to:

-  Search and filter books
-  View book details
-  Borrow and return books
-  Track their borrowing status
-  Add new books,Delete existing ones and Update books info

  ## Tech Stack

| Layer      | Technology            |
|------------|------------------------|
| Frontend   | React.js, HTML/CSS     |
| Backend    | Flask (Python)         |
| Styling    | CSS  Modules           |
| Database   | MySQL                  |
| Charting	 | Recharts               |
| State Mgmt | React Hooks            |
| Routing	   | React Router DOM       |
| Package Mgmt |npm                   |
| Data Source|	books.csv             |
| Environment|Python venv, Node.js    |
|Version Control|	Git & GitHub        |


---

##  Getting Started

###  Clone the repository

```bash
git clone https://github.com/yourusername/library-book-explorer.git
cd library-book-explorer

### Backend Setup (Flask)
cd backend
python -m venv venv
venv\Scripts\activate   # Windows
pip install -r requirements.txt
python app.py

### Frontend Setup (React)
cd ../frontend
npm install
npm start




