"use strict";

const Sequelize = require("sequelize");
const sequelize = require("../db");

const Campaigns = sequelize.define(
	"campaigns",
	{
		id: {
			type: Sequelize.INTEGER,
			primaryKey: true,
			autoIncrement: true,
			trim: true,
		},
		campaignName: {
			type: Sequelize.STRING,
			allowNull: false,
		},

		callerId: {
			type: Sequelize.STRING,
			allowNull: true,
		},
		callsPerMinute: {
			type: Sequelize.STRING,
			allowNull: true,
		},

		campaignStatus: {
			type: Sequelize.BOOLEAN,
			allowNull: true,
		},
		campaignRunningStatus: {
			type: Sequelize.BOOLEAN,
			allowNull: true,
			defaultValue: 0,
		},
		dailyEndTime: {
			type: Sequelize.DATE,
			allowNull: true,
		},
		dailyStartTime: {
			type: Sequelize.DATE,
			allowNull: true,
		},
		daysOfWeek: {
			type: Sequelize.JSON, // Using JSON type to store array of selected row IDs
			allowNull: true,
		},
		dncList: {
			type: Sequelize.BOOLEAN,
			allowNull: true,
		},
		endDate: {
			type: Sequelize.DATE,
			allowNull: true,
		},
		internalNotes: {
			type: Sequelize.STRING,
			allowNull: true,
		},
		selectedContactLists: {
			type: Sequelize.STRING,
			allowNull: true,
		},
		contactListsId: {
			type: Sequelize.STRING,
			allowNull: true,
		},
		selectedUserList: {
			type: Sequelize.STRING,
			allowNull: true,
		},
		contactUserId: {
			type: Sequelize.STRING,
			allowNull: true,
		},
		startDate: {
			type: Sequelize.DATE,
			allowNull: true,
		},
		timeZone: {
			type: Sequelize.STRING,
			allowNull: true,
		},
		vapiAgent: {
			type: Sequelize.STRING,
			allowNull: true,
		},
		createdAt: {
			type: Sequelize.DATE,
			allowNull: false,
			defaultValue: Sequelize.NOW,
		},
		updatedAt: {
			type: Sequelize.DATE,
			allowNull: false,
			defaultValue: Sequelize.NOW,
		},
	},
	{
		timestamps: false, // Disable timestamps for this model
		underscored: true, // Use snake_case for column names
	}
);

module.exports = Campaigns;
