import qs from 'qs';
import axios from 'axios';

export function getDraftByPage (page) {
	return axios.get('/api/getDraftList?page=' + page).then((res) => {
		return Promise.resolve(res.data);
	}).catch(err => err);
};

export function deletBlog (id) {
	return axios.get('/api/deleteBlog?id=' + id).then((res) => {
		return Promise.resolve(res.data);
	}).catch(err => err);
};

export function getOneBlog (id) {
	return axios.get('/api/getOneBlog?id=' + id).then(res => {
		return Promise.resolve(res.data);
	}).catch(err => err);
};

export function publishBlog (id) {
	return axios.post('/api/publishBlog', qs.stringify({
		id: id
	})).then(res => {
		return Promise.resolve(res.data);
	}).catch(err => err);
};