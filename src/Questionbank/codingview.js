import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import Sidebar from "../Sidebar";
import "./Basic.css";
import { ToastContainer } from "react-toastify";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import apiList from "../liberary/apiList";

function Codingview() {
  const navigate = useNavigate();
  const [blogslist, setblogslist] = useState([]);
  const [filteredalldata, setFilteredalldata] = useState([]);  
  const [isOpen, setIsOpen] = useState(true);
const [itisLoading, setItisLoading] = useState(true);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
    menuBtnChange();
  };
  const [isUpdateModalOpen, setUpdateModalOpen] = useState(false);
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

  useEffect(() => {
    fetchblogs();
  }, []);
  const fetchblogs = async () => {
    const api = `${apiList.getbasic}`;
    try {
      const response = await axios.get(api, {});
      setblogslist(response.data);
      setFilteredalldata(response.data)
      setItisLoading(false);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching blogs:", error);
    }
  };
  const [filterdata, setfilterdata] = useState("")
  const handleGoButtonClick = async () => {
    const api = `${apiList.getbasics}/${selectedSubjectId}/${selectedChapterId}`;
    try {
      const response = await axios.get(api, {});
      setfilterdata(response.data.codingBasics);
      setItisLoading(false)
      console.log(response.data.codingBasics);
    } catch (error) {
      console.error("Error fetching blogs:", error);
    }
  }


  const handleDelete = async (selectedSubjectId, selectedChapterId, codingBasicId) => {
    try {
      const response = await axios.delete(
        `${apiList.deletebasic}/${selectedSubjectId}/${selectedChapterId}/${codingBasicId}`
      );

      if (response.data.status === "success") {
        toast('Deleted Coding successfully', {
          position: "top-center",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          className: 'custom-toast-custom'
        });
        fetchblogs(); 
					setTimeout(function () {}, 3000);
      } else {
        toast.error(response.data.msg);
      }
    } catch (error) {
      console.error("Error deleting coding basic:", error);
      toast.error("Error deleting coding basic");
    }
  };
  const [selectedChapterId, setSelectedChapterId] = useState("");
	const [filteredSubjectsData, setFilteredsubjectsData] = useState([]);

  const handleChapterTagTypeSelection = (event) => {
    setSelectedChapterId(event.target.value);
    setChapters(
      event.target.options[event.target.selectedIndex].getAttribute(
        "data-value"
      )
    );
    const subjectfilterId = event.target.options[event.target.selectedIndex].getAttribute("value")

	
  };

  console.log(selectedChapterId);

  const [selectedSubjectId, setSelectedSubjectId] = useState("");

  const handleSubjectTagTypeSelection = (event) => {
    setSelectedSubjectId(event.target.value);
    setSubjects(
      event.target.options[event.target.selectedIndex].getAttribute(
        "data-value"
      )
    );
    const selectedId = event.target.value;
		const result2 = blogslist?.find(item => item?._id === selectedId);
	
		console.log("Filtered Data 1:", result2?.chapter);
		setTimeout(() => {
			setFilteredsubjectsData(result2?.chapter || [])
		}, 10);
		setSelectedChapterId("");
  };

  console.log(selectedSubjectId);
  const [Subjects, setSubjects] = useState("");
  const [Chapters, setChapters] = useState("");
  
const [deleteid,setDeleteid] = useState("")

const idpassingfordelete =(id)=>{
	setDeleteid(id)
}
const handleClearClick =()=>{
  setSelectedSubjectId('')
  setFilteredsubjectsData([])
  setFilteredalldata([])
  setfilterdata('')
  fetchblogs()

}
  const columns = [
    { field: "SNO", headerName: "SNO", width: 150 },
    { field: "Module", headerName: "Module", width: 250 },
    { field: "Chapters", headerName: "Chapters", width: 260 },
    { field: "Title", headerName: "Title", width: 270 },
    {
        field: "ACTION",
        headerName: "ACTION",
        width: 532,
        renderCell: (params) => renderActionButtons(params.row),
    },
];

const headerColumns = columns.map((col) => ({
    field: col.field,
    headerName: col.headerName,
    width: col.width,
    renderCell: col.renderCell,
   
}));

const renderActionButtons = (codingBasics) => (
    <div>
 {filterdata && filterdata.length > 0 ?(
  <div>
    <Link to={`/codingupdate/${selectedSubjectId}/${selectedChapterId}/${codingBasics._id}`}>
           <i className="fa-solid fa-pencil pencile"
            data-bs-target="#myModalEdit"></i>        
        </Link>
             <i
        className="fa-solid fa-trash delete "
        data-toggle="modal"
        data-target="#myModalDelete"
        onClick={() => idpassingfordelete(codingBasics._id)}></i>
  </div>
 ):(<div></div>)}        
    </div>
);

// const rows = filterdata.map((codingBasics, index) => ({
//     id: index + 1, // Add this line to include a unique id for each row
//     SNO: index + 1,
//     Module: codingBasics.Subjects,
//     Chapters: codingBasics.Chapters,
//     Title: codingBasics.Title,
//     _id: codingBasics._id,
//     ACTION: renderActionButtons(codingBasics),
// }));
const rows = Array.isArray(filterdata) > 0 
  ? filterdata.map((codingBasics, index) => ({
      id: index + 1,
      SNO: index + 1,
      Module: codingBasics.Subjects,
      Chapters: codingBasics.Chapters,
      Title: codingBasics.Title,
      _id: codingBasics._id,
      ACTION: renderActionButtons(codingBasics),
    }))
  : [{
    id:'',
    SNO:"NoData",
  }
  ];
  return (
    <div>
      <div className="container-fluid ">
        <div className="row">
          {isOpen && (
            <div className=" col-12 col-lg-3 col-md-12 sectioncard121">
              <Sidebar />
              <ToastContainer />
            </div>
          )}
          <div
            className={`my-3 col-12 col-md-${isOpen ? 12 : 9} col-lg-${isOpen ? 9 : 12
              }`}
            style={{ height: "100vh", overflowY: "scroll" }}
          >
                      
          {itisLoading ? (
            <>                    
            <div className="d-flex flex-row justify-content-center align-items-center" style={{ height: "100vh" }}>
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
            </>
          ) : (
            <div className=" ">
              <i
                className="fa-solid fa-bars bars d-lg-block d-none"
                onClick={toggleSidebar}
              ></i>
              <div className="">
									<div class="row">
										<div className="col-md-12 text-center">
											<h3 className="my-3" style={{color:"#16c3ea"}}>Filter Coding Questions</h3>
										</div>
                    <div className="col-12 col-md-6">
                      <select
                        style={{ padding: "5px" }}
                        className="form-control"
                        value={selectedSubjectId}
                        onChange={handleSubjectTagTypeSelection}
                      >
                        <option className="hidden" value="">
                          Select Subject
                        </option>
                        {filteredalldata?.map((subject) => (
                          <option
                            className="name_item"
                            key={subject._id}
                            data-value={subject.name}
                            value={subject._id}
                          >
                            {subject.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="col-12 col-md-6">
                      <select
                        type="text"
                        placeholder="...Select Chapter"
                        className="form-control"
                        onChange={handleChapterTagTypeSelection}
                        value={selectedChapterId}
                      >
                        <option>Select Chapter</option>
                        {filteredSubjectsData?.map((chapter) => (
                            <option
                              className="name_item"
                              key={chapter._id} // Use a unique key for each option
                              data-value={chapter.Name}
                              value={chapter._id}
                            >
                              {chapter.Name}
                            </option>
                          )
                        )}
                      </select>
                    </div>
                  
                  <div className="text-center mt-3">
                    <button
                     className="btn_submit"
                      onClick={handleGoButtonClick}
                      style={{backgroundColor:"#16c3ea", color:"#000"}}
                    >
                      Search
                    </button>
                    <button
                     className="btn btn light mx-3"
                      onClick={handleClearClick}
                      style={{backgroundColor:"transparent", border:"1px solid #16c3ea"}}
                    >
                      Clear
                    </button>
                  </div>
                  <div className="mt-3" style={{ height: "auto", width: "100%"}}>
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
                                        <div
                                            class="modal"
                                            id="myModalView"
                                            style={{ display: isUpdateModalOpen ? "block" : "none" }}
                                        >
                                        </div>
                      {/* <table className="table text-center table-bordered">
                        <thead>
                          <tr>
                            <th> ID</th>
                            <th>Module</th>
                            <th>Chapters </th>
                            <th>Title</th>
                            <th>ACTIONS</th>
                          </tr>
                        </thead>
                        <tbody>
                          {filterdata.length > 0 ? (
                            filterdata.map((codingBasics, index) => (
                              <tr key={codingBasics.id}>
                                <td>{index + 1}</td>
                                <td>{codingBasics.Subjects}</td>
                                <td>{codingBasics.Chapters}</td>
                                <td>{codingBasics.Title}</td>
                                <td>
                                  <div className="A">

                                    <Link to={/codingupdate/${selectedSubjectId}/${selectedChapterId}/${codingBasics._id}}>
                                      <button
                                        type="button"
                                        className="btn">
                                        <i
                                          className="fa-sharp fa-solid fa-pen"
                                          style={{ color: "skyblue" }}
                                        ></i>
                                      </button></Link>


                                    <button
                                      type="button"
                                      className="btn"
                                      onClick={() => handleDelete(selectedSubjectId, selectedChapterId, codingBasics._id)}
                                    >
                                      <i
                                        className="fa-solid fa-trash-can "
                                        style={{ color: "red" }}
                                      ></i>
                                    </button>
                                  </div>
                                </td>
                              </tr>
                            ))
                          ) : (
                            <tr className="text-start">
                              <td colSpan="5">No data available</td>
                            </tr>
                          )}
                        </tbody>
                      </table> */}
                      {/* <div style={{ height: "auto", width: "100%" }}>
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
										</div> */}
                  
              
              </div>
            </div>
            
<div class="modal" id="myModalDelete">
	<div class="modal-dialog">
		<div class="modal-content">
			<div class="modal-header">
				<h4 class="modal-title">
					Delete Question
				</h4>
				<button
					type="button"
					class="close"
					data-dismiss="modal"
				>
					&times;
				</button>
			</div>
			<div
				class="modal-body"
				style={{ textAlign: "start" }}
			>
				<p
					style={{
						fontSize: "18px",
						fontWeight: "500",
					}}
				>
					Would you like to delete Question ?{" "}
				</p>
			</div>
			<div class="modal-footer d-flex justify-content-end">
				<button
					type="button"
					class="btn_yes "
					data-dismiss="modal"
				
					onClick={() =>
						handleDelete(selectedSubjectId,selectedChapterId,deleteid)
					}
				
				>
					Yes
				</button>
				<button
					type="button"
					class="btn_no"
					data-dismiss="modal"
				>
					No
				</button>
			</div>
		</div>
	</div>
</div>
          </div>
          )}
        </div>
      </div>
    </div>
    </div>
  );
}

export default Codingview;