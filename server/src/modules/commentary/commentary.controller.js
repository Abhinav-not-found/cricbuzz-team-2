const httpStatus = require("http-status-codes");
const CommentaryService = require("./commentary.service");
const { getIO } = require("../../socket/socket");

class CommentaryController {
	constructor() {
		this.commentaryService = new CommentaryService();
	}

	async createCommentary(req, res) {
		const commentary = await this.commentaryService.createCommentary({
			...req.body,
			createdBy: req.user._id,
			updatedBy: req.user._id,
		});
		const io = getIO();

		io.emit("commentary:new", {
			matchId: commentary.matchId,
			data: commentary,
		});

		return res.status(httpStatus.StatusCodes.CREATED).json({
			success: true,
			data: commentary,
		});
	}

	async getAllCommentaries(req, res) {
		const commentaries = await this.commentaryService.getAllCommentaries(
			req.query.matchId,
		);

		return res.status(httpStatus.StatusCodes.OK).json({
			success: true,
			data: commentaries,
		});
	}

	async getCommentaryById(req, res) {
		const commentary = await this.commentaryService.getCommentaryById(
			req.params.id,
		);

		return res.status(httpStatus.StatusCodes.OK).json({
			success: true,
			data: commentary,
		});
	}

	async updateCommentary(req, res) {
		const commentary = await this.commentaryService.updateCommentary(
			req.params.id,
			{
				...req.body,
				updatedBy: req.user._id,
			},
		);

		return res.status(httpStatus.StatusCodes.OK).json({
			success: true,
			data: commentary,
		});
	}

	async deleteCommentary(req, res) {
		await this.commentaryService.deleteCommentary(req.params.id);

		return res.status(httpStatus.StatusCodes.OK).json({
			success: true,
			message: "Commentary deleted successfully",
		});
	}
}

module.exports = CommentaryController;
