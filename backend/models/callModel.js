"use strict";

const Sequelize = require("sequelize");
const sequelize = require("../db");

const Call = sequelize.define(
	"callDetails",
	{
		id: {
			type: Sequelize.INTEGER,
			primaryKey: true,
			autoIncrement: true,
			trim: true,
		},
		name: {
			type: Sequelize.STRING,
			allowNull: false,
		},
		number: {
			type: Sequelize.STRING,
			allowNull: false,
		},
		call_id: {
			type: Sequelize.STRING,
			allowNull: false,
		},
		assistant_id: {
			type: Sequelize.STRING,
			allowNull: false,
		},
		phone_number_id: {
			type: Sequelize.STRING,
			allowNull: false,
		},
		org_id: {
			type: Sequelize.STRING,
			allowNull: false,
		},
		campaign_id: {
			type: Sequelize.INTEGER,
			allowNull: false,
		},
		created_at: {
			type: Sequelize.DATE,
			allowNull: false,
		},
		updated_at: {
			type: Sequelize.DATE,
			allowNull: false,
			defaultValue: Sequelize.NOW,
		},
	},
	{
		tableName: "call_details",
		timestamps: false,
	}
);

module.exports = Call;
