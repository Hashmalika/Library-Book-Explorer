import decimal
from flask import Flask, jsonify, request
from flask_cors import CORS
import mysql.connector

app = Flask(__name__)
CORS(app)

# DB connection
def get_db_connection():
    return mysql.connector.connect(
        host="localhost",
        user="root",
        password="Hash@sql1416",
        database="library"
    )

@app.route('/')
def home():
    return "✅ Library Backend is Running!"

@app.route('/api/books', methods=['GET', 'POST'])
def books():
    if request.method == 'GET':
        conn = get_db_connection()
        cursor = conn.cursor(dictionary=True)
        cursor.execute("SELECT * FROM books")
        books = cursor.fetchall()
        conn.close()

        # Normalize types
        for book in books:
            if isinstance(book["price"], decimal.Decimal):
                book["price"] = float(book["price"])
            book["available"] = bool(book["available"])

        return jsonify(books)

    if request.method == 'POST':
        data = request.get_json()
        conn = get_db_connection()
        cursor = conn.cursor()

        query = """
        INSERT INTO books (id, title, author, genre, price, publish_date, available)
        VALUES (%s, %s, %s, %s, %s, %s, %s)
        """
        values = (
            data.get('id'),
            data.get('title'),
            data.get('author'),
            data.get('genre'),
            data.get('price'),
            data.get('publishDate'),
            int(data.get('available'))
        )

        try:
            cursor.execute(query, values)
            conn.commit()
            conn.close()
            return jsonify({"success": True, "message": "Book added successfully", "book": data})
        except Exception as e:
            conn.close()
            return jsonify({"success": False, "message": str(e)}), 500

@app.route('/api/books/<int:book_id>', methods=['DELETE'])
def delete_book(book_id):
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("DELETE FROM books WHERE id = %s", (book_id,))
    conn.commit()
    conn.close()
    return jsonify({"success": True, "message": f"Book {book_id} deleted"})


@app.route('/api/books/<int:book_id>', methods=['PUT'])
def update_book(book_id):
    data = request.get_json()
    conn = get_db_connection()
    cursor = conn.cursor()

    query = """
    UPDATE books
    SET title = %s, price = %s, rating = %s, available = %s
    WHERE id = %s
    """
    values = (
        data.get('title'),
        data.get('price'),
        data.get('rating'),
        int(data.get('available')),
        book_id
    )

    try:
        cursor.execute(query, values)
        conn.commit()
        conn.close()
        return jsonify({"success": True, "message": f"Book {book_id} updated successfully"})
    except Exception as e:
        conn.close()
        return jsonify({"success": False, "message": str(e)}), 500


@app.route('/api/borrow/<int:book_id>', methods=['POST'])
def borrow_book(book_id):
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("UPDATE books SET available = FALSE WHERE id = %s", (book_id,))
    conn.commit()
    conn.close()
    return jsonify({"success": True, "message": f"Book {book_id} marked as borrowed"})

@app.route('/api/return/<int:book_id>', methods=['POST'])
def return_book(book_id):
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("UPDATE books SET available = TRUE WHERE id = %s", (book_id,))
    conn.commit()
    conn.close()
    return jsonify({"success": True, "message": f"Book {book_id} marked as returned"})

if __name__ == '__main__':
    app.run(debug=True)
