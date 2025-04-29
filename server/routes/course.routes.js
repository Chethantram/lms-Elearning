import express from 'express';  
const router = express.Router();
import {createCourse, createLecture, editLecture, getAllCreatorCourse, getCourseById, getLectureByCourseId, getLectureById, getPublishedCourse, removeCourse, removeLecture, searchCourse, togglePublishCourse, updateCourse} from '../controllers/course.controllers.js';
import isAuthenticated from '../middleware/isAuntenticated.js';
import upload from '../utils/multer.js'

router.post('/create', isAuthenticated, createCourse);
router.get('/search', isAuthenticated, searchCourse);
router.get('/published-course', getPublishedCourse);
router.delete('/remove-course',isAuthenticated, removeCourse);
router.get('/get', isAuthenticated, getAllCreatorCourse);
router.put('/update-course/:courseId', isAuthenticated,upload.single("courseThumbnail"), updateCourse);
router.get('/get-course/:courseId', isAuthenticated, getCourseById);
router.post('/:courseId/lecture', isAuthenticated, createLecture);
router.get('/:courseId/lecture', isAuthenticated, getLectureByCourseId);
router.post('/:courseId/lecture/:lectureId', isAuthenticated, editLecture);
router.delete('/lecture/:lectureId', isAuthenticated, removeLecture);
router.get('/lecture/:lectureId', isAuthenticated, getLectureById);
router.patch('/:courseId',isAuthenticated,togglePublishCourse);
export default router;