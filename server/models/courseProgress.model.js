import mongoose from "mongoose";

const lectureProgressSchema = mongoose.Schema({
    lectureId:{type:String},
    viewed:{type:Boolean}
});

const courseProgressSchema = mongoose.Schema({
    userId:{type:String},
    courseId:{type:String},
    completed:{type:Boolean},
    lectureProgress:[lectureProgressSchema]

});


const CourseProgress = mongoose.model("CourseProgress",courseProgressSchema);
export default CourseProgress;