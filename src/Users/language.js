import React from "react";

const Language = ({ language, setLanguage }) => {

  return (
    <div className="navbar px-0">
      <div className="icons ">
        <img 
          src="../Images/c.png" 
          alt="C" 
          className={`img-fluid compiler_img  ${language === "c" ? "selected" : ""}`} 
          style={{ height: "30px", marginRight: "10px" }} 
          onClick={() => setLanguage("c")} 
          
        />
        <img 
          src="../Images/c-sharp.png" 
          alt="C++" 
          className={`img-fluid compiler_img  ${language === "cpp" ? "selected" : ""}`} 
          style={{ height: "30px", marginRight: "10px" }} 
          onClick={() => setLanguage("cpp")} 
        />
        <img 
          src="../Images/python.png" 
          alt="Python" 
          className={`img-fluid compiler_img ${language === "py" ? "selected" : ""}`} 
          style={{ height: "30px", marginRight: "10px" }} 
          onClick={() => setLanguage("py")} 
        />
        <img 
          src="../Images/java.png" 
          alt="Java" 
          className={`img-fluid compiler_img ${language === "Java" ? "selected" : ""}`} 
          style={{ height: "30px", marginRight: "10px" }} 
          onClick={() => setLanguage("Java")} 
        />
           <img 
          src="../Images/js.png" 
          alt="Js" 
          className={`img-fluid compiler_img ${language === "JavaScript" ? "selected" : ""}`} 
          style={{ height: "30px", marginRight: "10px" }} 
          onClick={() => setLanguage("JavaScript")} 
        />
          <img 
          src="../Images/ruby.png" 
          alt="Ruby" 
          className={`img-fluid compiler_img ${language === "Ruby" ? "selected" : ""}`} 
          style={{ height: "30px", marginRight: "10px" }} 
          onClick={() => setLanguage("Ruby")} 
        />
        
        {/* Add more images for other languages */}
      </div>
    </div>
  );
};

export default Language;

