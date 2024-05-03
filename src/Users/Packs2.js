
import React from "react";
import { useState, useEffect } from "react";
import { IoLockClosed } from "react-icons/io5";
import { MdCurrencyRupee } from "react-icons/md";
import { PiFlowerTulip } from "react-icons/pi";

import { Link, useParams, useNavigate } from 'react-router-dom';
import NavbarUser from "./navbaruser";
import UserFooter from "./userfooter";
import apiList from "../liberary/apiList";
import UserNavbar from "./Usernavbar";
import { useLocation } from "react-router-dom";


const Packs2 = () => {
    const [assessments, setAssessments] = useState([]);
    const [coursesData, setCoursesData] = useState([]);
    const [practicesData, setPracticesData] = useState([]);
    const [categoryDetails, setCategoryDetails] = useState({});
    const { selectedAssessmentName } = useParams();
    const { assessmentId } = useParams();
    const Navigate = useNavigate();
    const location = useLocation();
    const price = location.state?.price;
    const period = location.state?.period

    useEffect(() => {
        const fetchCategoryAndAssessments = async () => {
            try {
                const assessmentsResponse = await fetch(`${apiList.getassessmentswithTitle}/${selectedAssessmentName}`);
                const coursesResponse = await fetch(`${apiList.getcourseswithTitle}/${selectedAssessmentName}`);
                const practicesResponse = await fetch(`${apiList.getpracticeswithTitle}/${selectedAssessmentName}`);
                const assessmentsData = await assessmentsResponse.json();
                const coursesData = await coursesResponse.json();
                const practicesData = await practicesResponse.json();
                setAssessments(assessmentsData.assessments || []);
                setCoursesData(coursesData.assessments || [])
                setPracticesData(practicesData.assessments || [])
            } catch (error) {
                console.error("Error fetching category and assessments:", error);
            }
        };
        fetchCategoryAndAssessments();
    }, [selectedAssessmentName]);
console.log(coursesData)


  
    const handleViewAssessment = (assessmentId) => {
        // Navigate(`/Packs3/${selectedCategoryId}/${assessmentId}`);
    };

    return (
        <>
            <UserNavbar />
            <div className="container p-5 mt-5">
                <div className="row p-3 packing ">
                    <div className="col-12  packs6 ">
                        <h3 className="aptitudes">{selectedAssessmentName}</h3>
                        <p className="para">A paragraph is a series of sentences that are organized and coherent, and are all related to a single topic. Almost every piece of writing you do that is longer than a few sentences should be organized into paragraphs. This is because paragraphs show a reader where the subdivisions of an essay begin and end, and thus help the reader see the organization of the essay and grasp its main points.</p>
                        <h6 className="get">Get This Pack For {period}</h6>
                        <h6 className="rupee"><s className="not">
                        </s>
                        <MdCurrencyRupee />{price}</h6>
                        <h6 className="note">Note:</h6>
                    </div>
                    <h3 className="assessments1">Assessments</h3>

                    <div className="row p-3">
                        {assessments.map((assessment) => (
                            <div key={assessment._id} className="col-sm-4 col-md-4 col-lg-4 col-xl-3  packs1 p-3">
                                <h5>{assessment.assessmentname}</h5>
                                {/* <h6 className="aptitude-3"><PiFlowerTulip /> 1 Assessments</h6> */}
                                <h6 className="aptitude-3">
                                    <PiFlowerTulip /> {assessment.Questions?.length || 0} Test Questions
                                </h6>
                                {/* <Link to={`/Packs3/${selectedCategoryId}/${assessment._id}`}> */}
                                <Link style={{textDecoration:"none"}}>

                                    <button type="button" className="btn6 p-1 mt-3" onClick={() => handleViewAssessment(assessment._id)}>View</button>
                                </Link>
                            </div>
                        ))}
                    </div>

                </div>
                <div className="row p-3 packing ">
                    <h3 className="assessments1">Courses</h3>
                    <div className="row p-3">
                        {coursesData.map((assessment) => (
                            <div key={assessment._id} className="col-sm-4 col-md-4 col-lg-4 col-xl-3  packs1 p-3">
                                <h5>{assessment.VideoTitleName}</h5>
                                {/* <h6 className="aptitude-3"><PiFlowerTulip /> 1 Assessments</h6> */}
                                <h6 className="aptitude-3">
                                    <PiFlowerTulip /> 
                                    {/* {assessment.videoFile?.length || 0}  */}
                                    SkillUp with This Video
                                </h6>
                                {/* <Link to={`/Packs3/${selectedCategoryId}/${assessment._id}`}> */}
                                <Link style={{textDecoration:"none"}}>

                                    <button type="button" className="btn6 p-1 mt-3" onClick={() => handleViewAssessment(assessment._id)}>View</button>
                                </Link>
                            </div>
                        ))}
                    </div>

                </div>
                <div className="row p-3 packing ">
                    <h3 className="assessments1">Practice</h3>
                    <div className="row p-3">
                        {practicesData.map((assessment) => (
                            <div key={assessment._id} className="col-sm-4 col-md-4 col-lg-4 col-xl-3  packs1 p-3">
                                <h5>{assessment.topicName}</h5>
                                {/* <h6 className="aptitude-3"><PiFlowerTulip /> 1 Assessments</h6> */}
                                <h6 className="aptitude-3">
                                    <PiFlowerTulip /> {assessment.Testtopic?.length || 0} Topics
                                </h6>
                                {/* <Link to={`/Packs3/${selectedCategoryId}/${assessment._id}`}> */}
                                <Link style={{textDecoration:"none"}}>

                                    <button type="button" className="btn6 p-1 mt-3" onClick={() => handleViewAssessment(assessment._id)}>View</button>
                                </Link>
                            </div>
                        ))}
                    </div>

                </div>
            </div>
            <UserFooter />
        </>
    )

}
export default Packs2;