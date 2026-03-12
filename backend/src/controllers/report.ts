import { RequestHandler } from "express";

import { Report } from "../models/report"
import { ReturnResponse } from "../interfaces/interfaces";
import ProjectError from "../helpers/error";
import { ObjectId } from "mongoose";

export const getReport: RequestHandler = async (req, res, next) => {

    try {
        type ReportType = {
            userId: ObjectId,
            quizId: ObjectId,
            score: number,
            total: number
        }

        let report;
        const reportId = req.params.reportId;

        if (reportId) {

            report = await Report.findOne({ _id: reportId, userId: req.userId })

            // .populate('quizId').exec();

        } else {

            report = await Report.find({ userId: req.userId }).populate('quizId').exec();

        }

        if (!report) {
            const err = new ProjectError("Report not available");
            err.statusCode = 404;
            throw err;
        }

        let resp: ReturnResponse = {
            status: "success",
            message: "Report!",
            data: report,
        };
        res.send(resp);
    }
    catch (error) {
        next(error)
    }
};