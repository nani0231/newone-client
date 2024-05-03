import React from "react";
import { useState, useEffect } from "react";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

import { useNavigate } from "react-router-dom";
import Sidebar from "../Sidebar";

const Assessmentaccess = () => {
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

	return (
		<div>
			<div className="container-fluid p-0">
				<div className="row">
					{isOpen && (
						<div className=" col-12 col-lg-3 col-md-12 sectioncard121">
							<Sidebar />
							<ToastContainer />
						</div>
					)}
					<div
						className={`my-3 col-12 col-md-${isOpen ? 12 : 10} col-lg-${
							isOpen ? 9 : 12
						}`}
					>
						<div className="d-lg-block">
							<i
								className="fa-solid fa-bars bars  d-lg-block d-none"
								onClick={toggleSidebar}
							></i>
							<div class=" card-item1">
								<div className="  p-2">
									<div className="row">
										<div className="col-md-12">
											<h5>React js Categories Access</h5>
										</div>
										<div className="col-md-12 text-end">
											<div style={{ marginLeft: "auto" }} class="m-2">
												<div className="row">
													<div className="p-2 col-md-3">
														<select name="" id="" className="form-control">
															<option value="Select Institutions">
																---Select Institutions---
															</option>
														</select>
													</div>

													<div className="p-2 col-md-3">
														<select name="" id="" className="form-control">
															<option value="Select Batch Year">
																---Select Batch Year---
															</option>
														</select>
													</div>

													{/* Batch filter */}
													<div className="p-2 col-md-6">
														<select name="" id="" className="form-control">
															<option value="Select Batch">
																---Select Batch---
															</option>
														</select>
													</div>
												</div>
												<div className="col-md-12 text-end">
													<div style={{ marginLeft: "auto" }} class="m-2">
														<div className="row">
															<div className="p-2 col-md-3">
																<select
																	name=""
																	id=""
																	className="form-control"
																
																>
																	<option value="Select Institutions">
																		---Select Institutions---
																	</option>
																	
																</select>
															</div>

															<div className="p-2 col-md-3">
																<select
																	name=""
																	id=""
																	className="form-control"
																	
																>
																	<option value="Select Batch Year">
																		---Select Batch Year---
																	</option>
																	
																</select>
															</div>

															{/* Batch filter */}
															<div className="p-2 col-md-6">
																<select
																	name=""
																	id=""
																	className="form-control"
																
																>
																	<option value="Select Batch">
																		---Select Batch---
																	</option>
																	
																</select>
															</div>
														</div>

												<div className="p-2 text-center">
													<button
														className="p-2 selectbtn112"
														style={{
															backgroundColor: "#a5059d",
															border: "none",
															color: "white",
															borderRadius: "7px",
														}}
													>
														Search
													</button>
												</div>
												<br />

												<div className="">
													<div>
														<h5>Access Table</h5>
													</div>
													<div className="col-lg-12">
														<div className="table-responsive">
															<table className="table table-bordered text-center">
																<thead>
																	<tr>
																		<th
																			style={{
																				fontWeight: "500",
																				color: "#fff",
																				backgroundColor: "#333333",
																			}}
																		>
																			S NO
																		</th>
																		<th
																			style={{
																				fontWeight: "500",
																				color: "#fff",
																				backgroundColor: "#333333",
																			}}
																		>
																			Institution Name
																		</th>
																		<th
																			style={{
																				fontWeight: "500",
																				color: "#fff",
																				backgroundColor: "#333333",
																			}}
																		>
																			Batch Year
																		</th>
																		<th
																			style={{
																				fontWeight: "500",
																				color: "#fff",
																				backgroundColor: "#333333",
																			}}
																		>
																			Batch
																		</th>
																		<th
																			style={{
																				fontWeight: "500",
																				color: "#fff",
																				backgroundColor: "#333333",
																			}}
																		>
																			Action
																		</th>
																	</tr>
																</thead>

																<tbody>
																	<tr>
																		<td>1</td>
																		<td>2</td>
																		<td>3</td>
																		<td>4</td>
																		<td>5</td>
																	</tr>
																</tbody>
															</table>
														</div>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Assessmentaccess;
