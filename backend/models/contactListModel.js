"use strict";

const Sequelize = require("sequelize");
const sequelize = require("../db");

const ContactList = sequelize.define(
	"contactList",
	{
		contact_list_id: {
			type: Sequelize.INTEGER,
			primaryKey: true,
			autoIncrement: true,
			trim: true,
		},
		list_name: {
			type: Sequelize.STRING(100),
			allowNull: false,
		},
		description: {
			type: Sequelize.STRING(255),
			allowNull: true,
		},
		userid: {
			type: Sequelize.INTEGER,
			allowNull: true,
		},
		leads: {
			type: Sequelize.JSON, // Using JSON type to store array of selected row IDs
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

module.exports = ContactList;
