import connection from "./../DataBase.js";

export const getBooks = (req, res) => {
  connection.query("SELECT * FROM Book", (err, result) => {
    if (err) {
      console.error("Database error: ", err);
      return res.status(500).json({ message: "Internal server error" });
    }
    return res.status(200).json(result);
  });
};

export const getBook = (req, res) => {
  const { id } = req.params;
  connection.query(
    "SELECT * FROM Book WHERE Book_ID = ?",
    [id],
    (err, result) => {
      if (err) {
        console.error("Database error: ", err);
        return res.status(500).json({ message: "Internal server error" });
      }
      if (result.length === 0) {
        return res.status(404).json({ message: "Book not found" });
      }
      return res.status(200).json(result[0]);
    }
  );
};
export const getBooksFromTitle = (req, res) => {
  const { title } = req.params;
  const sqlQuery = "SELECT * FROM Book WHERE Title LIKE ?";
  connection.query(sqlQuery, [`%${title}%`], (err, result) => {
    if (err) {
      console.error("Database error: ", err);
      return res.status(500).json({ message: "Internal server error" });
    }
    if (result.length === 0) {
      return res.status(404).json({ message: "Book not found" });
    }
    return res.status(200).json(result);
  });
};

export const getBooksFromAuthor = (req, res) => {
  const { author } = req.params;

  // Check if the author parameter is provided
  if (!author) {
    return res.status(400).json({ message: "Author parameter is required" });
  }

  // SQL query to join Book and Author tables, select books, and match based on the author's full name
  const sqlQuery = `
      SELECT Book.BookID, Book.Title, CONCAT(Author.First_Name, ' ', Author.Last_Name) AS AuthorFullName
      FROM Book
      JOIN Author ON Book.Author = Author.Author_ID
      WHERE CONCAT(Author.First_Name, ' ', Author.Last_Name) LIKE ?
    `;

  // Add wildcards around the author name for partial matching
  const formattedAuthor = `%${author}%`;

  // Execute the query with the formatted author name
  connection.query(sqlQuery, [formattedAuthor], (err, result) => {
    if (err) {
      console.error("Database error: ", err);
      return res.status(500).json({ message: "Internal server error" });
    }
    if (result.length === 0) {
      return res
        .status(404)
        .json({ message: "No books found for the given author" });
    }
    return res.status(200).json(result);
  });
};
export const getBooksFromLanguage = (req, res) => {
  const { language } = req.params;
  connection.query(
    "SELECT * FROM Book WHERE Language = ?",
    [language],
    (err, result) => {
      if (err) {
        console.error("Database error: ", err);
        return res.status(500).json({ message: "Internal server error" });
      }
      if (result.length === 0) {
        return res.status(404).json({ message: "Book not found" });
      }
      return res.status(200).json(result[0]);
    }
  );
};
export const getBooksFromCategory = (req, res) => {
  const { category } = req.params;
  connection.query(
    "SELECT * FROM Book WHERE Category = ?",
    [category],
    (err, result) => {
      if (err) {
        console.error("Database error: ", err);
        return res.status(500).json({ message: "Internal server error" });
      }
      if (result.length === 0) {
        return res.status(404).json({ message: "Book not found" });
      }
      return res.status(200).json(result[0]);
    }
  );
};

export const getBooksFromISBN = (req, res) => {
  const { isbn } = req.params;
  const sqlQuery = "SELECT * FROM Book WHERE ISBN = ?";
  connection.query(sqlQuery, [isbn], (err, result) => {
    if (err) {
      console.error("Database error: ", err);
      return res.status(500).json({ message: "Internal server error" });
    }
    if (result.length === 0) {
      return res.status(404).json({ message: "Book not found" });
    }
    return res.status(200).json(result[0]);
  });
};

export const getBooksFromPublisher = (req, res) => {
  const { publisher } = req.params;
  const sqlQuery = "SELECT * FROM Book WHERE Publisher LIKE  ?";
  connection.query(sqlQuery, [`%${publisher}%`], (err, result) => {
    if (err) {
      console.error("Database error: ", err);
      return res.status(500).json({ message: "Internal server error" });
    }
    if (result.length === 0) {
      return res.status(404).json({ message: "Book not found" });
    }
    return res.status(200).json(result);
  });
};

export const getBooksFromYear = (req, res) => {
  const { year } = req.params;
  connection.query(
    "SELECT * FROM Book WHERE Year = ?",
    [year],
    (err, result) => {
      if (err) {
        console.error("Database error: ", err);
        return res.status(500).json({ message: "Internal server error" });
      }
      if (result.length === 0) {
        return res.status(404).json({ message: "Book not found" });
      }
      return res.status(200).json(result[0]);
    }
  );
};

export const getBooksFromFilters = (req, res) => {
  const { title, author, category, isbn, publisher, year } = req.params;
  connection.query(
    "SELECT * FROM Book WHERE Title = ? AND Author = ? AND Category = ? AND ISBN = ? AND Publisher = ? AND Year = ?",
    [title, author, category, isbn, publisher, year],
    (err, result) => {
      if (err) {
        console.error("Database error: ", err);
        return res.status(500).json({ message: "Internal server error" });
      }
      if (result.length === 0) {
        return res.status(404).json({ message: "Book not found" });
      }
      return res.status(200).json(result[0]);
    }
  );
};

export const addBook = (req, res) => {
  const { Title, Author, Category, ISBN, Publisher, Year } = req.body;
  connection.query(
    "INSERT INTO Book (Title, Author, Category, ISBN, Publisher, Year) VALUES (?, ?, ?, ?, ?, ?)",
    [Title, Author, Category, ISBN, Publisher, Year],
    (err, result) => {
      if (err) {
        console.error("Database error: ", err);
        return res.status(500).json({ message: "Internal server error" });
      }
      return res.status(201).json({ message: "Book added successfully" });
    }
  );
};

export const updateBook = (req, res) => {
  const { id } = req.params;
  const { Title, Author, Category, ISBN, Publisher, Year } = req.body;
  connection.query(
    "UPDATE Book SET Title = ?, Author = ?, Category = ?, ISBN = ?, Publisher = ?, Year = ? WHERE Book_ID = ?",
    [Title, Author, Category, ISBN, Publisher, Year, id],
    (err, result) => {
      if (err) {
        console.error("Database error: ", err);
        return res.status(500).json({ message: "Internal server error" });
      }
      return res.status(200).json({ message: "Book updated successfully" });
    }
  );
};

export const deleteBook = (req, res) => {
  const { id } = req.params;
  connection.query(
    "DELETE FROM Book WHERE Book_ID = ?",
    [id],
    (err, result) => {
      if (err) {
        console.error("Database error: ", err);
        return res.status(500).json({ message: "Internal server error" });
      }
      return res.status(200).json({ message: "Book deleted successfully" });
    }
  );
};
