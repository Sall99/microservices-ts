import axios from 'axios';
import React, { useState } from 'react';

export default ({ url, methods, body, onSuccess }) => {
	const [errors, setErrors] = useState(null);
	const doRequest = async () => {
		try {
			const response = await axios[methods](url, body);
			if (onSuccess) onSuccess(response.data);
			return response.data;
		} catch (error) {
			setErrors(
				<div className="alert alert-danger">
					<h4>Ooops...</h4>
					<ul className="my-0">
						{error.response.data.errors.map((err) => {
							return <li key={err.message}> {err.message}</li>;
						})}
					</ul>
				</div>
			);
		}
	};
	return { doRequest, errors };
};
