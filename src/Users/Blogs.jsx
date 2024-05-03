import * as React from "react";
import { Link, Navigate } from "react-router-dom";
import "./userblogs.css";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShareIcon from "@mui/icons-material/Share";
// import TwitterIcon from "@mui/icons-material/Twitter";
// import FacebookIcon from "@mui/icons-material/Facebook";
import CloseIcon from "@mui/icons-material/Close";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { IconButton } from "@mui/material";
import TelegramIcon from "@mui/icons-material/Telegram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import GitHubIcon from "@mui/icons-material/GitHub";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import { Audio } from "react-loader-spinner";
import { useRef } from "react";
import { MdContentCopy } from "react-icons/md";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import NavbarUser from "./navbaruser";
import UserFooter from "./userfooter";
import apiList from "../liberary/apiList";
import UserNavbar from "./Usernavbar";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { useHistory } from 'react-router-dom';
import {
	FacebookShareButton,FacebookIcon , TwitterShareButton,TwitterIcon, TelegramShareButton, LinkedinShareButton, WhatsappShareButton
  } from "react-share";

function Usersblogs() {
	let navigate = useNavigate();
	const [open, setOpen] = React.useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);
	const [open1, setOpen1] = React.useState(false);
	const handleOpen1 = () => setOpen1(true);
	const handleClose1 = () => setOpen1(false);
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	
	useEffect(() => {
		const token = Cookies.get("token");
		setIsLoggedIn(!!token);
	  }, []);
	const inputRef = useRef(null);

	const copyToClipboard = () => {
		inputRef.current.select();
		document.execCommand("copy");

		navigator.clipboard
			.writeText(inputRef.current.value)
			.then(() => {
				alert("copy to text");
				console.log("Text successfully copied to clipboard");
			})
			.catch((err) => {
				console.error("Unable to copy text to clipboard", err);
			});
	};
	const [blogslist, setBlogslist] = useState([]);
	const [Title, setTitle] = useState("");
	console.log(blogslist);
	const fetchblogs = async () => {
		const api = `${apiList.allBlogs}`;
		try {
			const response = await axios.get(api, {});
			const data = response.data;
			setBlogslist(response.data);
			setWorksheetLoading(false);
		} catch (error) {
			console.error("Error fetch blogs:", error);
			setWorksheetLoading(false);
		}
	};
	const [worksheetLoading, setWorksheetLoading] = useState(true);
	const [searchTerm, setSearchTerm] = useState("");
	const [filteredData, setFilteredData] = useState(blogslist);
	useEffect(() => {
		fetchblogs();
	}, []);
	const handleSearch = () => {
		let filtered;
		if (Title && Title !== "0") {
			filtered = blogslist.slice(0, parseInt(Title, 10));
		} else {
			filtered = blogslist;
		}

		if (searchTerm) {
			filtered = filtered.filter((blog) =>
				blog.Title.toLowerCase().includes(searchTerm.toLowerCase())
			);
		}

		setFilteredData(filtered);
	};

	const handleInputChange = (e) => {
		const term = e.target.value;
		setSearchTerm(term);

		let filtered;
		if (Title && Title !== "0") {
			filtered = blogslist.slice(0, parseInt(Title, 10));
		} else {
			filtered = blogslist;
		}

		if (term) {
			filtered = filtered.filter((blog) =>
				blog.Title.toLowerCase().includes(term.toLowerCase())
			);
		}

		setFilteredData(filtered);
	};
	useEffect(() => {
		handleSearch();
	}, [Title, blogslist]);
	const [navbarSetting, setNavbarSetting] = useState(null);

	useEffect(() => {
		const token = Cookies.get("token");

		if (token) {
			setNavbarSetting(<NavbarUser />);
		} else {
			setNavbarSetting(<UserNavbar />);
		}
	}, []);
	const handleTwitterShare  = window.location.href;
	const shareUrl = window.location.href

	const [likes, setLikes] = useState({});

	useEffect(() => {
		// Initialize likes from localStorage on component mount
		const storedLikes = localStorage.getItem("likes");
		if (storedLikes) {
		  setLikes(JSON.parse(storedLikes));
		}
	  }, []);

	const handleLike = (blogId) => {
		setLikes((prevLikes) => {
			const updatedLikes = { ...prevLikes };
			if (updatedLikes[blogId]) {
				// If already liked, decrease like count and remove like
				updatedLikes[blogId] -= 1;
				console.log(updatedLikes)
			} else {
				// If not liked, increase like count
				updatedLikes[blogId] = 1;
			}
			localStorage.setItem("likes", JSON.stringify(updatedLikes));
			return updatedLikes;
			
		});
	};
	

	return (
		<>
			<NavbarUser/>
			<div>
				{worksheetLoading ? (
					<div
						colSpan="4"
						className="d-flex flex-row justify-content-center align-items-center"
						style={{ height: "100vh" }}
					>
						<div>
							<div class="hm-spinner"></div>
						</div>
					</div>
				) : (
					<div className="container mt-4 py-5">
						<div className="">
							<div className=" mt-5">
								<div className="text-center">
									<h2 className="text-center">All Blogs</h2>
								</div>
							</div>
							<div className="text-end">
								<div className="text-end mt-3">
									<input
										className="w-50 Seach  p-2"
										placeholder="Search for Blogs"
										value={searchTerm}
										onChange={handleInputChange}
									/>
								</div>
							</div>

							<div className="row ">
								<div className="col-sm-12 col-md-3  mt-3 tagsdata">
									<h3>Tags</h3>
									{blogslist.map((blog, index) => (
										<div className="d-flex flex-column">
											<button className="w-100 tagbuttons p-2">
												{blog.Tags}
											</button>
										</div>
									))}
								</div>
								<div className=" col-md-9  ">
									<div className=" wapping1">
										{filteredData.map((blog, index) => (
											<div className="blogcard w-100 mt-4 p-3">
												<h4 className="">{blog.Title}</h4>
												<div className=" mt-3">
													<button className="p-2 mr-2 cardbutton">
														Campus Hiring
													</button>
													<button className="p-2 mr-2 cardbutton">
														Recruitment
													</button>
													<button className="p-2 cardbutton">
														Test Preparation{" "}
													</button>
													{/* <FacebookShareButton url={shareUrl}
																		 quote={'Title or jo bhi aapko likhna ho'}
																		hashtag={'#portfolio...'}>		
																		<FacebookIcon size={40} round={true}/>
																		</FacebookShareButton> */}
												{/* <TwitterShareButton  url={handleTwitterShare}
													quote={'Title or jo bhi aapko likhna ho'}
												hashtag={'#portfolio...'}>		
												<TwitterIcon size={40} round={true}/>
												</TwitterShareButton> */}
												</div>
												<div className="likeshare mt-3">
													<span style={{ cursor: "pointer" }}>
														{likes[blog.id] > 0 ? (
															<FavoriteIcon
																style={{ color: "red" }}
																className="mr-2"
																onClick={() => handleLike(blog.id)}
															/>
														) : (
															<FavoriteBorderIcon
																style={{ color: "black" }}
																className="mr-2"
																onClick={() => handleLike(blog.id)}
															/>
														)}
														Like : {likes[blog.id]}
													</span>

													<span
														onClick={handleOpen1}
														style={{ cursor: "pointer" }}
													>
														<ShareIcon className="mx-2" />
														Share
													</span>

													<div className="">
														<Modal
															keepMounted
															open={open1}
															onClose={handleClose1}
															aria-labelledby="keep-mounted-modal-title"
															aria-describedby="keep-mounted-modal-description"
														>
															<Box className="umadevi1">
																<Typography
																	id="keep-mounted-modal-title "
																	variant="h6"
																	component="h2"
																>
																	<div className="title">
																		<h2>
																			{" "}
																			Share{" "}
																			<IconButton
																				aria-label="close"
																				onClick={handleClose1}
																				className="Close_icon1"
																			>
																				<CloseIcon />
																			</IconButton>
																		</h2>
																	</div>
																</Typography>
																<Typography
																	id="keep-mounted-modal-description"
																	sx={{ mt: 2 }}
																>
																	<div className="likeshare1">
																		<span className="shareicons p-3 ">
																		<TwitterShareButton url={handleTwitterShare}
																		 quote={'Title or jo bhi aapko likhna ho'}
																		hashtag={'#portfolio...'}
																		>		
																		<TwitterIcon size={40} round={true}/>
																		</TwitterShareButton>
																		</span>															
																		<span className="shareicons p-3 ">
																		<FacebookShareButton url={shareUrl}
																		 quote={'Title'}
																		hashtag={'#portfolio...'}>		
																		<FacebookIcon size={40} round={true}/>
																		</FacebookShareButton>
																		</span>
																		<span className="shareicons p-3 ">
																		<TelegramShareButton url={shareUrl}
																		 quote={'Title'}
																		hashtag={'#portfolio...'}>		
																		<TelegramIcon size={40} round={true}/>
																		</TelegramShareButton>
																		</span>
																	</div>
																	<div className="likeshare1 mt-3">
																		<span className="shareicons p-3 ">
																		<LinkedinShareButton url={shareUrl}
																		 quote={'Title'}
																		hashtag={'#portfolio...'}>		
																		<LinkedInIcon size={40} round={true}/>
																		</LinkedinShareButton>
																		</span>
																		<span className="shareicons p-3 ">
																		<WhatsappShareButton url={shareUrl}
																		 quote={'Title'}
																		hashtag={'#portfolio...'}>		
																		<WhatsAppIcon size={40} round={true}/>
																		</WhatsappShareButton>
																		</span>
																		{/* <span className="shareicons p-3 ">
																		<GitHubIcon
																				style={{
																					color: "black",
																					fontSize: "45px",
																				}}
																			/>
																		</span> */}
																	</div>
																	<div>
																		<h6
																			className="ml-2 mt-3"
																			style={{ fontSize: "20px" }}
																		>
																			Link
																		</h6>

																		<span className="icon-container ml-2">
																			<input
																				ref={inputRef}
																				className="shareinput w-100 p-2"
																				placeholder="http://localhost:3000/Usersblogs"
																				defaultValue="http://localhost:3000/Usersblogs"
																			/>
																			<MdContentCopy
																				className="icon"
																				onClick={copyToClipboard}
																				title="Copy to Clipboard"
																			/>
																		</span>
																	</div>
																</Typography>
															</Box>
														</Modal>
														<style>
															{`
        .css-i9fmh8-MuiBackdrop-root-MuiModal-backdrop {
            background-color: transparent !important;
        }
    `}
														</style>
													</div>
												</div>
											</div>
										))}
									</div>
								</div>
							</div>
						</div>
					</div>
				)}
			</div>
			<div className="mt-4">
				<UserFooter />
			</div>
		</>
	);
}

export default Usersblogs;
