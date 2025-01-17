"use strict";
const { Op ,literal} = require("sequelize");
const PhoneNumber = require("../models/phonenumberModel");
const Campaigns = require("../models/campaignsModel");
const CallDetails = require("../models/callModel");
const config = require("../config");
const { ErrorHandler } = require("../helpers/errorhandler");
const moment = require("moment"); // Add moment library


// const createCall = async (req, res, next) => {
// 	try {
// 		console.log("Api called");
// 		// Step 1: Fetch all active campaigns
// 		let campaigns;
// 		try {
// 			campaigns = await Campaigns.findAll({
// 				where: { campaign_status: 1 },
// 				raw: true,
// 			});
// 			// console.log("campaigns", campaigns);
// 		} catch (error) {
// 			throw new ErrorHandler(500, "Error fetching campaigns", error);
// 		}

// 		if (!campaigns || campaigns.length === 0) {
// 			return res.json({
// 				success: false,
// 				message: "No Campaign Found!",
// 			});
// 		}

// 		let contact = {};

// 		const now = moment(); // Current date and time
// 		const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
// 		for (const campaign of campaigns) {
// 			const campStartDate = moment(campaign.startDate);
// 			const campEndDate = moment(campaign.endDate);
// 			const campDailyStartTime = moment(
// 				campaign.dailyStartTime,
// 				"HH:mm:ss"
// 			);
// 			const campDailyEndTime = moment(campaign.dailyEndTime, "HH:mm:ss");
// 			const campDaysOfWeek = JSON.parse(campaign.daysOfWeek); // Assuming daysOfWeek is a JSON array

// 			const isDateInRange = now.isBetween(
// 				campStartDate,
// 				campEndDate,
// 				null,
// 				"[]"
// 			);
// 			console.log("isDateInRange", isDateInRange);
// 			const isTimeInRange = now.isBetween(
// 				campDailyStartTime,
// 				campDailyEndTime,
// 				"seconds",
// 				"[]"
// 			);
// 			console.log("campDailyStartTime", campDailyStartTime);
// 			console.log("campDailyEndTime", campDailyEndTime);
// 			console.log("now", now);
// 			console.log("isTimeInRange", isTimeInRange);
// 			const isDayOfWeek = campDaysOfWeek.includes(dayNames[now.day()]);
// 			console.log("isDayOfWeek", isDayOfWeek);

// 			if (!isDateInRange || !isTimeInRange || !isDayOfWeek) {
// 				continue; // Skip this campaign if the conditions are not met
// 			}

// 			let contactListIds = [];
// 			try {
// 				if (campaign.selectedContactLists) {
// 					let contactLists = JSON.parse(
// 						campaign.selectedContactLists
// 					);
// 					contactLists.forEach((list) =>
// 						contactListIds.push(list.id)
// 					);
// 				}
// 			} catch (error) {
// 				throw new ErrorHandler(
// 					500,
// 					"Error parsing contact lists",
// 					error
// 				);
// 			}

// 			// Step 3: Fetch phone numbers where contact_list_id is in the extracted contact list IDs
// 			let phoneNumbers;
// 			try {
// 				phoneNumbers = await PhoneNumber.findAll({
// 					where: {
// 						contact_list_id: {
// 							[Op.in]: contactListIds,
// 						},
// 					},
// 					raw: true,
// 				});
// 			} catch (error) {
// 				throw new ErrorHandler(
// 					500,
// 					"Error fetching phone numbers",
// 					error
// 				);
// 			}

// 			// API call headers and options setup
// 			const myHeaders = new Headers();
// 			myHeaders.append("Content-Type", "application/json");
// 			myHeaders.append("Accept", "application/json");
// 			myHeaders.append(
// 				"Authorization",
// 				"Bearer 1a4920fa-e1ef-4451-a726-e4d172999737"
// 			);
// 			myHeaders.append(
// 				"Cookie",
// 				"_cfuvid=ijZrE4lfXYLbvWmKj063gsLchESwQX25ycsyfG_u32A-1717647619760-0.0.1.1-604800000"
// 			);

// 			const results = [];

// 			for (const phone of phoneNumbers) {
// 				console.log("campaign.dnc_list", campaign.dncList);
// 				console.log("phone status", phone.status);
// 				if (
// 					(campaign.dncList &&
// 						phone.status === "Answering machine") ||
// 					phone.status === "wrong Number"
// 				) {
// 					console.log("true");
// 					continue;
// 				}else{
// 					console.log("false");

// 				const raw = JSON.stringify({
// 					customer: {
// 						number: phone.phone,
// 						name: phone.name,
// 					},
// 					phoneNumberId: JSON.parse(campaign.callerId).id,
// 					assistantId: JSON.parse(campaign.vapiAgent).id,
// 				});

// 				const requestOptions = {
// 					method: "POST",
// 					headers: myHeaders,
// 					body: raw,
// 					redirect: "follow",
// 				};

// 				// Step 4: Call the API and collect responses
// 				let apiResult;
// 				try {
// 					const apiResponse = await fetch(
// 						"https://api.vapi.ai/call/phone",
// 						requestOptions
// 					);
// 					apiResult = await apiResponse.json();
// 				} catch (error) {
// 					throw new ErrorHandler(500, "Error calling API", error);
// 				}

// 				if (apiResult) {
// 					results.push({
// 						phoneNumber: phone.phone,
// 						response: apiResult,
// 					});

// 					// Extract data to save into the database
// 					const callDetailsData = {
// 						campaign_id: campaign.id,
// 						call_id: apiResult.id,
// 						assistant_id: apiResult.assistantId,
// 						phone_number_id: apiResult.phoneNumberId,
// 						org_id: apiResult.orgId,
// 						number: apiResult.customer.number,
// 						name: apiResult.customer.name,
// 						created_at: apiResult.createdAt,
// 					};

// 					// Save the data into the call_details table
// 					try {
// 						await CallDetails.create(callDetailsData);
// 					} catch (error) {
// 						throw new ErrorHandler(
// 							500,
// 							"Error saving call details",
// 							error
// 						);
// 					}
// 				}

// 				// Introduce a 5-second delay before the next iteration
// 				await new Promise((resolve) => setTimeout(resolve, 5000));
// 			}
// 		}

// 			contact[campaign.id] = {
// 				campaignDetails: campaign,
// 				apiResults: results,
// 			};
// 		}

// 		// Step 5: Return the campaigns and the fetched phone numbers with API responses
// 		return res.json({
// 			success: true,
// 			message: "Fetched all campaigns and phone numbers successfully!",
// 			result: contact,
// 		});
// 	} catch (error) {
// 		next(new ErrorHandler(500, config.common_err_msg, error));
// 	}
// };

const createCall = async (req, res, next) => {
	try {
		console.log("Api called");
		// Step 1: Fetch all active campaigns
		let campaigns;
		try {
			campaigns = await Campaigns.findAll({
				where: { campaign_status: 1 },
				raw: true,
			});
			// console.log("campaigns", campaigns);
		} catch (error) {
			throw new ErrorHandler(500, "Error fetching campaigns", error);
		}

		if (!campaigns || campaigns.length === 0) {
			return res.json({
				success: false,
				message: "No Campaign Found!",
			});
		}

		let contact = {};

		const now = moment(); // Current date and time
		const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
		for (const campaign of campaigns) {
			const campStartDate = moment(campaign.startDate);
			const campEndDate = moment(campaign.endDate);
			const campDailyStartTime = moment(
				campaign.dailyStartTime,
				"HH:mm:ss"
			);
			const campDailyEndTime = moment(campaign.dailyEndTime, "HH:mm:ss");
			const campDaysOfWeek = JSON.parse(campaign.daysOfWeek); // Assuming daysOfWeek is a JSON array

			const isDateInRange = now.isBetween(
				campStartDate,
				campEndDate,
				null,
				"[]"
			);
			console.log("isDateInRange", isDateInRange);
			const isTimeInRange = now.isBetween(
				campDailyStartTime,
				campDailyEndTime,
				"seconds",
				"[]"
			);
			console.log("campDailyStartTime", campDailyStartTime);
			console.log("campDailyEndTime", campDailyEndTime);
			console.log("now", now);
			const isDayOfWeek = campDaysOfWeek.includes(dayNames[now.day()]);
			console.log("isDayOfWeek", isDayOfWeek);
			console.log("isTimeInRange", isTimeInRange);
			if (!isDateInRange || !isDayOfWeek || !isTimeInRange) {
				continue; // Skip this campaign if the conditions are not met
			}

			let contactListIds = [];
			try {
				if (campaign.selectedContactLists) {
					let contactLists = JSON.parse(
						campaign.selectedContactLists
					);
					console.log("contactLists", contactLists);

					// Check if contactLists is an array or a single object
					if (Array.isArray(contactLists)) {
						contactLists.forEach((list) =>
							contactListIds.push(list.id)
						);
					} else if (
						contactLists &&
						typeof contactLists === "object"
					) {
						contactListIds.push(contactLists.id);
					}
				}
			} catch (error) {
				throw new ErrorHandler(
					500,
					"Error parsing contact lists",
					error
				);
			}

			// Step 3: Fetch phone numbers where contact_list_id is in the extracted contact list IDs
			let phoneNumbers;
			try {
				phoneNumbers = await PhoneNumber.findAll({
					where: {
						contact_list_id: {
							[Op.in]: contactListIds,
						},
					},
					raw: true,
				});
			} catch (error) {
				throw new ErrorHandler(
					500,
					"Error fetching phone numbers",
					error
				);
			}

			// API call headers and options setup
			const myHeaders = new Headers();
			myHeaders.append("Content-Type", "application/json");
			myHeaders.append("Accept", "application/json");
			myHeaders.append(
				"Authorization",
				"Bearer 1a4920fa-e1ef-4451-a726-e4d172999737"
			);
			myHeaders.append(
				"Cookie",
				"_cfuvid=ijZrE4lfXYLbvWmKj063gsLchESwQX25ycsyfG_u32A-1717647619760-0.0.1.1-604800000"
			);

			const results = [];

			for (const phone of phoneNumbers) {
				console.log("campaign.dnc_list", campaign.dncList);
				console.log("phone status", phone.status);
				if (
					(campaign.dncList &&
						phone.status === "Answering machine") ||
					phone.status === "wrong Number"
				) {
					console.log("true");
					continue;
				} else {
					console.log("false");

					const raw = JSON.stringify({
						customer: {
							number: phone.phone,
							name: phone.name,
						},
						phoneNumberId: JSON.parse(campaign.callerId).id,
						assistantId: JSON.parse(campaign.vapiAgent).id,
					});

					const requestOptions = {
						method: "POST",
						headers: myHeaders,
						body: raw,
						redirect: "follow",
					};

					// Step 4: Call the API and collect responses
					let apiResult;
					try {
						const apiResponse = await fetch(
							"https://api.vapi.ai/call/phone",
							requestOptions
						);
						apiResult = await apiResponse.json();
					} catch (error) {
						throw new ErrorHandler(500, "Error calling API", error);
					}

					if (apiResult) {
						results.push({
							phoneNumber: phone.phone,
							response: apiResult,
						});

						// Extract data to save into the database
						const callDetailsData = {
							campaign_id: campaign.id,
							call_id: apiResult.id,
							assistant_id: apiResult.assistantId,
							phone_number_id: apiResult.phoneNumberId,
							org_id: apiResult.orgId,
							number: apiResult.customer.number,
							name: apiResult.customer.name,
							created_at: apiResult.createdAt,
						};

						// Save the data into the call_details table
						try {
							await CallDetails.create(callDetailsData);
						} catch (error) {
							throw new ErrorHandler(
								500,
								"Error saving call details",
								error
							);
						}
					}

					// Introduce a 5-second delay before the next iteration
					await new Promise((resolve) => setTimeout(resolve, 5000));
				}
			}

			contact[campaign.id] = {
				campaignDetails: campaign,
				apiResults: results,
			};
		}

		// Step 5: Return the campaigns and the fetched phone numbers with API responses
		return res.json({
			success: true,
			message: "Fetched all campaigns and phone numbers successfully!",
			result: contact,
		});
	} catch (error) {
		next(new ErrorHandler(500, config.common_err_msg, error));
	}
};

const getAllCallLogDetail = async (req, res, next) => {
	try {
		const { id } = req.params;

		let contactListData;
		try {
			contactListData = await CallDetails.findAll({
				where: { campaign_id: id },
			});
		} catch (error) {
			throw new ErrorHandler(500, "Error fetching call log details", error);
		}

		if (!contactListData || contactListData.length === 0) {
			return res.json({
				success: false,
				message: "No List found for the given ID",
			});
		}

		return res.json({
			success: true,
			result: contactListData,
		});
	} catch (error) {
		next(new ErrorHandler(500, "Error fetching numbers", error));
	}
};

/**
 * getCallDetails
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const getCallDetails = async (req, res, next) => {
	try {
		const { call_id } = req.params;

		if (!call_id) {
			return res.status(400).json({
				success: false,
				message: "Call ID not provided",
			});
		}

		// Define headers and request options
		const myHeaders = new Headers();
		myHeaders.append("Accept", "application/json");
		myHeaders.append(
			"Authorization",
			"Bearer 1a4920fa-e1ef-4451-a726-e4d172999737"
		);
		myHeaders.append(
			"Cookie",
			"_cfuvid=ijZrE4lfXYLbvWmKj063gsLchESwQX25ycsyfG_u32A-1717647619760-0.0.1.1-604800000"
		);

		const requestOptions = {
			method: "GET",
			headers: myHeaders,
			redirect: "follow",
		};

		// Fetch call details from the API
		const apiResponse = await fetch(
			`https://api.vapi.ai/call/${call_id}`,
			requestOptions
		);
		if (!apiResponse.ok) {
			throw new Error(
				`API request failed with status ${apiResponse.status}`
			);
		}

		const callLogDetail = await apiResponse.json();

		if (!callLogDetail) {
			
			return res.status(404).json({
				success: false,
				message: "No details found for the given Call ID",
			});
		}
		console.log("calllogdetail",callLogDetail);
		return res.json({
			success: true,
			result: callLogDetail,
		});
	} catch (error) {
		next(new ErrorHandler(500, "Error fetching call details", error));
	}
};
const getCampaignName = async (req, res, next) => {
	const myHeaders = new Headers();
	myHeaders.append("Accept", "application/json");
	myHeaders.append(
		"Authorization",
		"Bearer 1a4920fa-e1ef-4451-a726-e4d172999737" // Replace with your API key
	);

	const requestOptions = {
		method: "GET",
		headers: myHeaders,
		redirect: "follow",
	};

	try {
		const response = await fetch(
			"https://api.vapi.ai/phone-number",
			requestOptions
		);
		const result = await response.json();
		if (Array.isArray(result)) {
			const formattedData = result.map((agent) => ({
				id: agent.id,
				name: agent.number,
			}));

			// Fetch campaigns for each formattedData entry
			const campaigns = await Promise.all(
				formattedData.map(async (data) => {
					try {
						// Fetch campaigns where caller_id JSON contains the specified id
						const campaignResponse = await Campaigns.findAll({
							attributes: ["campaignName"], // Select only id and campaignName
							where: literal(
								`JSON_CONTAINS(caller_id, '{"id": "${data.id}" }')`
							),
							raw: true,
						});
						let campName = campaignResponse[0]["campaignName"];
						return {
							...data,
							campName: campName,
						};
					} catch (error) {
						console.error(
							`Error fetching campaigns for caller_id ${data.id}:`,
							error
						);
						return {
							...data,
							campName: null, // Handle error case as needed
						};
					}
				})
			);

			res.status(200).json(campaigns);
		} else {
			res.status(404).json({ message: "No agents found" });
		}
	} catch (error) {
		console.error("Error fetching caller numbers:", error);
		res.status(500).json({ message: "Error fetching data" });
	}
};
module.exports = {
	createCall,
	getAllCallLogDetail,
	getCallDetails,
	getCampaignName,
};