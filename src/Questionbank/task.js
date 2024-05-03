import React, { useEffect, useState } from "react";
import axios from "axios";

const Designation1 = () => {
	const [bloglist, setbloglist] = useState([]);
	const [selectblog, setselectblog] = useState("");

	useEffect(() => {
		fetchblogs();
	}, []);

	const fetchblogs = async () => {
		const api = "http://localhost:3021/allpeople";
		const authToken =
			"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGVlZTIxOGIxNGEzNTJlMjQyM2JiYzYiLCJpYXQiOjE2OTMzNzcwNjl9.DBa4x-pEsO5fVkC8Dh7-c1oYuVhboy1QIuDUAs5iKkE";
		try {
			const response = await axios.get(api, {
				headers: {
					Authorization: `Bearer ${authToken}`,
				},
			});
			setbloglist(response.data);
		} catch (error) {
			console.error("Error fetching blogs", error);
		}
	};

	return (
		<div>
			<div className="container">
				<div className="row">
					<ul>
						{bloglist.map((blog) => (
							<div key={blog._id}>
								{/* <h4>{blog.name}</h4>
                                <h3>{blog.salary}</h3>
                                 */}
								<div
									className="col-12 row"
									style={{ border: "1px solid black" }}
								>
									<div className="col-md-3">
										<img
											src="https://media.licdn.com/dms/image/C560BAQEAOMY1IT0VIg/company-logo_200_200/0/1614081825631?e=2147483647&v=beta&t=o7kSEmSfcdH_gkLD0kAsGxX1fnZ2Fj9z8Skybb3na78 "
											width={150}
										></img>
									</div>
									<div className="col-md-6">
										<h2 className="text-center">perfex technologies pvt Ltd</h2>
										<p className="text-center">
											1st floor, vertex corporate Bldg, jubilee Enclave,Hitex
											Madhapur,Hyderabad-58001.p:(040)29800028
										</p>
										<h2 className="text-center">
											Pay slip for the month of july 2023
										</h2>
									</div>
								</div>
								<div className="row">
									<div
										className="col-md-6 card"
										style={{ border: "1px solid black" }}
									>
										<div className="d-flex flex-row">
											<p className="col-md-10">Name</p>

											<p className="col-md-2">{blog.name}</p>
										</div>
										<div className="d-flex flex-row">
											<p className="col-md-10">month:</p>
											<p className="col-2">{blog.month}</p>
										</div>
										<p>Designation:{blog.Designation}</p>
										<p>Location:{blog.location}</p>
										<p>workdays:{blog.workDays}</p>
										<p>Duration:{blog.Duration}</p>
										{/* <p>salary:{blog.salary}</p>
                                    <p>HRA:{blog.HRA}</p>
                                    <p>Medical:{blog.Medical}</p>
                                    <p>Transpot:{blog.Transpot}</p>
                                    <p>allowance:{blog.allowance}</p>
                                    <p>pf:{blog.pf}</p>
                                    <p>profisonaltax:{blog.profisonaltax}</p>
                                    <p>total:{blog.total}</p> */}
									</div>

									<div
										className="col-md-6 card "
										style={{ border: "1px solid black" }}
									>
										<p>Bank name</p>
										<p>BankAccountNo:</p>
										<p>PFNo:</p>
										<p>PF No:</p>
										<p>Esi no:</p>
										<p>Pan No:</p>
										<p>Lop:</p>
									</div>

									<div
										className="col-md-6 card "
										style={{ border: "1px solid black" }}
									>
										<div className="d-flex flex-row">
											<p className="col-md-6">salary</p>
											<p>{blog.salary}</p>
										</div>
										<p>HRA:{blog.HRA}</p>
										<p>Medical:{blog.Medical}</p>
										<p>Transpot:{blog.Transpot}</p>
										<p>allowance:{blog.allowance}</p>
										<p>pf:{blog.pf}</p>
										<p>profisonaltax:{blog.profisonaltax}</p>
										<p>total:{blog.total}</p>
									</div>
									<div
										className="col-md-6 card "
										style={{ border: "1px solid black" }}
									>
										<p>PF</p>
										<p>prof tax</p>
									</div>
								</div>
							</div>
						))}
					</ul>
				</div>
			</div>
		</div>
	);
};
export default Designation1;
