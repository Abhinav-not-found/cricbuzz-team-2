const { z } = require("zod");
const { PLAYER_ROLES } = require("../../constants/app.constant");

class PlayerValidator {
	createPlayer = z.object({
		name: z.string().trim().min(1, "Name is required"),

		image: z.string().optional(),

		role: z.enum(PLAYER_ROLES, {
			errorMap: () => ({
				message: "Role must be BATSMAN, BOWLER, ALL_ROUNDER or WICKET_KEEPER",
			}),
		}),

		country: z.string().trim().min(1, "Country is required"),

		battingStyle: z.string().optional(),

		bowlingStyle: z.string().optional(),
	});

	updatePlayer = z
		.object({
			name: z.string().trim().min(1).optional(),

			image: z.string().optional(),

			role: z.enum(PLAYER_ROLES).optional(),

			country: z.string().trim().min(1).optional(),

			battingStyle: z.string().optional(),

			bowlingStyle: z.string().optional(),
		})
		.refine(
			(data) => Object.keys(data).length > 0,
			"At least one field is required",
		);
}

module.exports = new PlayerValidator();
