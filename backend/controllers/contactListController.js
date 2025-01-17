"use strict";
const { Op ,literal,where} = require("sequelize"); // Import Sequelize operators
const ContactList = require("../models/contactListModel"); // Adjust the path as necessary
const PhoneNumber = require("../models/phonenumberModel");
const Campaigns = require("../models/campaignsModel");
const CallDetails = require("../models/callModel");
const { ErrorHandler } = require("../helpers/errorhandler");
const config = require("../config");
/**
 * Create Contact List
 *
 * @param {*} req
 * @param {*} res
 */
const createContactList = async (req, res) => {
	const { list_name, description, userid, leads } = req.body;

	// Validate input
	if (!list_name || !description || !userid) {
		return res.status(400).json({
			message:
				"Invalid input. All fields are required and at least one row must be selected.",
		});
	}

	try {
		// Check if contact list with the same name already exists
		const ifExist = await checkIfContactListExist(list_name);
		if (ifExist) {
			return res.status(409).json({
				success: false,
				message: "List Name already exists!",
			});
		}

		// Create new contact list
		const newContactList = await ContactList.create({
			list_name,
			description,
			userid,
			leads: JSON.stringify(leads), // Store selectedRows as JSON string
			createdAt: new Date(),
			updatedAt: new Date(),
		});

		// Update the PhoneNumber table with the new contact list ID
		await PhoneNumber.update(
			{ contact_list_id: newContactList.contact_list_id }, // Assuming the foreign key column is named contact_list_id
			{ where: { id: leads } }
		);

		res.status(200).json({
			success: true,
			message: "Contact list created successfully",
			data: newContactList,
		});
	} catch (error) {
		console.error("Error creating contact list:", error);
		res.status(500).json({
			message: "Internal server error. Please try again later.",
		});
	}
};

/**
 * Check if contact list exists
 *
 * @param {string} list_name
 * @returns {Promise<boolean>}
 */
const checkIfContactListExist = async (list_name) => {
	try {
		const result = await ContactList.findOne({ where: { list_name } });
		return result ? true : false;
	} catch (error) {
		console.error("Error checking if contact list exists:", error);
		throw new Error("Error checking if contact list exists");
	}
};

/**
 * Fetch user details
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
// const getAllContactList = async (req, res, next) => {
// 	try {
// 		const { id } = req.params;
// 		// console.log(id);

// 		const contactListData = await ContactList.findAll({
// 			where: { userid: id },
// 		});
// 		if (!contactListData) {
// 			return res.json({
// 				success: false,
// 				message: "No List found for the given ID",
// 			});
// 		}

// 		return res.json({
// 			success: true,
// 			result: contactListData,
// 		});
// 	} catch (error) {
// 		next(new ErrorHandler(500, "Error fetching numbers", error));
// 	}
// };

const getAllContactList = async (req, res, next) => {
	try {
		const { id } = req.params;
		// Fetch contact list data based on userid
		const contactListData = await ContactList.findAll({
			where: { userid: id },
		});

		if (!contactListData.length) {
			return res.json({
				success: false,
				message: "No List found for the given ID",
			});
		}

		// Loop through each contact list entry and fetch the corresponding campaign name
		const results = await Promise.all(
			contactListData.map(async (contact) => {
				const campaign = await Campaigns.findOne({
					where: { contact_lists_id: contact.contact_list_id },
					attributes: ["id", "campaign_name"],
				});
				// console.log(campaign);
				return {
					...contact.toJSON(),
					campaign_name: campaign
						? campaign.dataValues.campaign_name
						: "N/A",
					campaignId: campaign ? campaign.dataValues.id : "N/A",
				};
			})
		);

		return res.json({
			success: true,
			result: results,
		});
	} catch (error) {
		next(new ErrorHandler(500, "Error fetching numbers", error));
	}
};
/**
 * getContactListDetail
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const getContactListDetail = async (req, res, next) => {
	try {
		const { contact_list_id } = req.params;
		const contactListData = await ContactList.findOne({
			where: { contact_list_id: contact_list_id },
		});
		if (!contactListData) {
			return res.status(402).json({
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
 * Fetch user details
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const getAllNumbersForCreateList = async (req, res, next) => {
	try {
		const { id } = req.params;

		const phoneNumbers = await PhoneNumber.findAll({
			where: { userid: id, contact_list_id: null },
		});
		if (!phoneNumbers.length) {
			return res.status(404).json({
				success: false,
				message: "No numbers found for the given ID",
			});
		}

		return res.json({
			success: true,
			result: phoneNumbers,
		});
	} catch (error) {
		next(new ErrorHandler(500, "Error fetching numbers", error));
	}
};

/**
 * Delete contact List
 *
 * @param {*} req
 * @param {*} res
 */
const deletecontactList = async (req, res) => {
	const { contact_list_id } = req.params;

	if (!contact_list_id) {
		return res.status(400).json({ error: "Phone munber not provided" });
	}

	try {
		const contactListExist = await Campaigns.findOne({
			where: { contact_lists_id: contact_list_id },
			raw: true,
		});

		if (contactListExist) {
			return res.status(201).json({
				message: `Looks like this list is being used in one or more campaigns, please check and try again.`,
			});
		}
		// Update the PhoneNumber table with the new contact list ID
		await PhoneNumber.update(
			{ contact_list_id: null }, // Assuming the foreign key column is named contact_list_id
			{ where: { contact_list_id: contact_list_id } }
		);
		// Find and delete the user from the database
		const deletecontactList = await ContactList.destroy({
			where: { contact_list_id: contact_list_id },
		});

		if (deletecontactList) {
			return res.status(200).json({ message: `Deleted Contact` });
		} else {
			return res
				.status(404)
				.json({ message: `Phone ${phone} not found` });
		}
	} catch (error) {
		console.error("Error:", error);
		return res.status(500).json({ error: "Internal server error" });
	}
};
/**
 * getAllContactListNumbers
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const getAllContactListNumbers = async (req, res, next) => {
	try {
		const { id, contactList } = req.params;
		let parsedContactList;
		let whereClause = { userid: id };

		try {
			parsedContactList = JSON.parse(contactList);
		} catch (e) {
			return res.status(400).json({
				success: false,
				message: "Invalid contact list format.",
			});
		}

		if (Array.isArray(parsedContactList)) {
			whereClause.contact_list_id = { [Op.in]: parsedContactList };
		} else if (
			typeof parsedContactList === "number" ||
			typeof parsedContactList === "string"
		) {
			whereClause.contact_list_id = parsedContactList;
		} else {
			return res.status(400).json({
				success: false,
				message: "Invalid contact list format.",
			});
		}

		const phoneNumbers = await PhoneNumber.findAll({
			where: whereClause,
		});

		if (!phoneNumbers.length) {
			return res.status(404).json({
				success: false,
				message: "No numbers found for the given ID",
			});
		}

		return res.json({
			success: true,
			result: phoneNumbers,
		});
	} catch (error) {
		next(new ErrorHandler(500, "Error fetching numbers", error));
	}
};

/**
 * getAllAvailableNumbers
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */

const getAllAvailableNumbers = async (req, res, next) => {
	try {
		const { id, contact_list_id } = req.params;

		const phoneNumbers = await PhoneNumber.findAll({
			where: {
				userid: id,
				[Op.or]: [
					{ contact_list_id: null },
					{ contact_list_id: contact_list_id },
					{ contact_list_id: "" },
				],
			},
		});

		if (!phoneNumbers.length) {
			return res.status(404).json({
				success: false,
				message: "No numbers found for the given ID",
			});
		}

		return res.json({
			success: true,
			result: phoneNumbers,
		});
	} catch (error) {
		next(new ErrorHandler(500, "Error fetching numbers", error));
	}
};
/**
 * updateContactList
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */

const updateContactList = async (req, res, next) => {
	try {
		const { list_name, description, userid, leads, oldLead } = req.body;
		const { contact_list_id } = req.params;
		// Update the PhoneNumber table with the new contact list ID
		const leadsString = JSON.stringify(leads);
		await ContactList.update(
			{
				list_name: list_name,
				description: description,
				userid: userid,
				leads: leadsString,
			}, // Assuming the foreign key column is named contact_list_id
			{ where: { contact_list_id: contact_list_id } }
		);
		// Update the PhoneNumber table with the new contact list ID
		const status = await PhoneNumber.update(
			{ contact_list_id: null }, // Assuming the foreign key column is named contact_list_id
			{ where: { id: oldLead } }
		);
		if (status) {
			await PhoneNumber.update(
				{ contact_list_id: contact_list_id }, // Assuming the foreign key column is named contact_list_id
				{ where: { id: leads } }
			);
		}

		res.status(200).json({
			success: true,
			message: "Contact list updated  successfully",
		});
	} catch (error) {
		next(new ErrorHandler(500, "Error fetching numbers", error));
	}
};

/**
 * Create Campaign
 *
 * @param {*} req
 * @param {*} res
 */
const createCampaign = async (req, res) => {
	const {
		campaignName,
		campaignStatus,
		callerId,
		dailyStartTime,
		dailyEndTime,
		daysOfWeek,
		callsPerMinute,
		dncList,
		startDate,
		endDate,
		timeZone,
		internalNotes,
		selectedContactLists,
		selectedUserList,
		vapiAgent,
	} = req.body;

	// Validate input
	if (
		!campaignName ||
		!startDate ||
		!endDate ||
		!selectedContactLists ||
		!selectedUserList
	) {
		return res.status(400).json({
			message: "Invalid input. All fields are required.",
		});
	}

	try {
		// Check if campaign with the same name already exists
		const ifExist = await checkIfCampaignExist(campaignName);
		if (ifExist) {
			return res.status(201).json({
				success: false,
				message: "Campaign Name already exists!",
			});
		}

		// Create new campaign
		const newCampaign = await Campaigns.create({
			campaignName,
			campaignStatus,
			dailyStartTime,
			dailyEndTime,
			daysOfWeek: JSON.stringify(daysOfWeek),
			dncList,
			startDate,
			callerId: JSON.stringify(callerId),
			callsPerMinute,
			timeZone: JSON.stringify(timeZone),
			endDate,
			internalNotes,
			selectedContactLists: JSON.stringify(selectedContactLists),
			contactListsId: selectedContactLists.id,
			selectedUserList: JSON.stringify(selectedUserList),
			contactUserId: selectedUserList.id,
			vapiAgent: JSON.stringify(vapiAgent),
			createdAt: new Date(),
			updatedAt: new Date(),
		});

		res.status(200).json({
			success: true,
			message: "Campaign created successfully",
			data: newCampaign,
		});
	} catch (error) {
		console.error("Error creating campaign:", error);
		res.status(500).json({
			message: "Internal server error. Please try again later.",
		});
	}
};

/**
 * Check if campaign exists
 *
 * @param {string} campaignName
 * @returns {Promise<boolean>}
 */
const checkIfCampaignExist = async (campaignName) => {
	try {
		const result = await Campaigns.findOne({ where: { campaignName } });
		return result ? true : false;
	} catch (error) {
		console.error("Error checking if campaign exists:", error);
		throw new Error("Error checking if campaign exists");
	}
};

/***
get all Campaigns
***/
const getAllCampaigns = async (req, res, next) => {
	try {
		let result = await Campaigns.findAll({
			raw: true,
		});
		return res.json({
			success: true,
			message: "Fetched all campaigns successfully!",
			result: result, // Use result directly
		});
	} catch (error) {
		next(new ErrorHandler(500, config.common_err_msg, error)); // Use status code 500 for errors
	}
};



/**
 * Delete Campaign
 *
 * @param {*} req
 * @param {*} res
 */
const deleteCampaign = async (req, res) => {
	const { id } = req.params;

	if (!id) {
		return res.status(400).json({ error: "Campaign  not provided" });
	}

	try {
		// Find and delete the Campaigns from the database
		const deleteCampaign = await Campaigns.destroy({
			where: { id: id },
		});

		if (deleteCampaign) {
			return res.status(200).json({ message: `Deleted Campaign` });
		} else {
			return res.status(404).json({ message: `Campaign  not found` });
		}
	} catch (error) {
		console.error("Error:", error);
		return res.status(500).json({ error: "Internal server error" });
	}
};

/**
 * getCampaignDetails
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const getCampaignDetails = async (req, res, next) => {
	try {
		const { campaignId } = req.params;
		const campaignData = await Campaigns.findOne({
			where: { id: campaignId },
		});
		if (!campaignData) {
			return res.status(402).json({
				success: false,
				message: "No List found for the given ID",
			});
		}
		return res.json({
			success: true,
			result: campaignData,
		});
	} catch (error) {
		next(new ErrorHandler(500, "Error fetching numbers", error));
	}
};

/**
 * updateCampaignData
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */

const updateCampaignData = async (req, res, next) => {
	try {
		const {
			campaignName,
			campaignStatus,
			callerId,
			dailyStartTime,
			dailyEndTime,
			daysOfWeek,
			callsPerMinute,
			dncList,
			startDate,
			endDate,
			timeZone,
			internalNotes,
			selectedContactLists,
			selectedUserList,
			vapiAgent,
		} = req.body;

		// Validate input
		if (
			!campaignName ||
			!startDate ||
			!endDate ||
			!selectedContactLists ||
			!selectedUserList
		) {
			return res.status(400).json({
				message: "Invalid input. All fields are required.",
			});
		}
		const { id } = req.params;
		// Check if campaign with the same name already exists

		const status = await Campaigns.update(
			{
				campaignName: campaignName,
				campaignStatus: campaignStatus,
				dailyStartTime: dailyStartTime,
				dailyEndTime: dailyEndTime,
				daysOfWeek: JSON.stringify(daysOfWeek),
				dncList: dncList,
				startDate: startDate,
				callerId: JSON.stringify(callerId),
				callsPerMinute: callsPerMinute,
				timeZone: JSON.stringify(timeZone),
				endDate: endDate,
				internalNotes: internalNotes,
				selectedContactLists: JSON.stringify(selectedContactLists),
				contactListsId: selectedContactLists.id,
				selectedUserList: JSON.stringify(selectedUserList),
				contactUserId: selectedUserList.id,
				vapiAgent: JSON.stringify(vapiAgent),
				updatedAt: new Date(),
			},
			{ where: { id: id } }
		);
		// Update the PhoneNumber table with the new contact list ID

		if (status) {
			res.status(200).json({
				success: true,
				message: "Campaign data updated  successfully",
			});
		}
	} catch (error) {
		next(new ErrorHandler(500, "Error fetching numbers", error));
	}
};

/**
 * getLeadsCount
 *
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
const getLeadsCount = async (req, res, next) => {
	try {
		const { ids } = req.query;
		// Ensure `ids` is parsed correctly
		const contactIds = ids;
		// Check if `contactIds` is an array
		if (!contactIds) {
			return res.status(400).json({
				success: false,
				message: "Invalid request. Provide an array of ids.",
			});
		}
		// Fetch contact lists with the given ids
		const contactListData = await ContactList.findAll({
			attributes: ["leads"],
			where: { contact_list_id: contactIds },
		});
		if (!contactListData.length) {
			return res.status(402).json({
				success: false,
				message: "No Lists found for the given IDs",
			});
		}
		// Aggregate lead counts
		const totalLeadCount = contactListData.reduce((acc, contactList) => {
			const leads = JSON.parse(contactList.leads.replace(/^"|"$/g, ""));
			if (Array.isArray(leads)) {
				acc += leads.length;
			}
			return acc;
		}, 0);
		return res.json({
			success: true,
			result: { totalLeadCount: totalLeadCount, ids: ids },
		});
	} catch (error) {
		next(new ErrorHandler(500, "Error fetching lead counts", error));
	}
};
const checkContactList = async (req, res, next) => {
	try {
		const { id } = req.params;
		// console.log("id", id);
		const result = await Campaigns.findOne({
			where: { contact_lists_id: id },
			raw: true,
		});
		// console.log("checkContactList", result);
		return res.json({
			success: true,
			message: "Fetched all campaigns successfully!",
			result: result ? true : false, // Use result directly
		});
	} catch (error) {
		next(new ErrorHandler(500, config.common_err_msg, error)); // Use status code 500 for errors
	}
};

/***
get all Client Campaigns
***/
const getClientAllCampaigns = async (req, res, next) => {
	try {
		const { id } = req.params;
		console.log("id", id);
		const result = await Campaigns.findAll({
			where: {contact_user_id:id},
			raw: true,
		});
console.log("result", result);
		return res.json({
			success: true,
			message: "Fetched all campaigns successfully!",
			result: result, // Use result directly
		});
	} catch (error) {
		next(new ErrorHandler(500, config.common_err_msg, error)); // Use status code 500 for errors
	}
};

/**
 * updateRunningStatus
 */

const updateRunningStatus = async (req, res, next) => {
	try {
		const { id } = req.params;
		const { campaignRunningStatus } = req.body;

		console.log("id", id);
		console.log("campaignRunningStatus", campaignRunningStatus);
		// Update the campaign running status
		let updateStatus = await Campaigns.update(
			{
				campaignRunningStatus: 1,
				updatedAt: new Date(),
			},
			{ where: { id } }
		);

		if (!updateStatus) {
			return res.status(500).json({
				success: false,
				message: "Failed to update campaign running status",
			});
		}

		console.log("Updated campaign status:", updateStatus);
		// Fetch the campaign by ID
		const campaigns = await Campaigns.findOne({
			where: { id },
			raw: true,
		});

		if (!campaigns) {
			return res.status(404).json({
				success: false,
				message: "Campaign not found",
			});
		}

		// Process selected contact lists
		const contactListIds = [];
		if (campaigns.selectedContactLists) {
			const contactLists = JSON.parse(campaigns.selectedContactLists);
			if (Array.isArray(contactLists)) {
				contactLists.forEach((list) => contactListIds.push(list.id));
			} else if (contactLists && typeof contactLists === "object") {
				contactListIds.push(contactLists.id);
			}
		}

		// Fetch phone numbers from contact lists
		const phoneNumbers = await PhoneNumber.findAll({
			where: {
				contact_list_id: {
					[Op.in]: contactListIds,
				},
			},
			raw: true,
		});

		const results = [];

		for (const phone of phoneNumbers) {
			// Skip phone numbers based on DNC list and status
			if (
				(campaigns.dncList && phone.status === "Answering machine") ||
				phone.status === "Wrong Number"
			) {
				console.log(
					`Skipping number ${phone.phone} due to status or DNC list`
				);
				continue;
			}

			const raw = JSON.stringify({
				customer: {
					number: phone.phone,
					name: phone.name,
				},
				phoneNumberId: JSON.parse(campaigns.callerId).id,
				assistantId: JSON.parse(campaigns.vapiAgent).id,
			});

			const requestOptions = {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Accept: "application/json",
					Authorization:
						"Bearer 1a4920fa-e1ef-4451-a726-e4d172999737",
					Cookie: "_cfuvid=ijZrE4lfXYLbvWmKj063gsLchESwQX25ycsyfG_u32A-1717647619760-0.0.1.1-604800000",
				},
				body: raw,
				redirect: "follow",
			};

			let apiResult;
			try {
				const apiResponse = await fetch(
					"https://api.vapi.ai/call/phone",
					requestOptions
				);
				console.log("apiResult", apiResponse);
				apiResult = await apiResponse.json();
				// console.log("apiResult", apiResult);
			} catch (error) {
				return next(
					new ErrorHandler(500, "Error calling external API", error)
				);
			}

			if (apiResult.statusCode !== 400) {
				results.push({
					phoneNumber: phone.phone,
					response: apiResult,
				});

				// Save call details to the database
				const callDetailsData = {
					campaign_id: campaigns.id,
					call_id: apiResult.id,
					assistant_id: apiResult.assistantId,
					phone_number_id: apiResult.phoneNumberId,
					org_id: apiResult.orgId,
					number: apiResult.customer.number,
					name: apiResult.customer.name,
					created_at: apiResult.createdAt,
				};

				try {
					await CallDetails.create(callDetailsData);
				} catch (error) {
					return next(
						new ErrorHandler(
							500,
							"Error saving call details",
							error
						)
					);
				}
			} else {
				results.push({
					phoneNumber: phone.phone,
					response: apiResult,
				});

				// Save call details to the database
				const callDetailsData = {
					campaign_id: campaigns.id,
					call_id: "invalid number",
					assistant_id: "invalid number",
					phone_number_id: "invalid number",
					org_id: "invalid number",
					number: phone.phone,
					name: phone.name,
					created_at: new Date(),
				};

				try {
					await CallDetails.create(callDetailsData);
				} catch (error) {
					return next(
						new ErrorHandler(
							500,
							"Error saving call details",
							error
						)
					);
				}
			}

			// Delay before the next API call
			await new Promise((resolve) => setTimeout(resolve, 5000));
		}
		console.log("Campaign Done");
		// Update the campaign status back to not running
		updateStatus = await Campaigns.update(
			{
				campaignRunningStatus: 0,
				updatedAt: new Date(),
			},
			{ where: { id } }
		);
		if (updateStatus) {
			console.log("Status updated");
		}
		// Return the results of the campaign run
		res.status(200).json({
			success: true,
			message: "Campaign run completed",
			data: {
				campaignDetails: campaigns,
				apiResults: results,
			},
		});
	} catch (error) {
		next(
			new ErrorHandler(
				500,
				"An error occurred while running the campaign",
				error
			)
		);
	}
};
module.exports = {
	createContactList,
	getAllContactList,
	getContactListDetail,
	checkContactList,
	getAllNumbersForCreateList,
	deletecontactList,
	getAllContactListNumbers,
	getAllAvailableNumbers,
	updateContactList,
	createCampaign,
	getAllCampaigns,
	getClientAllCampaigns,
	deleteCampaign,
	getCampaignDetails,
	updateCampaignData,
	getLeadsCount,
	updateRunningStatus,
};
