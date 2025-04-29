import Course from "../models/course.models.js";
import Lecture from "../models/lecture.models.js";
import {
  deleteMediaFromCloudinary,
  deleteVideoFromCloudinary,
  uploadMedia,
} from "../utils/cloudinary.js";
export const createCourse = async (req, res) => {
  try {
    const { title, category } = req.body;

    // Validate required fields
    if (!title || !category) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const course = await Course.create({
      title,
      category,
      creator: req.id,
    });

    if (!course) {
      return res.status(400).json({ message: "Course creation failed" });
    }

    res
      .status(201)
      .json({ message: "Course created successfully", course: course });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const searchCourse = async (req, res) => {
  try {
    const { query = "", categories = [], sortByPrice = "" } = req.query;

    const searchCriteria = {
      isPublished: true,
      $or: [
        { title: { $regex: query, $options: "i" } },
        { subtitle: { $regex: query, $options: "i" } },
        { category: { $regex: query, $options: "i" } },
      ],
    };
    //if categories selected
    if (categories.length > 0) {
      searchCriteria.category = { $in: categories };
    }

    //sort order
    const sortOptions = {};
    if (sortByPrice === "low") {
      sortOptions.coursePrice = 1; //ascending
    } else if (sortByPrice === "high") {
      sortOptions.coursePrice = -1; //descending
    }

    let courses = await Course.find(searchCriteria)
      .populate({ path: "creator", select: "name photoUrl" })
      .sort(sortOptions);

    return res.status(200).json({
      success: true,
      courses: courses || [],
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const removeCourse = async (req, res) => {
  try {
    const { courseId } = req.body;

    const course = await Course.findByIdAndDelete(courseId);
    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course Not Found",
      });
    }
    res.json({
      success: true,
      message: "Course removed successfully",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
export const getPublishedCourse = async (req, res) => {
  try {
    const courses = await Course.find({ isPublished: true }).populate({
      path: "creator",
      select: "name photoUrl",
    });
    if (!courses) {
      return res.status(404).json({
        message: "Course Not found",
        success: false,
      });
    }

    res.status(200).json({
      courses,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
export const getAllCreatorCourse = async (req, res) => {
  try {
    const userId = req.id;
    const courses = await Course.find({ creator: userId });
    if (!courses) {
      return res.status(404).json({ message: "No courses found" });
    }
    res.status(200).json({ courses });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateCourse = async (req, res) => {
  try {
    const courseId = req.params.courseId;
    const { title, subtitle, description, category, courseLevel, coursePrice } =
      req.body;
    const thumbnail = req.file;
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }
    let uploadResponse;

    if (thumbnail) {
      if (course.courseThumbnail) {
        const publicId = course.courseThumbnail.split("/").pop().split(".")[0];
        await deleteMediaFromCloudinary(publicId);
      }
      uploadResponse = await uploadMedia(thumbnail.path);
    }
    const updateData = {
      title,
      subtitle,
      description,
      category,
      courseLevel,
      coursePrice,
      courseThumbnail: uploadResponse?.secure_url,
    };

    const updatedCourse = await Course.findByIdAndUpdate(courseId, updateData, {
      new: true,
    });
    if (!updatedCourse) {
      return res.status(400).json({ message: "Course update failed" });
    }
    res
      .status(200)
      .json({ message: "Course updated successfully", updatedCourse });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getCourseById = async (req, res) => {
  const courseId = req.params.courseId;
  try {
    const course = await Course.findById(courseId);

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }
    res.status(200).json({ course });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const createLecture = async (req, res) => {
  try {
    const { lectureTitle } = req.body;
    const courseId = req.params.courseId;
    if (!lectureTitle || !courseId) {
      return res.status(400).json({ message: "Lecture title is required" });
    }

    const lecture = await Lecture.create({ lectureTitle });
    if (!lecture) {
      return res.status(400).json({ message: "Lecture creation failed" });
    }
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }
    course.lectures.push(lecture._id);
    await course.save();
    res.status(201).json({ message: "Lecture created successfully", lecture });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getLectureByCourseId = async (req, res) => {
  try {
    const courseId = req.params.courseId;
    const course = await Course.findById(courseId).populate("lectures");

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }
    res.status(200).json({ lectures: course.lectures });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const editLecture = async (req, res) => {
  try {
    const { lectureTitle, isPreview, videoInfo } = req.body;
    const { lectureId, courseId } = req.params;
    const lecture = await Lecture.findById(lectureId);
    if (!lecture) {
      return res.status(400).json({
        message: "Lecture not found",
        success: false,
      });
    }

    //update lecture
    if (lectureTitle) {
      lecture.lectureTitle = lectureTitle;
    }
    if (videoInfo?.videoUrl) {
      lecture.videoUrl = videoInfo.videoUrl || lecture.videoUrl;
    }
    if (videoInfo?.publicId) {
      lecture.publicId = videoInfo.publicId || lecture.publicId;
    }

    lecture.isPreview = isPreview || lecture.isPreview;

    await lecture.save();

    //ensure that course have a lecture id but it is not
    const course = await Course.findById(courseId);
    if (course && !course.lectures.includes(lecture._id)) {
      course.lectures.push(lecture._id);
      await course.save();
    }

    res.status(200).json({
      message: "Lecture updated successfully",
      lecture,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const removeLecture = async (req, res) => {
  try {
    const { lectureId } = req.params;
    const lecture = await Lecture.findByIdAndDelete(lectureId);
    if (!lecture) {
      return res.status(404).json({
        message: "Lecture Not found",
        success: false,
      });
    }
    //delete lecture from cloudinary
    if (lecture.publicId) {
      await deleteVideoFromCloudinary(lecture.publicId);
    }

    //remove lecture from associated course
    await Course.updateOne(
      {
        lectures: lectureId,
      },
      { $pull: { lectures: lectureId } }
    );

    return res.status(200).json({
      message: "Lecture removed successfully",
      success: true,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getLectureById = async (req, res) => {
  try {
    const { lectureId } = req.params;
    const lecture = await Lecture.findById(lectureId);
    if (!lecture) {
      return res.status(404).json({
        message: "Lecture Not found",
        success: false,
      });
    }
    res.status(200).json({
      success: true,
      lecture,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const togglePublishCourse = async (req, res) => {
  try {
    const { courseId } = req.params;
    const { publish } = req.query;
    const course = await Course.findById(courseId);

    if (!course) {
      return res.status(404).json({
        message: "Course not found",
        success: false,
      });
    }
    //publish course based on query parameter
    course.isPublished = publish === "true";
    course.save();

    const statusMessage = course.isPublished ? "Publish" : "Unpublish";
    res.status(200).json({
      message: `Course is ${statusMessage}`,
      success: true,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
