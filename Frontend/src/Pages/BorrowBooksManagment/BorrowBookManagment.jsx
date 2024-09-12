import React, { useState, useEffect } from "react";
import axios from "axios";
import "./BorrowBookManagment.css";
import PaginationButtons from "../../Components/Pagination/PaginationButtons/PaginationButtons";
import AddBorrows from "../../Components/AddBorrow/AddBorrows";
import ReturnBookPopup from "./../../Components/Popup/ReturnBook/ReturnBookPopup";

function BorrowBookManagement() {
  const [borrows, setBorrows] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isAddBorrowOpen, setIsAddBorrowOpen] = useState(false);
  const [showReturnModal, setShowReturnModal] = useState(false);
  const [selectedBorrowId, setSelectedBorrowId] = useState(null);

  const itemsPerPage = 10;

  const fetchBorrows = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/borrow");
      const formattedData = response.data.map((borrow) => ({
        ...borrow,
        Borrow_Date: new Date(borrow.Borrow_Date).toISOString().split("T")[0],
        Return_Date: borrow.Return_Date
          ? new Date(borrow.Return_Date).toISOString().split("T")[0]
          : null,
      }));
      setBorrows(formattedData);
    } catch (error) {
      console.error("Error fetching borrows:", error);
    }
  };

  useEffect(() => {
    fetchBorrows();
  }, []);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    setCurrentPage(1);
  };

  const filteredBorrows = borrows.filter(
    (borrow) =>
      borrow.User_ID &&
      borrow.User_ID.toString()
        .toLowerCase()
        .includes(searchQuery.toLowerCase())
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredBorrows.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredBorrows.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const confirmReturn = (id) => {
    setSelectedBorrowId(id);
    setShowReturnModal(true);
  };

  const toggleAddPopup = () => {
    setIsAddBorrowOpen(!isAddBorrowOpen);
  };

  const toggleReturnPopup = () => {
    setShowReturnModal(!showReturnModal);
  };

  return (
    <div className="view-authors-container">
      <div className="book-management-image">
        <h2>Borrow Books Management</h2>
      </div>
      <div className="book-management-buttons">
        <button className="book-add" onClick={toggleAddPopup}>
          Borrow Book
        </button>
      </div>
      <div className="book-management-search">
        <input
          type="text"
          placeholder="Enter User ID"
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </div>
      <div className="book-management-table">
        <table>
          <thead>
            <tr>
              <th>Borrow ID</th>
              <th>User ID</th>
              <th>Book ID</th>
              <th>Borrow Date</th>
              <th>Borrow Time</th>
              <th>Return Date</th>
              <th>isComplete</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((borrow) => (
              <tr key={borrow.Borrow_ID}>
                <td>{borrow.Borrow_ID}</td>
                <td>{borrow.User_ID}</td>
                <td>{borrow.Book_ID}</td>
                <td>{borrow.Borrow_Date}</td>
                <td>{borrow.Borrow_Time}</td>
                <td>{borrow.Return_Date}</td>
                <td>
                  {borrow.isComplete === 1 ? "Complete" : "Not yet Returned"}
                </td>
                <td className="action-column">
                  <button
                    className="action-button return-button"
                    onClick={() => confirmReturn(borrow.Borrow_ID)}
                    disabled={borrow.isComplete === 1}
                  >
                    Return
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
      {isAddBorrowOpen && <AddBorrows onClose={toggleAddPopup} />}
      {showReturnModal && (
        <ReturnBookPopup
          onClose={toggleReturnPopup}
          borrowId={selectedBorrowId}
          fetchBorrows={fetchBorrows} // Pass fetchBorrows to refresh data
        />
      )}
    </div>
  );
}

export default BorrowBookManagement;
