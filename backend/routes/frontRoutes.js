const express = require("express");
const router = express.Router();
const usrCtrl = require("../controllers/userController");
const loginCtrl = require("../controllers/loginController");
const contCtrl = require("../controllers/contactListController");
const callCtrl = require("../controllers/callController");
const multer = require("multer");
// Multer setup for file upload
const upload = multer({ dest: "uploads/" });
// Auth routes
router.post("/signup", usrCtrl.signup);
router.post("/addClient", usrCtrl.addClient);
router.post("/social_login", usrCtrl.signup);
router.post("/login", loginCtrl.front_login);
router.post("/refresh_token", loginCtrl.front_refresh_token);
router.post("/forgot_password", usrCtrl.forgot_password);
router.get("/password/:hash", usrCtrl.check_password_hash);
router.post("/password/reset", usrCtrl.reset_password);

// Profile routes
router
	.route("/profile")
	.get(usrCtrl.get_user_profile)
	.put(usrCtrl.update_user_profile);
router.put("/profile/update_password", usrCtrl.update_user_password);

// Usert routes
router.get("/getAllUsers", usrCtrl.getAllUsersList);
router.get("/getAllUsers/:user_id", usrCtrl.getMemberUsers);
router.get("/getTeamMembers", usrCtrl.getTeamMembers);
router.get("/get_user_details/:userId", usrCtrl.get_user_details);
router.put("/save_user_settings/:id", usrCtrl.save_user_settings);
router.put("/update_user_detail/:id", usrCtrl.update_user_detail);
router.put("/deleteUser/:id", usrCtrl.deleteUser);
router.get("/getUserLogs/:id", usrCtrl.getUserLogs);
// Route for uploading CSV file
router.post("/upload-csv", upload.single("file"), usrCtrl.upload_csv);
router.post("/add-contact", usrCtrl.addContact);
router.post("/updateAssignments", usrCtrl.updateAssignments);

router.post("/add-contact-to-ghl", usrCtrl.addContactToGhl);
router.get("/syncToGhl/:id", usrCtrl.addContactToGhl);

router.get("/getAllNumbers/:id", usrCtrl.getAllNumbers);
router.delete("/deletePhone/:id/:phone/:ghlContactID", usrCtrl.deletePhone);
// Contact List Routes
router.post("/createContactList", contCtrl.createContactList);
router.put("/updateContactList/:contact_list_id", contCtrl.updateContactList);
router.get("/getAllContactList/:id", contCtrl.getAllContactList);

router.get(
	"/getAllAvailableNumbers/:id/:contact_list_id",
	contCtrl.getAllAvailableNumbers
);
router.get(
	"/getAllNumbersForCreateList/:id",
	contCtrl.getAllNumbersForCreateList
);

router.delete(
	"/deletecontactList/:contact_list_id",
	contCtrl.deletecontactList
);

router.get("/checkContactList/:id", contCtrl.checkContactList);
router.get(
	"/getAllNumbers/:id/:contactList",
	contCtrl.getAllContactListNumbers
);
router.get(
	"/getContactListDetail/:contact_list_id",
	contCtrl.getContactListDetail
);



// Routes for Campaigns
router.post("/createCampaign", contCtrl.createCampaign);
router.get("/getAllCampaigns", contCtrl.getAllCampaigns);
router.get("/getAllCampaigns/:id", contCtrl.getClientAllCampaigns);
router.delete("/deleteCampaign/:id", contCtrl.deleteCampaign);
router.get("/getCampaignDetails/:campaignId", contCtrl.getCampaignDetails);
router.post("/updateRunningStatus/:id",contCtrl.updateRunningStatus);
router.put("/updateCampaignData/:id", contCtrl.updateCampaignData);
router.get("/getLeadsCount", contCtrl.getLeadsCount);

// Routes for Vapi
router.get("/createCall", callCtrl.createCall);
router.get("/getAllCallLogDetail/:id", callCtrl.getAllCallLogDetail);
router.get("/getCallDetails/:call_id", callCtrl.getCallDetails);
router.get("/getCampaignName", callCtrl.getCampaignName);
module.exports = router;
