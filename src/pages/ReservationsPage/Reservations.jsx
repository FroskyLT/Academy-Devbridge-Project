import { useParams } from "react-router-dom";
import React, { useEffect, useState, useMemo } from "react";
import { ListSection } from "components/ListSection/ListSection";
import { SideFilters } from "components/SideFilters/SideFilters";
import Breadcrumbs from "../../components/Breadcrumbs/Breadcrumbs";
import "./reservations.scss";
import SearchSection from "components/SearchSection/SearchSection";
import { TagFilter } from "components/SideFilters/TagFilter";
import {
  SearchBarSearch,
  TagsSearch,
  FilterByTags,
} from "../../components/SearchSection/Search/SearchFunction";
import { ProgressIndicator } from "components/ProgressIndicator/ProgressIndicator";
import Modal from "../../components/Modal/Modal";
import { Button } from "components/Button/Button";
import Divider from "components/Divider/Divider";
import SVGIcon from "components/SVGIcon/SVGIcon";

const useFetch = (url) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchMyAPI() {
      const response = await fetch(url);
      const data = await response.json();
      setData(data);
      setLoading(false);
    }

    fetchMyAPI();
  }, [url]);

  return { data, loading };
};

const Reservations = () => {
  const { itemPlural } = useParams();
  let itemSingular;
  if (itemPlural === undefined) itemSingular = "book";
  else
    itemSingular = itemPlural
      .substring(0, itemPlural.length - 1)
      .split(" ")
      .join("");

  const { data, loading } = useFetch(`http://localhost:3008/${itemSingular}s`);

  const keysToSearch =
    itemSingular === "book"
      ? ["title", "author", "genre"]
      : itemSingular === "device"
      ? ["name", "deviceType", "os", "brand"]
      : itemSingular === "meetingRoom"
      ? ["name", "city", "district", "address"]
      : null;

  const searchSectionTagButtons = [
    { buttonText: "All", icon: "none", isSelected: true },
    {
      buttonText: "Favorites",
      icon: "heartBtnBold",
      isSelected: false,
    },
    {
      buttonText: "Available",
      icon: "available",
      isSelected: false,
    },
  ];

  //object for filter collecstion
  const [filterList, setFilterList] = useState({});

  //modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);

  //search bar related states
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState("");
  const [searchValue, setSearchValue] = useState("All");

  //Search section tag buttons
  const [SearchSectionTags, setSearchSectionTags] = useState(
    searchSectionTagButtons
  );

  //handle "Results For" label
  const handleResultsFor = (searchTerm) => {
    searchTerm.trim() === ""
      ? setSearchValue("All")
      : setSearchValue(searchTerm.trim());
  };

  let results;
  let tagsList;
  let resultsByTags;

  //handle Search Tags clicking
  const handleTagSearch = (
    searchTags,
    searchTerm,
    dataToSearchIn,
    arrOfKeys,
    i
  ) => {
    tagsList = TagsSearch(i, searchTags);
    setSearchSectionTags(tagsList);
    resultsByTags = FilterByTags(tagsList, dataToSearchIn);
    results = SearchBarSearch(searchTerm, resultsByTags, arrOfKeys);
    setSearchResults(results);
    handleResultsFor(searchTerm);
  };

  //handle Search Bar Results
  const handleBarSearch = (tagsList, searchTerm, dataToSearchIn, arrOfKeys) => {
    resultsByTags = FilterByTags(tagsList, dataToSearchIn);
    results = SearchBarSearch(searchTerm, resultsByTags, arrOfKeys);
    setSearchResults(results);
    handleResultsFor(searchTerm);
  };

  //search bar input value handler
  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };
  //search bar cancel icon handler
  const handleCancelClick = () => {
    setSearchTerm("");
    handleBarSearch(SearchSectionTags, "", productList, keysToSearch);
  };

  //add new filter if it's not already exists
  const addItemToFilterList = (key, title) => {
    const isKey = Object.keys(filterList).some((item) => key === item);

    if (isKey) {
      setFilterList((prevFilterList) => {
        let filteredList = prevFilterList[key].filter((item) => item !== title);
        return { ...prevFilterList, [key]: [...filteredList, title] };
      });
    } else {
      setFilterList((prevFilterList) => {
        return { ...prevFilterList, [key]: [title] };
      });
    }
  };

  //delete filter if checkbox is unchecked
  const deleteItemFromFilterList = (key, title) => {
    setFilterList((prevFilterList) => {
      let filteredList = prevFilterList[key].filter((item) => item !== title);
      return { ...prevFilterList, [key]: [...filteredList] };
    });
  };

  //clear all items from selected list
  const clearFilterList = (key) =>
    setFilterList((prevFilterList) => {
      return { ...prevFilterList, [key]: [] };
    });

  const productList = useMemo(() => {
    return TagFilter(data[`${itemSingular}List`], filterList);
  }, [data, filterList, itemSingular]);

  useEffect(() => {
    setSearchResults(productList);
  }, [productList]);

  return loading ? (
    <ProgressIndicator message="Loading..." />
  ) : (
    <div className="reservations">
      <Breadcrumbs />
      <header>
        <h1 className="reservations__header">
          {itemPlural ? itemPlural.substring(0, itemPlural.length - 1) : null}{" "}
          reservations
        </h1>
      </header>
      <SearchSection
        inputValue={searchTerm}
        handleChange={handleChange}
        handleCancelClick={handleCancelClick}
        handleSearch={() =>
          handleBarSearch(
            SearchSectionTags,
            searchTerm,
            productList,
            keysToSearch
          )
        }
        tagButtons={SearchSectionTags}
        handleTagButtonClick={(i) =>
          handleTagSearch(
            SearchSectionTags,
            searchTerm,
            productList,
            keysToSearch,
            i
          )
        }
      />
      <section className="reservations__section reservations__section--column">
        <aside className="reservations__side-filters">
          <SideFilters
            filterCategories={data.filterCategories}
            filterList={filterList}
            addItemToFilterList={addItemToFilterList}
            clearFilterList={clearFilterList}
            deleteItemFromFilterList={deleteItemFromFilterList}
          />
        </aside>
        <section className="reservations__list">
          <ListSection
            productList={searchResults}
            filterList={filterList}
            deleteItemFromFilterList={deleteItemFromFilterList}
            searchValue={searchValue}
            openModal={() => setIsModalOpen(true)}
          />
          <Modal
            open={isModalOpen}
            heading={"Book"}
            onClose={() => {
              setIsModalOpen(false);
            }}
          >
            <Divider />
            <h1 className="modal__section-heading">Privacy policy</h1>
            <p className="modal__paragraph">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam
              luctus commodo imperdiet. Proin vel porta libero. Integer magna
              nunc, dapibus et nunc eu, scelerisque laoreet mi. Aliquam
              ullamcorper nec sem at tincidunt. Curabitur facilisis vehicula dui
              porta commodo. Suspendisse gravida sollicitudin diam, sit amet
              feugiat nisl ullamcorper quis. Nulla varius, risus et cursus
              tristique, augue ante scelerisque lorem, ac fringilla erat ligula
              nec odio. Praesent luctus eget diam et tristique. Suspendisse
              potenti. Vestibulum sed imperdiet libero. In sagittis nunc vitae
              dapibus finibus. Sed aliquet tortor orci, tristique ultricies
              turpis vulputate vitae. Sed interdum ligula vitae sollicitudin
              lobortis. Proin non eros metus. Aliquam elit lectus, convallis vel
              risus in, porttitor pretium odio. Phasellus pharetra lacus et dui
              vulputate mattis auctor et arcu. Donec laoreet sit amet justo at
              semper. Vivamus mollis blandit bibendum. Etiam rutrum interdum
              turpis ac facilisis. Duis egestas massa at congue fringilla.
              Interdum et malesuada fames ac ante ipsum primis in faucibus.
              Nulla ut nisi erat. Etiam sem dui, porta ac auctor ac, condimentum
              eu purus. Nunc quis pretium mauris. Mauris id urna cursus, dapibus
              ante id, tincidunt ligula. Fusce vulputate rutrum sollicitudin.
              Nulla congue eu risus quis sodales. Etiam nec nunc vel ex faucibus
              dictum. Nulla consectetur risus quam, vel consequat mauris sodales
              in. Aliquam at sapien congue, porta est et, posuere sapien.
              Suspendisse potenti. Donec eget imperdiet libero, vel aliquet
              neque. Maecenas sit amet ipsum eros. Pellentesque semper felis
              tempus auctor fermentum. Vestibulum in magna vestibulum, efficitur
              justo ut, dictum erat. Suspendisse ac arcu sodales, pretium neque
              sit amet, tincidunt enim. Sed velit dui, elementum eget suscipit
              id, iaculis sit amet nisl. Vestibulum ante ipsum primis in
              faucibus orci luctus et ultrices posuere cubilia curae; Nunc
              dignissim fermentum lorem eu elementum. Integer quis pretium
              massa. Ut lectus augue, egestas ac justo at, consequat condimentum
              felis. Pellentesque habitant morbi tristique senectus et netus et
              malesuada fames ac turpis egestas. Sed aliquet augue sed tincidunt
              pretium.
            </p>
            <div className="modal__interaction">
              <label className="checkbox">
                <input
                  type="checkbox"
                  id="Agree"
                  className="checkbox__original"
                  onChange={() => setIsCheckboxChecked(!isCheckboxChecked)}
                  checked={isCheckboxChecked}
                />
                <span className="checkbox__custom" />
                <span className="checkbox__check">
                  <SVGIcon name="check" />
                </span>
                <label htmlFor={"Agree"} className="checkbox__text">
                  {"Agree and proceed"}
                </label>
              </label>
              <Button
                className={
                  isCheckboxChecked
                    ? "button button--enabled"
                    : "button button--disabled"
                }
                handleClick={() => setIsModalOpen(!isModalOpen)}
                isDisabled={!isCheckboxChecked}
              >
                Book
              </Button>
            </div>
          </Modal>
        </section>
      </section>
    </div>
  );
};

export default Reservations;
