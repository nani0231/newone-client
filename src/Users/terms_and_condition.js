import React from "react";
import UserFooter from "./userfooter";
import NavbarUser from "./navbaruser";
import UserNavbar from "./Usernavbar";
import Cookies from "js-cookie";
import { useState, useEffect } from "react";
const TermsAndCondition = () => {
	const [navbarSetting, setNavbarSetting] = useState(null);

	useEffect(() => {
		const token = Cookies.get("token");

		if (token) {
			setNavbarSetting(<NavbarUser />);
		} else {
			setNavbarSetting(<UserNavbar />);
		}
	}, []);
	return (
		<div>
			{navbarSetting}
			<div className="about_banner">
				<div className="Terms">
					<div className="">Terms and Conditions</div>
				</div>
				<div className="container-fluid">
					<div className="row">
						<div className="col-md-1"></div>
						<div className="col-md-10">
							<div className="  text-justify">
								<p className="mt-4 term_text">
									<span
										style={{
											fontSize: "17px",
											fontWeight: "600",
											color: "#000",
										}}
									>
										Skillhub:
									</span>{" "}
									We respect your privacy. We collect and use minimal personal
									information solely for the purpose of providing and improving
									our services. We employ industry-standard security measures to
									protect your data. We do not sell or share your information
									with third parties. By using our services, you agree to our
									Privacy Policy. For more details, please review our full
									Privacy Policy on our website.
								</p>
								<p className="info1">
									We do not share any of you information with third parties.
								</p>
								<span className="term_text">
									Rest assured, your privacy is our priority. We strictly adhere
									to a policy of not sharing any of your information with third
									parties. Your trust is fundamental, and we are committed to
									safeguarding your data. Our stringent privacy measures ensure
									that your personal information remains confidential, providing
									you with a secure and trustworthy experience. Your
									confidentiality is integral to our commitment to building a
									relationship based on trust and transparency.
								</span>
								<p className="info1">
									You are the responsible for maintaining the confidancial of
									your Username, Registered email and Password
								</p>
								<span className="term_text">
									Security Reminder: You are responsible for safeguarding the
									confidentiality of your username, registered email, and
									password. Ensure their privacy to prevent unauthorized access
									to your account. Never share your login credentials or respond
									to suspicious requests. We employ robust security measures,
									but your diligence is crucial. Regularly update passwords and
									be cautious of phishing attempts. In case of any security
									concerns, contact our support team immediately. Your
									cooperation in maintaining the confidentiality of your account
									information is vital for a secure online experience.
								</span>
								<p className="info1">Information we collect</p>
								<span className="term_text">
									Information Collection: We collect minimal personal data to
									enhance user experience. This may include your name, email,
									and device information. We use cookies to gather non-personal
									data, such as browsing history, for analytics and site
									optimization. Your IP address is logged for security purposes.
									We do not knowingly collect data from minors. The information
									collected is solely used for providing and improving our
									services. We prioritize data security, employing
									industry-standard measures to protect your information. By
									using our platform, you consent to this data collection.
									Review our detailed Privacy Policy for a comprehensive
									overview of the information we collect, its purpose, and how
									we ensure its confidentiality.
								</span>
								<p className="info1">Usage of collected information</p>
								<span className="term_text">
									Any of the information we collected from you may be used in
									one of the following ways :
								</span>
								<p className="term_text">1) To personalize your experience</p>
								<p className="term_text">
									Your information helps us to better respond to your individual
									needs
								</p>
								<p className="term_text">2) To improve our website.</p>
								<span className="term_text">
									Website Improvement: Your feedback is invaluable. We
									continually strive to enhance user experience on our website.
									Please share your insights, suggestions, and experiences. Your
									input guides our efforts to create a more user-friendly,
									efficient, and enjoyable online environment for all visitors.
									Thank you for contributing to our ongoing improvement process.
								</span>
								<p className="info1">Cancellation Policy</p>
								<div className="mb-3 term_text">
									<span
										style={{
											fontSize: "17px",
											fontWeight: "600",
											color: "#000",
										}}
									>
										Skillhub:
									</span>{" "}
									We understand that plans may change, and we aim to accommodate
									your needs. If you wish to cancel your reservation or service,
									please notify us at least 48 hours in advance. For
									cancellations within this timeframe, a nominal fee may apply.
								</div>
								<div className="mb-3 term_text">
									Refunds will be processed promptly for cancellations made in
									compliance with our policy. No-shows or cancellations made
									less than 24 hours before the scheduled time may be subject to
									the full charge. Special circumstances will be considered on a
									case-by-case basis. We prioritize fairness and transparency in
									our cancellation policy to ensure a positive experience for
									all customers. Please contact our customer support for any
									cancellation requests or inquiries, and we will do our best to
									assist you.
								</div>
								<span className="term_text">
									We appreciate your understanding and cooperation in adhering
									to these guidelines as they enable us to provide reliable and
									efficient services to all our customers. Note that specific
									terms and conditions may vary, so we encourage you to review
									the detailed cancellation policy on our website or contact our
									customer service for clarification.
								</span>
								<p className="info1">Refund Policy</p>
								<div className="mb-3 term_text">
									<span
										style={{
											fontSize: "17px",
											fontWeight: "600",
											color: "#000",
										}}
									>
										Skillhub:
									</span>{" "}
									We strive to ensure your satisfaction with our
									products/services. If you encounter issues, please contact our
									customer support within 14 days of purchase for a refund. We
									assess each case individually and may require proof of
									purchase. Refunds are processed promptly upon approval, and
									the funds are returned using the original payment method.{" "}
								</div>
								<span className="term_text">
									Please note that certain products/services may have specific
									refund terms, and digital goods may be non-refundable. We aim
									to address concerns promptly, providing a fair and transparent
									refund process. For detailed information, refer to our refund
									policy on our website or contact our customer support for
									assistance.
								</span>
								<p className="info1">Contact Details -</p>
								<div className="mb-3">Name : Skillhub</div>
								<div className="mb-3">Email : suuport@skillhub.in</div>
							</div>
						</div>
						<div className="col-md-1"></div>
					</div>
				</div>
			</div>

			<div>
				<UserFooter />
			</div>
		</div>
	);
};

export default TermsAndCondition;
