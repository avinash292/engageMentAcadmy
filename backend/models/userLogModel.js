"use strict";

const Sequelize = require("sequelize");
const sequelize = require("../db");

const UserLog = sequelize.define(
	"userLog",
	{
		id: {
			type: Sequelize.INTEGER,
			primaryKey: true,
			autoIncrement: true,
			trim: true,
		},
		user_type: { type: Sequelize.STRING(120), allowNull: false },
		user_id: { type: Sequelize.STRING(20), allowNull: true },
		user_name: { type: Sequelize.STRING(50), allowNull: true },
		user_action: { type: Sequelize.STRING(120), allowNull: true },
		user_action_type: { type: Sequelize.STRING(50), allowNull: true },
		name: { type: Sequelize.STRING(50), allowNull: true },
		source: { type: Sequelize.STRING(20), allowNull: true },
		total_contact: { type: Sequelize.STRING(50), allowNull: true },
		uploaded_contact: { type: Sequelize.STRING(50), allowNull: true },
		createdAt: {
			type: Sequelize.DATE,
			allowNull: false,
			defaultValue: Sequelize.NOW,
		},
	},
	{
		timestamps: true,
	}
);

module.exports = UserLog;
