const dotenv = require("dotenv");
dotenv.config();

module.exports = {
	port: process.env.PORT || 8000,
	common_err_msg: "Something went wrong. Please try again later.",
	try_again_msg: "Please try again later.",
	missing_fields: "Missing required fields",
	secret: process.env.SECRET,
	app_name: "Engagement Academy",
	reset_password_validity: 1,
	site_url: "http://localhost:3000/", // 'http://posters-frontend.stagingwebsites.info/' http://localhost:3001
	stripe_secret_key: process.env.STRIPE_SECRET_KEY,
	stripe_currency: "usd",
	smtp: {
		host: "smtp-relay.sendinblue.com",
		port: 587,
		user: "ankur@ourdesignz.com",
		pass: "ENPYT79RZQHLyAmW",
		fromEmail: "admin@stagingwebsites.info",
		fromAlias: "Engagement Academy Website Admin",
	},
	order_number_prefix: "PR",
	order_number_zeros_length: 5,
	product_file_path: "assets/product_files/",
};
