//React
import React from "react";

//CSS
import "./searchInput.scss";

interface Props {
  label: string;
  placehoder: string;
  onClick: () => void;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const SearchImput: React.FC<Props> = ({
  label,
  placehoder,
  onClick,
  onChange
}) => {
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      onClick();
    }
  };
  return (
    <div className="wrapperSearch">
      <img src="/assets/icons/Search.svg" alt="Icon" className="iconSearch" />
      <input
        className="textInput"
        placeholder={placehoder}
        onChange={onChange}
        onKeyDown={handleKeyDown}
      />
      <button className="buttonSearch" onClick={onClick}>
        {label}
      </button>
    </div>
  );
};

export default SearchImput;
