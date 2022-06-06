import React from "react";
import Select from "react-select";
import {Toaster, toast} from "react-hot-toast";
import {IoIosSearch} from "react-icons/io";
import styled from "styled-components";

import {groupEntriesByKey} from "util/Functions";
import {colors} from "util/Styles";

const baseDarkSelect = {
    // Menu option
    option: (provided, state) => ({
        ...provided,
        color: state.isSelected ? '#738daf' : '#fff',
        background: state.isFocused ? colors.base300 : colors.base100,
        ":active": {
            backgroundColor: "#1c1c1c",
        }
    }),

    // The menu box
    menu: (provided) => ({
        ...provided,
        borderRadius: 2,
        fontSize: ".9em",
        background: colors.base100,
        boxShadow: "0 2px 10px 3px rgba(0, 0, 0, 0.35)",
        paddingLeft: "4px",
        paddingRight: "4px",
    }),

    // The input bar
    control: (provided) => ({
        ...provided,
        width: "100%",
        borderRadius: 5,
        background: colors.base300,
        minHeight: "42px",
        border: `1px solid rgba(79, 79, 79, .22)`,
        "&:hover": {
            borderColor: "#5B5B5B",
        }
    }),
    input: (provided) => ({
        ...provided,
        color: "#dedede",
    }),
    singleValue: (provided, state) => ({
        ...provided,
        color: "#bdbdbd",
        opacity: state.isDisabled ? 0.1 : 1,
        transition: "opacity 300ms",
    }),
    placeholder: (provided) => ({
        ...provided,
        color: "#C6C6C6",
        fontWeight: 600,
    }),
    dropdownIndicator: (provided) => ({
        ...provided,
        color: "#696969",
    }),
    indicatorSeparator: (provided) => ({
        ...provided,
        display: "none",
    }),
}

// Create search bar variant
const searchDarkSelect = {...baseDarkSelect};
searchDarkSelect.dropdownIndicator = () => ({display: "None"})
searchDarkSelect.control = (provided) => ({
    ...provided,
    width: "100%",
    borderRadius: 5,
    background: colors.base300,
    minHeight: "42px",
    paddingLeft: "30px",
    border: `1px solid rgba(79, 79, 79, .22)`,
    "&:hover": {
        borderColor: "#5B5B5B",
    }
});

// Text separator
const groupStyles = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
};

const formatGroupLabel = (data) => (
    <div style={groupStyles}>
        <span>{data.label}</span>
    </div>
)

// Select container
const SelectContainer = styled.div`
  text-align: left;
  margin-left: auto;
  margin-right: auto;
  display: grid;
  grid-template-columns: 70% 30%;
  z-index: 30;
  position: relative;

  @media (max-width: 640px) {
    grid-template-columns: auto;
  }
`;


// Search icon
const SearchIcon = styled(IoIosSearch)`
  font-size: 1.5em;
  left: 10px;
  top: 17px;
  position: absolute;
  z-index: 1;
  color: rgba(255, 255, 255, 0.20);

  @media (max-width: 640px) {
    top: 9px;
  }
`

const ModeFilter = (props) => {

    // Titles
    let titleOptions = [];
    props.titles.forEach((title) => {
            titleOptions.push({label: title.charAt(0).toUpperCase() + title.slice(1), value: title})
        }
    );
    titleOptions = [
        {
            label: "All",
            value: "all",
        },
        {
            label: "Title",
            options: titleOptions
        },
    ];

    const updateSelectedTitle = (e) => {
        if (e.value === "all") {
            props.setGroupBy("genre");
            props.setFilterValue("all");
            return;
        }
        props.setGroupBy("title");
        props.setFilterValue(e.value);
    };

    // Categories
    let genreOptions = [];
    props.categories.forEach((category) => {
            genreOptions.push({label: category.charAt(0).toUpperCase() + category.slice(1), value: category})
        }
    );

    const groupedCategoryOptions = [
        {
            label: "All",
            value: "all",
        },
        {
            label: "Genre",
            options: genreOptions
        },
        {
            label: "Difficulty",
            options: [
                {label: "Easy", value: 1},
                {label: "Normal", value: 2},
                {label: "Hard", value: 3}
            ],
        }
    ];

    const updateSelectedCategory = (e) => {
        let groupBy;
        let filterKey;
        // Get all GroupBy identifiers (genre, difficulty...)
        let groupedItems = groupEntriesByKey(groupedCategoryOptions, "label");
        let keys = Object.keys(groupedItems);

        keys.forEach(c => {
            let insideKey = groupedItems[c][0];
            if (insideKey.label === "All") {
                groupBy = "genre";
                filterKey = "all";
            } else {
                insideKey.options.forEach(opt => {
                    if (opt.value === e.value) {
                        groupBy = insideKey.label.toLowerCase();
                        filterKey = e.value;
                    }
                });
            }
        });

        if (groupBy === null) {
            toast.error("Could not filter!");
            return;
        }

        props.setGroupBy(groupBy);
        props.setFilterValue(e.value);
    }

    return (
        <div>
            <Toaster position="top-center" reverseOrder={false} options={{zIndex: 5000}}/>
            <SelectContainer className="container">
                <div>
                    <SearchIcon/>
                    <Select
                        className="mt-0 sm:mt-2"
                        options={titleOptions}
                        placeholder="Search"
                        styles={searchDarkSelect}
                        onChange={(e) => updateSelectedTitle(e)}
                        formatGroupLabel={formatGroupLabel}/>
                </div>

                <Select
                    className="mt-2 ml-0 sm:ml-2"
                    options={groupedCategoryOptions}
                    placeholder="Filter by..."
                    styles={baseDarkSelect}
                    onChange={(e) => updateSelectedCategory(e)}
                    formatGroupLabel={formatGroupLabel}/>
            </SelectContainer>
        </div>
    );
}

export default ModeFilter;
