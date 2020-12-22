import React from "react";
import PropTypes from "prop-types";
import { PaginationButton } from "../PaginationButton/PaginationButton";
import { ListItemCard } from "../ListSection/ListItemCard/ListItemCard";
import SVGIcon from "../SVGIcon/SVGIcon";
import "./pagination.scss";

export class Pagination extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cards: this.props.list,
      currentPage: 1,
      cardsPerPage: 6,
      upperPageBound: 3,
      lowerPageBound: 0,
      isPrevBtnActive: "disabled",
      isNextBtnActive: "",
      pageBound: 3,
    };

    this.handleClick = this.handleClick.bind(this);
    this.btnDecrementClick = this.btnDecrementClick.bind(this);
    this.btnIncrementClick = this.btnIncrementClick.bind(this);
    this.btnNextClick = this.btnNextClick.bind(this);
    this.btnPrevClick = this.btnPrevClick.bind(this);
    this.setPrevAndNextBtnClass = this.setPrevAndNextBtnClass.bind(this);
  }

  handleClick(e) {
    let listId = Number(e.target.id);
    this.setState({
      currentPage: listId,
    });
    this.setPrevAndNextBtnClass(listId);
  }

  setPrevAndNextBtnClass(listId) {
    let totalPage = Math.ceil(
      this.state.cards.length / this.state.cardsPerPage
    );
    this.setState({ isNextBtnActive: "disabled" });
    this.setState({ isPrevBtnActive: "disabled" });

    if (totalPage === listId && totalPage > 1) {
      this.setState({ isPrevBtnActive: "" });
    } else if (listId === 1 && totalPage > 1) {
      this.setState({ isNextBtnActive: "" });
    } else if (totalPage > 1) {
      this.setState({ isNextBtnActive: "" });
      this.setState({ isPrevBtnActive: "" });
    }
  }

  btnIncrementClick() {
    this.setState({
      upperPageBound: this.state.upperPageBound + this.state.pageBound,
    });
    this.setState({
      lowerPageBound: this.state.lowerPageBound + this.state.pageBound,
    });

    let listId = this.state.upperPageBound + 1;
    this.setState({ currentPage: listId });
    this.setPrevAndNextBtnClass(listId);
  }

  btnDecrementClick() {
    this.setState({
      upperPageBound: this.state.upperPageBound - this.state.pageBound,
    });
    this.setState({
      lowerPageBound: this.state.lowerPageBound - this.state.pageBound,
    });
    let listId = this.state.upperPageBound - this.state.pageBound;
    this.setState({ currentPage: listId });
    this.setPrevAndNextBtnClass(listId);
  }

  btnPrevClick() {
    if ((this.state.currentPage - 1) % this.state.pageBound === 0) {
      this.setState({
        upperPageBound: this.state.upperPageBound - this.state.pageBound,
      });
      this.setState({
        lowerPageBound: this.state.lowerPageBound - this.state.pageBound,
      });
    }

    let listId = this.state.currentPage - 1;
    this.setState({ currentPage: listId });
    this.setPrevAndNextBtnClass(listId);
  }

  btnNextClick() {
    if (this.state.currentPage + 1 > this.state.upperPageBound) {
      this.setState({
        upperPageBound: this.state.upperPageBound + this.state.pageBound,
      });
      this.setState({
        lowerPageBound: this.state.lowerPageBound + this.state.pageBound,
      });
    }

    let listId = this.state.currentPage + 1;
    this.setState({ currentPage: listId });
    this.setPrevAndNextBtnClass(listId);
  }

  render() {
    const {
      cards,
      currentPage,
      cardsPerPage,
      upperPageBound,
      lowerPageBound,
      isPrevBtnActive,
      isNextBtnActive,
    } = this.state;

    const indexOfLastCard = currentPage * cardsPerPage;
    const indexOfFirstCard = indexOfLastCard - cardsPerPage;
    const currentCards = cards.slice(indexOfFirstCard, indexOfLastCard);

    const renderCards = Object.keys(currentCards).map((key, index) => {
      return (
        <ListItemCard
          key={index}
          image={currentCards[key].image}
          author={currentCards[key].author}
          brand={currentCards[key].brand}
          title={currentCards[key].title}
          name={currentCards[key].name}
          bookedUntil={currentCards[key].bookedUntil}
          rating={currentCards[key].rating}
          quantity={currentCards[key].quantity}
        />
      );
    });

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(cards.length / cardsPerPage); i++) {
      pageNumbers.push(i);
    }

    const renderPageNumbers = pageNumbers.map((number) => {
      if ((number === 1 && currentPage === 1) || number === currentPage) {
        return (
          <PaginationButton
            key={number}
            id={number}
            className="pagination__button--active"
            handleClick={this.handleClick}
          >
            {number}
          </PaginationButton>
        );
      } else if (number < upperPageBound + 1 && number > lowerPageBound) {
        return (
          <PaginationButton
            key={number}
            id={number}
            className="pagination__button--numbered"
            handleClick={this.handleClick}
          >
            {number}
          </PaginationButton>
        );
      }
    });

    let pageIncrementBtn = null;
    if (pageNumbers.length > upperPageBound) {
      pageIncrementBtn = (
        <PaginationButton
          className="pagination__button--numbered"
          handleClick={this.btnIncrementClick}
        >
          &hellip;
        </PaginationButton>
      );
    }

    let pageDecrementBtn = null;
    if (lowerPageBound >= 1) {
      pageDecrementBtn = (
        <PaginationButton
          className="pagination__button--numbered"
          handleClick={this.btnDecrementClick}
        >
          &hellip;
        </PaginationButton>
      );
    }

    let renderPrevBtn = null;
    if (isPrevBtnActive === "disabled") {
      renderPrevBtn = (
        <PaginationButton className="pagination__button">
          <SVGIcon name="buttonArrow" />
        </PaginationButton>
      );
    } else {
      renderPrevBtn = (
        <PaginationButton
          className="pagination__button"
          handleClick={this.btnPrevClick}
        >
          <SVGIcon name="buttonArrow" />
        </PaginationButton>
      );
    }

    let renderNextBtn = null;
    if (isNextBtnActive === "disabled") {
      renderNextBtn = (
        <PaginationButton className="pagination__button--right">
          <SVGIcon name="buttonArrow" />
        </PaginationButton>
      );
    } else {
      renderNextBtn = (
        <PaginationButton
          className="pagination__button--right"
          handleClick={this.btnNextClick}
        >
          <SVGIcon name="buttonArrow" />
        </PaginationButton>
      );
    }

    return (
      <div>
        <div className="cards">{renderCards}</div>
        <div className="pagination-area">
          {renderPrevBtn}
          {pageDecrementBtn}
          {renderPageNumbers}
          {pageIncrementBtn}
          {renderNextBtn}
        </div>
      </div>
    );
  }
}

Pagination.propTypes = {
  list: PropTypes.array,
};
