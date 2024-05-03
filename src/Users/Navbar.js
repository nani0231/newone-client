import React from "react";
import Select from "react-select";

const Navbar = ({
  language,
  setLanguage,
  userTheme,
  setUserTheme,
  fontSize,
  setFontSize,
}) => {
  const themes = [
    { value: "vs-dark", label: "Dark" },
    { value: "light", label: "Light" },
  ];
  return (
    <div className="navbar1 ">
      <h3
      className="text-center"
        style={{
          color: "black",
        }}
      >
        Code Play Ground
      </h3>
      {/* <select
        className="mx-2 p-2 w-25"
        value={language}
        onChange={(e) => {
          setLanguage(e.target.value);
          console.log(e.target.value);
        }}
      >
        <option value="c">C</option>
        <option value="cpp">C++</option>
        <option value="py">Python</option>
        <option value="Java">Java</option>
        <option value="JavaScript">JavaScript</option>
        <option value="Ruby">Ruby</option>
      </select> */}



      {/* <Select
        options={themes}
        value={userTheme}
        onChange={(e) => setUserTheme(e.value)}
        placeholder={userTheme}
     
      /> */}
      {/* <label
        style={{
          color: "black",
        }}
      >
        Font Size
      </label>
      <input
        type="range"
        min="18"
        max="30"
        value={fontSize}
        step="2"
        onChange={(e) => {
          setFontSize(e.target.value);
        }}
      /> */}
    </div>
  );
};

export default Navbar;