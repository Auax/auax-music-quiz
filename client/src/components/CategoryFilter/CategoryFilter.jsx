import React from "react";
import Select from "react-select";
import {groupEntriesByKey} from "util/Functions";
import {Toaster, toast} from "react-hot-toast";

const darkStyle = {
    option: (provided, state) => ({
        ...provided,
        color: state.isSelected ? '#738daf' : '#fff',
        background: state.isFocused ? "#16213b" : "#0f172c",
        ":active": {
            backgroundColor: "#0d1526",
        }
    }),
    menu: (provided) => ({
        ...provided,
        borderRadius: 2,
        fontSize: ".9em",
        background: "#0f172c",
        boxShadow: "0 2px 10px 3px rgba(0, 0, 0, 0.35)",
        paddingLeft: "4px",
        paddingRight: "4px",
    }),
    control: (provided) => ({
        ...provided,
        width: "100%",
        borderRadius: 2,
        background: "rgba(10,16,33,0.5)",
        border: "1px solid #1c2136",
        "&:hover": {
            borderColor: "#20263f",
        }
    }),
    input: (provided) => ({
        ...provided,
        color: "#dedede",
    }),
    singleValue: (provided, state) => ({
        ...provided,
        color: "#475483",
        opacity: state.isDisabled ? 0.1 : 1,
        transition: "opacity 300ms",
    }),
    placeholder: (provided) => ({
        ...provided,
        color: "#525e8c"
    }),
    dropdownIndicator: (provided) => ({
        ...provided,
        color: "#3f4364",
    }),
    indicatorSeparator: (provided) => ({
        ...provided,
        background: "#3f4364",
    }),
}

const groupStyles = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
};

const formatGroupLabel = (data) => (
    <div style={groupStyles}>
        <span>{data.label}</span>
    </div>
)

const CategoryFilter = (props) => {

    let genreOptions = [];
    props.categories.forEach((category) => {
            genreOptions.push({label: category.charAt(0).toUpperCase() + category.slice(1), value: category})
        }
    );

    const groupedOptions = [
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
            options: [{label: "Easy", value: 1},
                {label: "Medium", value: 2},
                {label: "Hard", value: 3}],
        }
    ];

    const updateSelected = (e) => {
        let groupBy;
        let filterKey;
        // Get all GroupBy identifiers (genre, difficulty...)
        let groupedItems = groupEntriesByKey(groupedOptions, "label");
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
            <div className="text-white text-left border border-white/10 border-b-0
            bg-base100/30 shadow-lg z-10 relative container px-5 py-5 rounded-t mx-auto"
            style={{
                backdropFilter: "blur(10px) brightness(90%)"
            }}>
                <span className="text-white/50">Filter by:</span>
                <Select
                    className="mt-2"
                    options={groupedOptions}
                    styles={darkStyle}
                    onChange={(e) => updateSelected(e)}
                    formatGroupLabel={formatGroupLabel}
                />
            </div>
        </div>
    );
}

export default CategoryFilter;
