import "./App.css";
import { Routes, Route } from "react-router-dom";
import UserLogin from "./Perfex-login";
import ForgotPassword from "./Forgetpassword";
import PerfexHome from "./PerfexHome";
import AdminDashboard from "./AdminDashboard";
import Admin from "./Practice";
import ShowData from "./ShowIcon";
import UsersDetails from "./UsersDetails";
import UpdatePage from "./UpdatePage";
import ShowData1 from "./ShowInstitutes";
import BatchYear from "./Batch-Year";
import Batches from "./Batches";
import UpdateYear from "./Batch-Year-Up";
import UpdateBatch from "./Batch-Update";
import SearchOption from "./SearchUser";
import Dashboard from "./Perfex_Dashboard";
// import Institute from "./Institute";
import Assessment from "./Assessments-User";
import Courses from "./Courses-Users";
import Practice from "./Practice-User";
import Blogs from "./Blogs-Users";
import JavaProgramming from "./Java-Programming";
import InstituteLogin from "./Institute-Login";
import LearnPath from "./LearnData/Learn-Path";
import VideoFolderUpdatePage from "./LearnData/VideoUpdatePage";
import VideoPage from "./LearnData/VideosPage";
import Learn from "./LearnData/Learn.jsx";
import Learning from "./LearnData/Learning";
import Topic from "./LearnData/topic";
import Content from "./LearnData/content";
import TextContent from "./LearnData/textcontent";
import QbSubject from "../src/Questionbank/subject";
import Chapter from "../src/Questionbank/chapter";
import CreateQuestion from "../src/Questionbank/CreateQuestion";
import McqView from "../src/Questionbank/McqView";
import ParagHome from "../src/Questionbank/ParagHome";
import ParagView from "../src/Questionbank/paragview";
import Coding from "../src/Questionbank/coding";
import Codingview from "../src/Questionbank/codingview";
import Upload from "./Questionbank/upload";
import ParagEdit from "./Questionbank/paragEdit";
import Basic from "./Questionbank/BasicCoding";
import ParticularMcaView from "./Questionbank/ParticularMcaView";
import ParticularParagView from "./Questionbank/ParticularParagView.js";
import Mcqupdate from "./Questionbank/Mcqupdate";
import AssignQB from "./Questionbank/AssignQB";
import Codingupdate from "./Questionbank/codingupdate";
import Categories123 from "../src/PRACTICE/Categories.jsx";
import Access from "../src/PRACTICE/Access";
import Topics from "../src/PRACTICE/Topics";
import Assessmet from "../src/Assessment/Assessment.jsx";
import Categories987 from "../src/Assessment/Categories.jsx";
import View from "./Assessment/View";
import Assessmentaccess from "../src/Assessment/Assessmentaccess.jsx";
import AssignedAssessmentaccess from "../src/Assessment/AssignedAssessmenyaccess";
import Tests from "./PRACTICE/Tests";
import CreateTest from "./PracticeTest/CreateTest";
import AssessmentReports from "../src/Assessments Reports/AssessmentReports.jsx";
import Learnaccess from "./LearnData/learnaccess";
import LearnPathAccess from "../src/LearnData/Access.js";
import Categories from "../src/Assessment/Categories.js";
import Practicetopic1234 from "../src/PRACTICE/Practicetopic.js";
import PracticeAccess from "./PRACTICE/practiceaccess";
import Practicecategory from "../src/PRACTICE/practiceCategory.js";
import TopicAccess from "./PRACTICE/TopicAccess.jsx";
import Reports from "./LearnData/Reports.js";
import ReportsAction from "./LearnData/ReportsAction";
import LearnUpdate from "./LearnData/LearnUpdate";
import TopicUpdate from "./LearnData/TopicUpdate";
import ContentUpdate from "./LearnData/ContentUpdate";
import AccessPage from "./LearnData/AccessPage";
import Assement from "./assements/assement";
import Basic1 from "./assements/Basic";
import Assessmentsettings from "./assements/assessment settings";
import Assessmentpaper from "./assements/assessmentpaper";
import Selectquctions from "./assements/selectquctions";
import Assementview from "./assements/assementview";
import AssementUpdate from "./assements/assementupdate";
import Blogs1 from "./Blogs/blogs";
import Blogsadd from "./Blogs/blogsadd";
import Participation from "./Assessments Reports/Participation";
import AssessmentView from "./Assessments Reports/AssessmentView";
import TextTable from "./PracticeTest/TextTable";
import UpdateTest from "./PracticeTest/UpdateTest";
import Questionsdatas from "./PracticeTest/SelectQuestion";
import PracticeReport from "./PracticeTest/PracticeReports";
import Header from "./Users/header";
import Sample from "./Users/signup";
import Usersblogs from "./Users/Blogs.jsx";
import Resumetext from "./Users/resumetext.jsx";
import UserHome from "./Users/Home.js";
import UserNavbar from "./Users/Usernavbar.js";
import UserFooter from "./Users/userfooter.js";
import About from "./Users/About_us.js";
import Service from "./Users/services.js";
import TermsAndCondition from "./Users/terms_and_condition.js";
import Contact from "./Users/contact.js";
import NavbarUser from "./Users/navbaruser.js";
import Pricing from "./AdminProfile/pricing.js";
import Billing from "./AdminProfile/billing.js";
import Invoices from "./AdminProfile/invoices.js";
import Changepassword from "./AdminProfile/changepassword.js";
import Userdashbord from "./Users/userdashbord.jsx";
import Activeassement from "../src/Users/activeassement";
import ActiveCourse from "../src/Users/activeCourse.jsx";
import Activepractice from "../src/Users/activepractice.jsx";
import LearningPathReports from "./LearnData/Reports.js";
import UserCoursesHome from "./Users/Courses/CoursesHome.jsx";
import VideoSection from "./Users/Courses/VideoSection.jsx";
import CoursesDetailsPage from "./Users/Courses/CoursesDeatilsPage.jsx";
import CompailerCode from "./Users/Code.js";
import Practicecard from "./Users/Practicecard.jsx";
import DisplyTopics from "./Users/displytopics.jsx";
import Examtext from "./Users/Examtext.jsx";
import Test from "./Users/Test.jsx";
import Viewresult from "./Users/viewresult.jsx";
import Packs1 from "../src/Users/Packs1.js";
import Packs2 from "../src/Users/Packs2.js";
import Packs3 from "../src/Users/Packs3.js";
import Packs4 from "../src/Users/Packs4.js";
import Packs5 from "../src/Users/Packs5.js";
import Packs6 from "../src/Users/Packs6.js";
import Packs7 from "../src/Users/Packs7.js";
import Subscriptionnote from "./Users/subscriptionnote.js";
import CategoriesAccess from "./PRACTICE/CategoriesAccess.jsx";
import SelectQuestionView from "./PracticeTest/SelectQuestionView.jsx";
import BlogsEdit from "../src/Blogs/blogsEdit.jsx";
import AdminHome from "./AdminHome.js";
// import Compilertest from "./AdminProfile/compilertest.js";
import Userassessments from "../src/Users/userassessments.js";
import UserassessmentsIndividual from "./Users/userassessmentsindividual.js";
import UserassessmentsIndividualQuestioncount from "./Users/userassessmentsindividualquestioncount.js";
import UserassessmentsQuestionDetails from "./Users/userassessmentsquestiondetails.js";
import TestViewSolutions from "./Users/TestViewSolutions.js";
import PreviousTestViews from "./Users/PreviousTestViews.js";
import Accesspagedetails from "./LearnData/Accesspagedetails.jsx";
import BlogUser from "./Users/userblog.jsx";
import Compailer from "./Users/Codecompiler.jsx";
import Assessmentdetialsbeforetest from './Users/Courses/Assessmentdetialsbeforetest.js';
import Assessmentdetailsinstructions from './Users/Courses/Assessmentdetailsinstructions.js';
import Assessmentcertificationtest from './Users/Courses/Assessmentcertificationtest.js';
import Assessmentcertificationresult from './Users/Courses/Assessmentcertificationresult.js';
import Certificate from './Users/Courses/certificate.js';
import SuperHomePage from './SuperAdminProfile/SuperHomePage.js'
import SuperLogin from './SuperAdminProfile/SuperLogin.js'

function App() {
	return (
		<div>
			<div className="bodyy bodyyy">
				<Routes>
					<Route exact path="/Admin_Home" element={<AdminHome />} />
					<Route exact path="/UserLogin" element={<UserLogin />} />
					<Route exact path="/InstituteLogin" element={<InstituteLogin />} />
					<Route exact path="/SuperLogin" element={<SuperLogin />} />
					<Route exact path="/SuperHomePage" element={<SuperHomePage />} />
					<Route exact path="/ForgotPassword" element={<ForgotPassword />} />
					<Route exact path="/PerfexHome" element={<PerfexHome />} />
					<Route exact path="/AdminDashboard" element={<AdminDashboard />} />
					<Route exact path="/Admin" element={<Admin />} />
					<Route exact path="/UsersDetails" element={<UsersDetails />} />
					<Route exact path="/ShowData" element={<ShowData />} />
					<Route exact path="/UpdatePage/:id" element={<UpdatePage />} />
					<Route exact path="/ShowData1/:id" element={<ShowData1 />} />
					{/* <Route exact path="/Institute" element={<Institute />} /> */}
					<Route exact path="/BatchYear" element={<BatchYear />} />
					<Route exact path="/Batches" element={<Batches />} />
					<Route exact path="/UpdateYear/:id" element={<UpdateYear />} />
					<Route exact path="/UpdateBatch/:id" element={<UpdateBatch />} />
					<Route exact path="/SearchOption" element={<SearchOption />} />
					<Route exact path="/Dashboard" element={<Dashboard />} />
					{/* <Route exact path="/Footer" element={<Footer />} /> */}
					{/* <Route exact path="/RecentAssessment" element={<RecentAssessment />} />
				<Route exact path="/RecentCourses" element={<RecentCourses />} />
				<Route exact path="/RecentPractice" element={<RecentPractice />} /> */}
					<Route exact path="/Assessment" element={<Assessment />} />
					<Route exact path="/Courses" element={<Courses />} />
					<Route exact path="/Practice" element={<Practice />} />
					<Route exact path="/Blogs" element={<Blogs />} />
					<Route exact path="/JavaProgramming" element={<JavaProgramming />} />
					<Route exact path="/LearnPath" element={<LearnPath />} />
					<Route exact path="/learnaccess" element={<Learnaccess />} />
					<Route
						exact
						path="/LearnPathAccess/:id"
						element={<LearnPathAccess />}
					/>
					<Route exact path="/Learn" element={<Learn />} />
					<Route exact path="/Learning" element={<Learning />} />
					<Route exact path="/topic/:id" element={<Topic />} />
					<Route exact path="/Content/:id/:topicId/:id" element={<Content />} />
					<Route exact path="/textcontent" element={<TextContent />} />
					<Route exact path="/QbSubject" element={<QbSubject />} />
					<Route exact path="/Chapter" element={<Chapter />} />
					<Route exact path="/CreateQuestion" element={<CreateQuestion />} />
					<Route exact path="/McqView" element={<McqView />} />
					<Route exact path="/ParagHome" element={<ParagHome />} />
					<Route exact path="/ParagView" element={<ParagView />} />
					<Route exact path="/Coding" element={<Coding />} />
					<Route exact path="/Codingview" element={<Codingview />} />
					<Route exact path="/upload" element={<Upload />} />
					<Route exact path="/ParagEdit" element={<ParagEdit />} />
					<Route exact path="/Reports" element={<Reports />} />
					<Route
						exact
						path="/LearningPathReports"
						element={<LearningPathReports />}
					/>
					<Route exact path="/createTest" element={<CreateTest />} />
					<Route exact path="/testTable" element={<TextTable />} />
					<Route exact path="/practiceReports" element={<PracticeReport />} />
					<Route
						exact
						path="/practiceTestEdit/:categoryId/:topicId/:testId"
						element={<UpdateTest />}
					/>

					<Route exact path="/UserLoginDetails" element={<Header />} />
					<Route exact path="/CompailerCode" element={<CompailerCode />} />
					<Route exact path="/Compailer" element={<Compailer />} />

					<Route exact path="/Usersblogs" element={<Usersblogs />} />

					<Route exact path="/user/coursesHome" element={<UserCoursesHome />} />
					<Route
						exact
						path="/user/coursesdetailsPage/:id"
						element={<CoursesDetailsPage />}
					/>
					<Route
						exact
						path="/user/courseVideos/:id/:learningPathTitle"
						element={<VideoSection />}
					/>
					<Route exact path="/practies" element={<Practicecard />} />
					<Route exact path="/topics/:id" element={<DisplyTopics />} />
					<Route
						exact
						path="/exam/:learningPathId/:topicId/:contentId"
						element={<Examtext />}
					/>
					<Route
						exact
						path="/test/:categoryId/:topicId/:testId"
						element={<Test />}
					/>
					{/* <Route path="/Ffff" element={<Ffff />}/> */}
					<Route exact path="/Basic" element={<Basic />} />
					<Route exact path="/signupUserData" element={<Sample />} />
					<Route
						exact
						path="/ParticularMcaView"
						element={<ParticularMcaView />}
					/>
					<Route exact path="/Mcqupdate" element={<Mcqupdate />} />
					<Route exact path="/AssignQB" element={<AssignQB />} />
					<Route exact path="/codingupdate" element={<Codingupdate />} />
					<Route exact path="/Reports" element={<Reports />} />
					<Route exact path="/Learnaccess" element={<Learnaccess />} />
					<Route exact path="/AccessPage" element={<AccessPage />} />
					<Route exact path="/categories123" element={<Categories123 />} />
					<Route exact path="/LearnUpdate/:id" element={<LearnUpdate />} />
					<Route
						exact
						path="/TopicUpdate/:id/:topicId"
						element={<TopicUpdate />}
					/>
					<Route
						exact
						path="/ContentUpdate/:id/:topicId/:contentTitle"
						element={<ContentUpdate />}
					/>
					<Route
						exact
						path="/codingupdate/:selectedSubjectId/:selectedChapterId/:codingBasicId"
						element={<Codingupdate />}
					/>
					<Route exact path="/VideoPage" element={<VideoPage />} />
					<Route
						exact
						path="/VideoFolderUpdatePage/:id"
						element={<VideoFolderUpdatePage />}
					/>
					<Route exact path="/Categories987" element={<Categories987 />} />
					<Route exact path="/Access" element={<Access />} />
					<Route exact path="/topics" element={<Topics />} />
					<Route
						exact
						path="/categories-access"
						element={<AssignedAssessmentaccess />}
					/>

					<Route exact path="/Categories" element={<Categories />} />
					<Route exact path="/acces-assessment" element={<Assessmet />} />
					<Route exact path="/view" element={<View />} />
					<Route
						exact
						path="/Assessmentaccess"
						element={<Assessmentaccess />}
					/>
					<Route exact path="/tests" element={<Tests />} />
					<Route exact path="/Assement" element={<Assement />} />
					<Route exact path="/Basic1" element={<Basic1 />} />
					<Route
						exact
						path="/Assessmentsettings"
						element={<Assessmentsettings />}
					/>
					<Route exact path="/Assessmentpaper" element={<Assessmentpaper />} />
					<Route exact path="/Selectquctions" element={<Selectquctions />} />
					<Route exact path="/Assementview" element={<Assementview />} />
					{/* <Route exact path="/AssementUpdate/:categoryId/:AssessmentId" element={<AssementUpdate />} /> */}
					<Route exact path="/Blogs1" element={<Blogs1 />} />
					<Route exact path="/blogsEdit/:id" element={<BlogsEdit />} />
					<Route exact path="/Blogsadd" element={<Blogsadd />} />
					<Route
						exact
						path="/assessmentsReports"
						element={<AssessmentReports />}
					/>
					<Route
						exact
						path="/assessmentView/:selectedCategoryId/:assessmentId"
						element={<AssessmentView />}
					/>
					<Route
						exact
						path="/participationReports"
						element={<Participation />}
					/>
					<Route exact path="/Practicetopic" element={<Practicetopic1234 />} />
					<Route
						exact
						path="/Practicecategory"
						element={<Practicecategory />}
					/>
					<Route exact path="/Packs" element={<Packs1 />} />
					<Route
						exact
						path="/Packs2/:selectedAssessmentName"
						element={<Packs2 />}
					/>
					<Route
						exact
						path="/Packs3/:selectedCategoryId/:assessmentId"
						element={<Packs3 />}
					/>
					<Route
						exact
						path="/Packs4/:selectedCategoryId/:assessmentId"
						element={<Packs4 />}
					/>
					<Route
						exact
						path="/Packs5/:selectedCategoryId/:assessmentId"
						element={<Packs5 />}
					/>
					<Route
						exact
						path="/Packs6/:selectedCategoryId/:assessmentId"
						element={<Packs6 />}
					/>
					<Route exact path="/Packs7" element={<Packs7 />} />
					<Route exact path="/VideoPage" element={<VideoPage />} />
					<Route exact path="/ReportsAction" element={<ReportsAction />} />

					<Route
						exact
						path="/VideoFolderUpdatePage/:id"
						element={<VideoFolderUpdatePage />}
					/>
					<Route exact path="/Categories987" element={<Categories987 />} />
					<Route exact path="/access" element={<Access />} />
					<Route exact path="/topics" element={<Topics />} />
					<Route exact path="/Categories" element={<Categories />} />
					<Route exact path="/acces-assessment" element={<Assessmet />} />
					<Route exact path="/view" element={<View />} />
					<Route
						exact
						path="/Assessmentaccess"
						element={<Assessmentaccess />}
					/>
					<Route exact path="/tests" element={<Tests />} />
					<Route exact path="/Assement" element={<Assement />} />
					<Route exact path="/Basic1" element={<Basic1 />} />
					<Route
						exact
						path="/Assessmentsettings"
						element={<Assessmentsettings />}
					/>
					<Route exact path="/Assessmentpaper" element={<Assessmentpaper />} />
					<Route exact path="/Selectquctions" element={<Selectquctions />} />
					<Route exact path="/Assementview" element={<Assementview />} />
					<Route
						exact
						path="/AssementUpdate/:categoryId/:id"
						element={<AssementUpdate />}
					/>
					<Route exact path="/Blogs1" element={<Blogs1 />} />
					<Route exact path="/Blogsadd" element={<Blogsadd />} />
					<Route exact path="/UserBlogs" element={<BlogUser />} />
					<Route
						exact
						path="/assessmentsReports"
						element={<AssessmentReports />}
					/>
					<Route exact path="/assessmentView" element={<AssessmentView />} />
					<Route
						exact
						path="/participationReports"
						element={<Participation />}
					/>
					<Route exact path="/Practicetopic" element={<Practicetopic1234 />} />
					<Route
						exact
						path="/Practicecategory"
						element={<Practicecategory />}
					/>
					<Route exact path="/" element={<UserHome />} />
					<Route exact path="/User/usernavbar" element={<UserNavbar />} />
					<Route exact path="/User/userfooter" element={<UserFooter />} />
					<Route exact path="/User/About-us" element={<About />} />
					<Route exact path="/User/services" element={<Service />} />
					<Route exact path="/question/:id/:topicid/" element={<Examtext />} />
					<Route
						exact
						path="/test/:categoryId/:topicId/:testId"
						element={<Test />}
					/>
					<Route
						exact
						path="/User/terms-condition"
						element={<TermsAndCondition />}
					/>
					<Route exact path="/User/contact" element={<Contact />} />
					<Route exact path="/User/navbaruser" element={<NavbarUser />} />
					{/* Profile */}
					<Route exact path="/profile/pricing" element={<Pricing />} />
					<Route exact path="/profile/billing" element={<Billing />} />
					<Route exact path="/profile/invoices" element={<Invoices />} />
					<Route
						exact
						path="/profile/change_password"
						element={<Changepassword />}
					/>
					{/* <Route exact path="/profile/compilerTest" element={<Compilertest />} /> */}
					<Route exact path="/Usersblogs" element={<Usersblogs />} />
					<Route exact path="/Userdashbord" element={<Userdashbord />} />
					<Route exact path="/Activeassement" element={<Activeassement />} />
					<Route exact path="/ActiveCourse" element={<ActiveCourse />} />
					<Route exact path="/Activepractice" element={<Activepractice />} />
					<Route exact path="/Viewresult" element={<Viewresult />} />
					<Route exact path="/Usersblogs" element={<Usersblogs />} />
					<Route exact path="/Resumetext" element={<Resumetext />} />
					<Route
						exact
						path="/subscriptionnote"
						element={<Subscriptionnote />}
					/>
					<Route
						exact
						path="/CategoriesAccess"
						element={<CategoriesAccess />}
					/>
					<Route exact path="/PracticeTopicAccess" element={<TopicAccess />} />
					<Route
						exact
						path="/SelectQuestionView"
						element={<SelectQuestionView />}
					/>
					<Route exact path="/PracticeAccess" element={<PracticeAccess />} />
					<Route
						exact
						path="/ParticularParagView"
						element={<ParticularParagView />}
					/>
					<Route exact path="/Userassessments" element={<Userassessments />} />
					<Route
						exact
						path="/UserassessmentsIndividual/:selectedCategoryId/:selectedCategoryName/:selectedCategoryTag"
						element={<UserassessmentsIndividual />}
					/>
					<Route
						exact
						path="/UserassessmentsIndividualQuestioncount/:selectedCategoryId/:assessmentId"
						element={<UserassessmentsIndividualQuestioncount />}
					/>
					<Route
						exact
						path="/UserassessmentsQuestionDetails/:selectedCategoryId/:assessmentId"
						element={<UserassessmentsQuestionDetails />}
					/>
					<Route
						exact
						path="/TestViewSolutions"
						element={<TestViewSolutions />}
					/>
					<Route
						exact
						path="/PreviousTestViews"
						element={<PreviousTestViews />}
					/>
					<Route
						exact
						path="/Accesspagedetails"
						element={<Accesspagedetails />}
					/>
					<Route
						exact
						path="/Assessmentdetialsbeforetest/:learningPathTitle"
						element={<Assessmentdetialsbeforetest />}
					/>
					<Route
						exact
						path="/Assessmentdetailsinstructions/:learningPathTitle"
						element={<Assessmentdetailsinstructions />}
					/>
					<Route
						exact
						path="/Assessmentcertificationtest/:learningPathTitle"
						element={<Assessmentcertificationtest />}
					/>
					<Route
						exact
						path="/Assessmentcertificationresult"
						element={<Assessmentcertificationresult />}
					/>
					<Route
						exact
						path="/Certificate"
						element={<Certificate />}
					/>
					
					
					
				</Routes>
			</div>
			<div className="bodyyyy">
				<div className="row">
					<div className="col-md-2"></div>
					<div className="col-md-8">
						<div
							className="desktop_img text-center"
							style={{ height: "100px" }}
						>
							<img
								src="https://img.freepik.com/free-vector/computer-design_1156-101.jpg?w=740&t=st=1709268367~exp=1709268967~hmac=4f64a39e8a32b13a2a1d3142bd9de72ee79054e25e987a4c56ff3ce3cd298fd1"
								className=" img-fluid"
								style={{ height: "300px", marginTop: "15px" }}
							/>
							<h3 className="text-center">Open In Desktop Only</h3>
						</div>
					</div>
					<div className="col-md-2"></div>
				</div>
			</div>
		</div>
	);
}
export default App;
