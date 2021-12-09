import { useState } from 'react';
import useRequest from '../../hooks/use-request';
import Router from 'next/router';
const Signin = () => {
	const [email, setEmail] = useState('sall@gmail.com');
	const [password, setPassword] = useState('sall9980');
	const { doRequest, errors } = useRequest({
		url: '/api/users/signin',
		methods: 'post',
		body: { email, password },
		onSuccess: () => Router.push('/'),
	});
	const onSubmit = async (e) => {
		e.preventDefault();
		await doRequest();
	};
	return (
		<form onSubmit={onSubmit}>
			<h1>Sign in </h1>
			<div className="form-group">
				<label>Email</label>
				<input
					value={email}
					className="form-control"
					onChange={(e) => setEmail(e.target.value)}
				/>
			</div>
			<div className="form-group">
				<label>Password</label>
				<input
					value={password}
					type="password"
					className="form-control"
					onChange={(e) => setPassword(e.target.value)}
				/>
			</div>
			{errors}
			<button className="btn btn-primary">Sign in</button>
		</form>
	);
};

export default Signin;
