"use strict";

const Sequelize = require("sequelize");
const sequelize = require("../db");
const ContactList = require("./contactListModel");
const PhoneNumber = sequelize.define(
	"phonenumber",
	{
		id: {
			type: Sequelize.INTEGER,
			primaryKey: true,
			autoIncrement: true,
			trim: true,
		},
		name: { type: Sequelize.STRING(120), allowNull: true },
		phone: { type: Sequelize.STRING(20), allowNull: true },
		email: { type: Sequelize.STRING(120), allowNull: true },
		status: { type: Sequelize.STRING(20), allowNull: true },
		userid: { type: Sequelize.INTEGER, allowNull: true },
		country: { type: Sequelize.STRING(50), allowNull: true },
		contact_list_id: { type: Sequelize.STRING(10), allowNull: true },
		ghl_contact_id: { type: Sequelize.STRING(100), allowNull: true },
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
		timestamps: false,
		underscored: true,
	}
);

// Define the association
PhoneNumber.belongsTo(ContactList, {
	foreignKey: "contact_list_id",
	as: "contactList",
});

module.exports = PhoneNumber;
