"use strict";

const Sequelize = require("sequelize");
const sequelize = require("../db");

const Users = sequelize.define(
	"users",
	{
		id: {
			type: Sequelize.INTEGER,
			primaryKey: true,
			autoIncrement: true,
			trim: true,
		},
		first_name: { type: Sequelize.STRING(120), allowNull: false },
		last_name: { type: Sequelize.STRING(120), allowNull: true },
		password: { type: Sequelize.STRING, allowNull: true },
		email: { type: Sequelize.STRING, unique: true, allowNull: false },
		mobile: { type: Sequelize.STRING(50), allowNull: true },
		source: {
			type: Sequelize.STRING(20),
			allowNull: true,
			comment: "From where user have registered",
		},
		role: {
			type: Sequelize.STRING(20),
			allowNull: false,
			defaultValue: "user",
		},
		// admin_id: { type: Sequelize.STRING(10), allowNull: true },
		admin_id: {
			type: Sequelize.JSON, // Use JSON if your DB supports it, otherwise use TEXT
			allowNull: true,
			defaultValue: [],
		},
		profile_image: { type: Sequelize.STRING, allowNull: true },
		ghlApiKey: { type: Sequelize.TEXT, allowNull: true },
		syncLead: {
			type: Sequelize.BOOLEAN,
			allowNull: false,
			defaultValue: false,
			comment: "'0' for syncLead off and '1' for syncLead on",
		},
		vapiApiKey: { type: Sequelize.TEXT, allowNull: true },
		vapiEnabled: {
			type: Sequelize.BOOLEAN,
			allowNull: false,
			defaultValue: false,
			comment: "'0' for vapiEnabled off and '1' for vapiEnabled on",
		},
		twilioSID: { type: Sequelize.TEXT, allowNull: true },
		twilioSecreteKey: { type: Sequelize.TEXT, allowNull: true },
		twilioEnabled: {
			type: Sequelize.BOOLEAN,
			allowNull: false,
			defaultValue: false,
			comment: "'0' for twilioEnabled off and '1' for twilioEnabled on",
		},
		internalNotes: { type: Sequelize.TEXT, allowNull: true },
		forgot_pass_hash: { type: Sequelize.STRING, allowNull: true },
		forgot_pass_date: { type: Sequelize.DATE, allowNull: true },
		is_deleted: {
			type: Sequelize.BOOLEAN,
			allowNull: false,
			defaultValue: false,
			comment: "'0' for NOT DELETED and '1' for DELETED",
		},
	},
	{
		timestamps: true,
	}
);

module.exports = Users;
