import React from "react";
import { useState, useEffect } from "react";
import { FaBars } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import sideimage from "../All Images/Logo133.jpeg";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import siva from "../All Images/Siva Image.jpeg";
import Sidebar from "../Sidebar";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import apiList from "../liberary/apiList";
import Cookies from "js-cookie";
import { Audio } from 'react-loader-spinner';

const LearningPathReports = () => {
  const token = Cookies.get("token");
  const navigate = useNavigate();
  const [addblogslist, setAddblogslist] = useState([]);
  const [addblogslist1, setAddblogslist1] = useState([]);
  const [isNavVisible, setIsNavVisible] = useState(false);
  const [showInstitutionsOptions, setShowInstitutionsOptions] = useState(false);
  const [institutetypeCounts, setInstitutetypeCounts] = useState({});
  const [searchQuery, setSearchQuery] = useState('');
	const [worksheetLoading, setWorksheetLoading] = useState(true);
  const [selectedOption, setSelectedOption] = useState("");
  const [filteredData, setFilteredData] = useState(addblogslist);

  console.log(addblogslist)
  const [error, setError] = useState(null);

  const handleLogout = () => {
    Cookies.remove("token");
    navigate("/");
  };

  const toggleNav = () => {
    setIsNavVisible(!isNavVisible);
  };
  useEffect(() => {
    fetchblogs();
    fetchblogs1();
    if (token == undefined) {
      navigate("/");
    }
  }, []);

  const fetchblogs1 = async () => {
    const api = `${apiList.DisplayAllVideos}`;
    const authToken =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiNjRkZGFiYjYwYmUzZWI4NzI5MzM4OGM1IiwiaWF0IjoxNjkyMjQ5MDMyLCJleHAiOjIwNTIyNDkwMzJ9.ow8crNAYgumZNwjGdGxUciJwMXeULHHHKXHWMGmS8zk"; // Replace with your actual authentication token

    try {
      const response = await axios.get(api, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      const data = response.data;
      setAddblogslist1(data);
			setWorksheetLoading(false);
      const institutetypeCounts = {};
      data.forEach((item) => {
        const VideofolderName = item.VideofolderName;
        if (institutetypeCounts[VideofolderName]) {
          institutetypeCounts[VideofolderName] += 1;
        } else {
          institutetypeCounts[VideofolderName] = 1;
        }
      });

      setInstitutetypeCounts(institutetypeCounts);
    } catch (error) {
      console.error("Error fetching blogs:", error);
			setWorksheetLoading(false);
    }
  };

  console.log(institutetypeCounts);

  const fetchblogs = async () => {
    const api = `${apiList.allAddVideosData}`;
  const token = Cookies.get("token");
    try {
      const response = await axios.get(api, {
        headers: {
          token: token,
        },
      });
      setAddblogslist(response.data);
			setWorksheetLoading(false);
    } catch (error) {
      console.error("Error fetching blogs:", error);
			setWorksheetLoading(false);
    }
  };

  const handleSearch = () => {
    let filtered;
    if (selectedOption && selectedOption !== "0") {
      filtered = addblogslist.slice(0, parseInt(selectedOption, 10));
    } else {
      filtered = addblogslist;
    }

    if (searchQuery) {
      filtered = filtered.filter((folder) =>
      folder.VideofolderName.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredData(filtered);
  };
  useEffect(() => {
    handleSearch();
  }, [selectedOption, addblogslist]);

  const handleInputChange = (e) => {
    const term = e.target.value;
    setSearchQuery(term);

    let filtered;
    if (selectedOption && selectedOption !== "0") {
      filtered = addblogslist.slice(0, parseInt(selectedOption, 10));
    } else {
      filtered = addblogslist;
    }

    if (term) {
      filtered = filtered.filter((blog) =>
        blog.VideofolderName.toLowerCase().includes(term.toLowerCase())
      );
    }

    setFilteredData(filtered.length ? filtered : []);
  };
  const [VideofolderName, setVideofolderName] = useState("");

  const [data1, setdata1] = useState([]);

  const AddVideosDetails = {
    VideofolderName: VideofolderName,
  };
  console.log(AddVideosDetails);

  console.log(data1);

  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
    menuBtnChange();
  };

  const menuBtnChange = () => {
    const sidebar = document.querySelector(".sidebar");
    const closeBtn = document.querySelector("#btn");
    const searchBtn = document.querySelector(".bx-search");
    if (sidebar?.classList.contains("open")) {
      closeBtn?.classList.replace("bx-menu", "bx-menu-alt-right");
    } else {
      closeBtn?.classList.replace("bx-menu-alt-right", "bx-menu");
    }
  };
  const [isInstitutionsOpen, setIsInstitutionsOpen] = useState(false);

  const toggleInstitutions = () => {
    setIsInstitutionsOpen(!isInstitutionsOpen);
  };
  const [isInstitutionsOpen1, setIsInstitutionsOpen1] = useState(true);

  const toggleInstitutions1 = () => {
    setIsInstitutionsOpen1(!isInstitutionsOpen1);
  };
  const [isInstitutionsOpen2, setIsInstitutionsOpen2] = useState(true);

  const toggleInstitutions2 = () => {
    setIsInstitutionsOpen2(!isInstitutionsOpen2);
  };
	const [selectedVideopath, setSelectedVideopath] = useState(null);
	const [selectedvideopathId, setSelectedvideopathId] = useState(null);
	const [isUpdateModalOpen, setUpdateModalOpen] = useState(false);


  const columns = [
		{ field: "SNO", headerName: "S.No", width: 120 },
		{ field: "LEARNINGPATH", headerName: "Learning Path", width: 240 },
		{ field: "ATTEMPTS", headerName: "Attempts", width: 240 },
		{
			field: "ACTION",
			headerName: "Actions",
			width: 550,
			renderCell: (params) => renderActionButtons(params.row),
		},
	];

	const headerColumns = columns.map((col) => ({
		field: col.field,
		headerName: col.headerName,
		width: col.width,
		renderCell: col.renderCell,
	}));

	const renderActionButtons = (blog) => (
		<div>
      {filteredData && filteredData.length <= 0 ? (<div></div>):(
      <button
				type="button"
				className="btn  mx-1"
        style={{ backgroundColor: "#16c3ea", color:"#000"}}
				onClick={() => navigate("/ReportsAction",{state :{videopathId:blog._id}})}
			>
				<i className="fa-solid fa-eye" style={{ color: "white" }}></i>
			</button>
      )}
		</div>
	);
  let rows = [];
	if (filteredData && filteredData.length <= 0) {
		rows = [
		  {
			  id: 1,
			SNO: 'No Data',
		  },
		];
	  } else {
   rows = filteredData.map((blog, index) => ({
		id: index + 1, // Add this line to include a unique id for each row
		SNO: index + 1,
    ID:index +1,
    LEARNINGPATH: blog.VideofolderName,
    ATTEMPTS: blog.videoFile?.length,
		ACTION: renderActionButtons(blog),
    _id:blog._id,
	}))
}

  return (
    <div>
      <div className="container-fluid">
        <div className="row">
            {isOpen && (
              <div className=" col-12 col-lg-3 col-md-12 sectioncard121">
              <Sidebar/>
              <ToastContainer/>
              </div>
					  )}						
            <div className={`my-3 col-12 col-md-${isOpen ? 12 : 9} col-lg-${
							isOpen ? 9 : 12
						}`}>
               {worksheetLoading ? (
                    <div colSpan="4" className="d-flex flex-row justify-content-center align-items-center" style={{ height: '100vh' }}>
                     <div className='loader loader1'>
                      <div>
                        <div>
                        <div>
                          <div>
                          <div>
                            <div></div>
                          </div>
                          </div>
                        </div>
                        </div>
                      </div>
                      </div>
                    </div>                  
              ) : (
                <div className=" d-lg-block">
                <i className="fa-solid fa-bars bars d-lg-block d-none" onClick={toggleSidebar}></i>
                  <div className="card-item p-4">
                    <div className="row">
                      <div className="col-md-12 text-center">
                        <h4 className="" style={{color: "rgb(22, 195, 234)"}}>Learning Path Reports</h4>
                      </div> 
                    </div>                  
										<div className="row my-3">
                    <div className="col-md-7"></div>

                      <div className="col-md-2 float-right mt-2">
                        <label className="float-right">Search: </label>
                      </div>
                      <div className="col-md-3 float-right">
                        <input type="text"
                        className="form-control"
                        value={searchQuery}
                        placeholder="Search by learningpath"
                        onChange={handleInputChange} 
                          />
                      </div>
                      </div>
									<div style={{ height: "auto", width: "100%" }}>
										<DataGrid
											rows={rows}
											columns={headerColumns}
											initialState={{
												pagination: {
													paginationModel: { page: 0, pageSize: 5 },
												},
											}}
											pageSizeOptions={[5, 10]}
										/>
									</div>
</div>
                    </div>
              )}
                  </div>
                
              </div>
            </div>
        
        
      </div>
  );
};

export default LearningPathReports;
