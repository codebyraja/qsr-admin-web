import React from "react";
import ImageWithBasePath from "../../core/img/imagewithbasebath";
import { Sliders } from "react-feather";
import { Select } from "antd";
import { Link } from "react-router-dom";

const SearchForm = () => {
  return (
    <div className="table-top">
      <div className="search-set">
        <div className="search-input">
          <input
            type="text"
            placeholder="Search"
            className="form-control form-control-sm formsearch"
            aria-controls="DataTables_Table_0"
            // value={searchText}
            // onChange={handleSearch}
          />
          <Link to className="btn btn-searchset">
            <i data-feather="search" className="feather-search" />
          </Link>
        </div>
      </div>


      
      {/* <div className="search-path">
        <div className="d-flex align-items-center">
          <div className="search-path">
            <Link
              className={`btn btn-filter ${isFilterVisible ? "setclose" : ""}`}
              id="filter_search"
            >
              <Filter
                className="filter-icon"
                onClick={toggleFilterVisibility}
              />
              <span onClick={toggleFilterVisibility}>
                <ImageWithBasePath
                  src="assets/img/icons/closes.svg"
                  alt="img"
                />
              </span>
            </Link>
          </div>
        </div>
      </div> */}
      <div className="form-sort">
        <Sliders className="info-img" />
        <Select
          className="img-select"
          classNamePrefix="react-select"
        //   options={oldandlatestvalue}
          placeholder="Newest"
        />
      </div>
    </div>
  );
};

export default SearchForm;
