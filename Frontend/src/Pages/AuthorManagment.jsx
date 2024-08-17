import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import PaginationButtons from "../Components/PaginationButtons";
import "./../Styles/AuthorManagment.css";
import DeleteModal from "./../Components/Modals/DeleteModal";
import AddAuthorPopup from "../Components/Popup/AddAuthorPopup/AddAuthorPopup";
import UpdateAuthorPopup from "../Components/Popup/UpdataAuthorPopup/UpdateAuthorPopup";

function AuthorManagment() {
  const [authors, setAuthors] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isAddAuthorOpen, setIsAddAuthorOpen] = useState(false);
  const [isUpdateAuthorOpen, setIsUpdateAuthorOpen] = useState(false);
  const [selectedAuthorId, setSelectedAuthorId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [authorIdToDelete, setAuthorIdToDelete] = useState(null);

  useEffect(() => {
    fetchAuthors();
  }, [searchQuery]);

  const fetchAuthors = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/author/");
      setAuthors(response.data);
    } catch (error) {
      console.error("Error fetching authors:", error);
    }
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    setCurrentPage(1);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const toggleAddAuthorPopup = () => {
    setIsAddAuthorOpen(!isAddAuthorOpen);
  };

  const toggleUpdateAuthorPopup = (authorId) => {
    //console.log(authorId);
    setIsUpdateAuthorOpen(!isUpdateAuthorOpen);
    setSelectedAuthorId(authorId);
  };

  const filteredAuthors = authors.filter(
    (author) =>
      author.First_Name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      author.Last_Name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const authorsPerPage = 10;
  const indexOfLastAuthor = currentPage * authorsPerPage;
  const indexOfFirstAuthor = indexOfLastAuthor - authorsPerPage;
  const currentAuthors = filteredAuthors.slice(
    indexOfFirstAuthor,
    indexOfLastAuthor
  );
  const totalPages = Math.ceil(filteredAuthors.length / authorsPerPage);

  const handleDelete = (id) => {
    setAuthorIdToDelete(id);
    setShowModal(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await axios.delete(
        `http://localhost:5000/api/author/${authorIdToDelete}`
      );
      setAuthors((prevAuthors) =>
        prevAuthors.filter((author) => author.Author_ID !== authorIdToDelete)
      );
    } catch (error) {
      console.error("Failed to delete author. Please try again.");
    } finally {
      setShowModal(false);
      setAuthorIdToDelete(null);
    }
  };

  return (
    <div className="author-managment-outer">
      <div className="author-managment-container">
        <h2>Author Management</h2>
        <div className="author-managment-buttons">
          <button className="add-author-button" onClick={toggleAddAuthorPopup}>
            Add Author
          </button>
        </div>
        <div className="author-managment-search">
          <input
            type="text"
            placeholder="Search authors..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="search-author"
          />
        </div>
        <div className="authors-table">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Address</th>
                <th>Mobile</th>
                <th>NIC</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentAuthors.map((author) => (
                <tr key={author.Author_ID}>
                  <td>{author.Author_ID}</td>
                  <td>{author.First_Name}</td>
                  <td>{author.Last_Name}</td>
                  <td>{author.Email}</td>
                  <td>{author.Address}</td>
                  <td>{author.Mobile}</td>
                  <td>{author.NIC}</td>
                  <td className="action-column">
                    <button
                      className="update-author-button"
                      onClick={() => toggleUpdateAuthorPopup(author.Author_ID)}
                    >
                      Update
                    </button>
                    <button
                      className="delete-author-button"
                      onClick={() => handleDelete(author.Author_ID)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="pagination">
          <PaginationButtons
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
        {isAddAuthorOpen && (
          <AddAuthorPopup
            toggleAddAuthorPopup={toggleAddAuthorPopup}
            //fetchAuthors={fetchAuthors}
          />
        )}
        {isUpdateAuthorOpen && (
          <UpdateAuthorPopup
            toggleUpdateAuthorPopup={toggleUpdateAuthorPopup}
            //fetchAuthors={fetchAuthors}
            authorId={selectedAuthorId}
          />
        )}

        {showModal && (
          <DeleteModal
            onClose={() => setShowModal(false)}
            onConfirm={handleConfirmDelete}
          />
        )}
      </div>
    </div>
  );
}

export default AuthorManagment;
