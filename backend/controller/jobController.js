import { catchAsyncFunction } from '../middleware/catchAsyncFunction.js'
import errorHandlers from '../middleware/error.js'
import { Job } from '../models/jobSchema.js'


export const getJob = catchAsyncFunction(async (req, res, next) => {
    const jobs = await Job.find({ expired: false })

    res.status(200).json({
        success: true,
        jobs
    })
})




export const postjob = catchAsyncFunction(async (req, res, next) => {
    const { role } = req.user

    if (role === "Job Seeker") return next(new errorHandlers("Wrong Role", 400))

    const {
        title,
        description,
        category,
        country,
        city,
        location,
        fixedSalary,
        salaryFrom,
        salaryTo,
    } = req.body;

    if (!title || !description || !category || !country || !city || !location) {
        return next(new errorHandlers("Please provide full job details.", 400));
    }
    if ((!salaryFrom || !salaryTo) && !fixedSalary) {
        return next(
            new errorHandlers(
                "Please either provide fixed salary or ranged salary.",
                400
            )
        );
    }
    if (salaryFrom && salaryTo && fixedSalary) {
        return next(
            new errorHandlers("Cannot Enter Fixed and Ranged Salary together.", 400)
        );
    }
    const postedBy = req.user._id;
    const job = await Job.create({
        title,
        description,
        category,
        country,
        city,
        location,
        fixedSalary,
        salaryFrom,
        salaryTo,
        postedBy,
    });
    res.status(200).json({
        success: true,
        message: "Job Posted Successfully!",
        job,
    });
})

// export const getJobById = catchAsyncFunction(async (req, res, next) => {

//     const id = req.params.id
//     const jobs = await Job.find(id, { expired: false })

//     res.status(200).json({
//         success: true,
//         jobs
//     })
// })


export const getMyJob = catchAsyncFunction(async (req, res, next) => {
    const { role } = req.user

    if (role === "Job Seeker") return next(new errorHandlers("Wrong Role", 400))

    const MyJob = await Job.find({ postedBy: req.user._id })
    res.status(200).json({
        success: true,
        MyJob
    })
})

export const updatejob = catchAsyncFunction(async (req, res, next) => {
    const { role } = req.user
    if (role === "Job Seeker") return next(new errorHandlers("Wrong Role", 400))

    const { id } = req.params

    let job = await Job.findById(id);

    if (!job) return next(new errorHandlers("Job Not Found", 404))

    job = await Job.findByIdAndUpdate(id, req.body, {
        new: true
    })

    res.status(201).json({
        success: true,
        message: "Successfully Updated",
        job
    })
})

export const deleteJob = catchAsyncFunction(async (req, res, next) => {
    const { role } = req.user
    if (role === "Job Seeker") return next(new errorHandlers("Wrong Role", 400))

    const { id } = req.params

    let job = await Job.findById(id);

    if (!job) return next(new errorHandlers("Job Not Found", 404))

    job = await Job.findByIdAndDelete(id, { new: true })

    res.status(201).json({
        success: true,
        message: "Successfully Delete",
        job
    })
})

export const getSingleJob = catchAsyncFunction(async (req, res, next) => {
    const { id } = req.params;
    try {
        const job = await Job.findById(id);
        if (!job) {
            return next(new errorHandlers("Job not found.", 404));
        }
        res.status(200).json({
            success: true,
            job,
        });
    } catch (error) {
        return next(new errorHandlers(`Invalid ID / CastError`, 404));
    }
});