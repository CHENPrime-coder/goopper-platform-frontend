import { request } from '..';
import mitt from '@/plugins/mitt';

//获取课程列表
export function getCourseList() {
  return request({
    url: '/course',
    method: 'get',
    params: {
      statusId: 2,
      name: ''
    }
  });
}

// 获取小组列表
export function getGroupList() {
  return request({
    url: '/group',
    method: 'get'
  });
}
//获取学生列表
export function getStudentList(courseId = null, groupId = null, orderId = null) {
  return request({
    url: `/student/${courseId}/${groupId}/${orderId}`,
    method: 'get'
  });
}
//获取当前老师课程列表
export function getTeacherCourseList(statusId, name) {
  let url = `/course?name=${name}`;
    if (statusId !== null) {
      url += `&statusId=${statusId}`;
    }
  return request({
    url: url,
    method: 'get',
  });
}

//获取课程详细信息(传入课程id)
export function getCourseInfo(courseId) {
  return request({
    url: `/course/${courseId}`,
    method: 'get',
    props: true
  });
}

//教师获取学生最近学习的课程(传入学生id)
export function getStudentRecentCourse(studentId) {
  return request({
    url: `/student/course/current/${studentId}`,
    method: 'get'
  });
}

//获取当前章节任务列表
export function getCourseTaskList(courseId) {
  return request({
    url: `/course/tree/${courseId}`,
    method:'get'
  });
}

// 应用到小组
export function applyGroup(courseId, groupsId) {
  request({
    url: `/course/apply/${courseId}`,
    method: 'post',
    data: groupsId
  }).then((res) => {
    if (res.code == '200') {
      mitt.emit('showToast', { title: '应用成功', color: 'success', icon: '$success' });
    }
  });
}

//删除课程
export async function deleteCourse(courseId) {
  const msg = await request({
    url: `/course/${courseId}`,
    method: 'delete'
  });
  if (msg.code == '200') {
    mitt.emit('showToast', { title: '删除成功', color: 'success', icon: '$success' });
  } else {
    mitt.emit('showToast', { title: '删除失败', color: 'error', icon: '$error' });
  }
}

// 获取课程类型
export function getCourseType() {
  return request({
    url: '/course/type',
    method: 'get'
  });
}
// 获取所有状态
export function getStatus() {
  return request({
    url: '/course/status',
    method: 'get'
  });
}

//拷贝课程
export async function copyCourse(courseId) {
  const res = await request({
    url: '/course/copy',
    method: 'post',
    data: courseId
  });
  if (res.code == '200') {
    mitt.emit('showToast', { title: '复制成功', color: 'success', icon: '$success' });
  } else {
    mitt.emit('showToast', { title: '复制失败', color: 'error', icon: '$error' });
  }
}
//发布课程
export async function publishCourse(courseId) {
  const res = await request({
    url: `/course/publish/${courseId}`,
    method: 'post'
  });
  if (res.code == '200') {
    mitt.emit('showToast', { title: '发布成功', color: 'success', icon: '$success' });
  } else {
    mitt.emit('showToast', { title: '发布失败', color: 'error', icon: '$error' });
  }
}
//停用课程
export async function deactivateCourse(courseId) {
  const res = await request({
    url: `/course/disable/${courseId}`,
    method: 'delete'
  });
  if (res.code == '200') {
    mitt.emit('showToast', { title: '停用成功', color: 'success', icon: '$success' });
  } else {
    mitt.emit('showToast', { title: '停用失败', color: 'error', icon: '$error' });
  }
}
//启用课程
export async function enableCourse(courseId) {
  const res = await request({
    url: `/course/enable/${courseId}`,
    method: 'post'
  });
  if (res.code == '200') {
    mitt.emit('showToast', { title: '启用成功', color: 'success', icon: '$success' });
  } else {
    mitt.emit('showToast', { title: '启用失败', color: 'error', icon: '$error' });
  }
}
//获取学生课程进度详情
export function getStudentCourseProgress(courseId, studentId) {
  return request({
    url: `/student/course/${studentId}/${courseId}`,
    method: 'get'
  });
}

//获取课程详细信息
export function getCourseDetail(courseId) {
  return request({
    url: `/course/${courseId}`,
    method: 'get'
  });
} 

//获取章节详细信息
export function getSectionDetail(sectionId) {
  return request({
    url: `/section/${sectionId}`,
    method: 'get'
  });
}

//获取任务详细信息
export function getTaskDetail(taskId) {
  return request({
    url: `/task/${taskId}`,
    method: 'get'
  });
}

export function createCourseType(typeName) {
  var formData = new FormData();
  formData.append('typeName', typeName);

  return request({
    url: '/course/type',
    method: 'post',
    data: formData
  });
}

export function createCourse(course) {
  const raw = JSON.stringify(course);
  return request({
    url: '/course',
    method: 'post',
    data: raw,
    headers: {
      'Content-Type': 'application/json'
    }
  });
}

export function updateCourse(course) {
  const raw = JSON.stringify(course);
  return request({
    url: '/course',
    method: 'put',
    data: raw,
    headers: {
      'Content-Type': 'application/json'
    }
  });
}

export function removeCourseAttachment(courseId, attachmentId) {
  const formData = new FormData();
  formData.append('courseId', courseId);
  formData.append('attachmentId', attachmentId);

  return request({
    url: '/course/attachment',
    method: 'delete',
    data: formData
  });
}

export function getCourseStructure(courseId) {
  return request({
    url: `/course/tree/${courseId}`,
    method: 'get'
  });
}

export function removeTaskAttachment(taskId, attachmentId) {
  const formData = new FormData();
  formData.append('taskId', taskId);
  formData.append('attachmentId', attachmentId);

  return request({
    url: '/task/attachment',
    method: 'delete',
    data: formData
  });
}