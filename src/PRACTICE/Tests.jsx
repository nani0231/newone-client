import React, { useState, useEffect } from "react";
import { ToastContainer } from "react-toastify";
import axios from "axios";
import Sidebar from "../Sidebar";
import { DataGrid } from "@mui/x-data-grid";
import apiList from "../liberary/apiList";

const Tests = () => {
	const [isOpen, setIsOpen] = useState(true);
	const [rows, setRows] = useState([]);
	const [reportsdata, setreportsdata] = useState([]);

	const [loading, setLoading] = useState(true);

	const toggleSidebar = () => {
		setIsOpen(!isOpen);
	};
	// const clickreportsview = async (CategoryId,topicId,testId) => {
	// 	try {
	// 		const response = await axios.post(
	// 			`${apiList.getTestDetails}/${CategoryId}/${topicId}/${testId}`,
	// 		);
	// 		setreportsdata(response.data)
	// 		console.log(response.data)
	// 	} catch (error) {
	// 		console.error(error);
	// 	}
	// };
	useEffect(() => {
		const fetchData = async () => {
			const api = `${apiList.allpractices}`;
			try {
				const response = await axios.get(api, {});
				const practiceData = response.data.data;
				var cnt = 0;
				const formattedRows = practiceData.flatMap((practice, index) =>
					practice.Practicetopic.flatMap((topic, topicIndex) => {
						return topic.Testtopic.map((test, testIndex) => ({
							id: cnt,
							SNO: ++cnt,
							Category: practice.name,
							Topic: topic.topicName,
							TESTS: test.testName,
							_id: test._id,
							CategoryId: practice._id,
							topicId: topic._id,
							ACTION: renderActionButtons(practice),
						}));
					})
				);

				console.log("Formatted Rows:", formattedRows);
				setRows(formattedRows);
				setLoading(false);
			} catch (error) {
				console.error("Error fetching practice data:", error);
				setLoading(false);
			}
		};

		fetchData();
	}, []);

	const renderActionButtons = (practice) => (
		<div>
			{/* <Link to="/PracticeTopicAccess"> */}
			<button
				className=" btn-dark"
				style={{
					borderRadius: "4px",
					padding: "5px",
					marginRight: "5px",
					border: "none",
				}}

				//  onClick={()=>clickreportsview(practice.CategoryId,practice.topicId,practice._id)}
			>
				Reports
			</button>
			{/* </Link> */}
		</div>
	);

	return (
		<div>
			<ToastContainer />
			<div className="container-fluid">
				<div className="row">
					{isOpen && (
						<div className="col-12 col-lg-3 col-md-12 sectioncard121">
							<Sidebar />
						</div>
					)}
					<div
						className={`my-3 col-12 col-md-${isOpen ? 12 : 10} col-lg-${
							isOpen ? 9 : 12
						}`}
					>
						{loading ? (
							<>
								<div
									className="d-flex flex-row justify-content-center align-items-center"
									style={{ height: "100vh" }}
								>
									<div className="loader loader1">
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
							<div>
								<i
									className="fa-solid fa-bars bars d-lg-block d-none"
									onClick={toggleSidebar}
								></i>

								<div className=" ">
									<div class="">
										<div className="row">
											<div className="col-md-12 text-center">
												<h3 style={{ color: "#16c3ea" }}>Access</h3>
											</div>

											<div
												className="mt-4"
												style={{ height: "auto", width: "100%" }}
											>
												<DataGrid
													rows={rows}
													columns={[
														{ field: "SNO", headerName: "S.No", width: 150 },
														{
															field: "Category",
															headerName: "Category",
															width: 260,
														},
														{ field: "Topic", headerName: "Topic", width: 250 },
														{ field: "TESTS", headerName: "Tests", width: 250 },
														{
															field: "ACTION",
															headerName: "Action",
															width: 552,
															renderCell: (params) => params.row.ACTION,
														},
													]}
													pageSize={5}
												/>
											</div>
										</div>{" "}
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

export default Tests;
