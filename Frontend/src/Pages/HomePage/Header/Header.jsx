import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import Book1 from "./../../../Images/Img_01.jpg";
import Book2 from "./../../../Images/Img_02.jpeg";
import Book3 from "./../../../Images/Img_03.jpg";
import Book4 from "./../../../Images/Img_04.jpeg";
import Book5 from "./../../../Images/Img_05.jpeg";
import Book6 from "./../../../Images/Img_06.jpeg";
import Book7 from "./../../../Images/Img_07.jpg";
import Book8 from "./../../../Images/Img_08.jpg";

function Header() {
  const bookImages = [Book1, Book2, Book3, Book4, Book5, Book6, Book7, Book8];

  return (
    <div className="header-container" data-testid="header-container">
      <div className="header-left" data-testid="header-left">
        <div>
          <h1 className="header-h1" data-testid="header-h1">
            You Deserve <br />
            The Best Books <br />
          </h1>
          <h5 data-testid="header-h5">
            Being involved in education dedicatedly <br />
            is a good meditation for years.
          </h5>
          <div className="header-page-button" data-testid="header-page-button">
            <Link to={"/searchbooks"} className="button-link" data-testid="searchbooks-link">
              <button className="header-search-button" data-testid="search-button">
                Search Books
              </button>
            </Link>
          </div>
        </div>
      </div>
      <div className="header-right" data-testid="header-right">
        <div className="books-container" data-testid="books-container">
          {bookImages.map((src, index) => (
            <img
              key={index}
              src={src}
              alt={`Book ${index + 1}`}
              className="book-cover"
              data-testid={`book-cover-${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Header;
