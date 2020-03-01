import React from 'react';
import { Form, Button, Input } from 'antd';
import 'antd/dist/antd.css';

export default function App(props) {
	{
		const [ form ] = Form.useForm();

		const initialValues = {
			password: {
				old: null,
				new: null
			}
		};

		return (
			<Form
				form={form}
				initialValues={initialValues}
				onFinish={() => {
					const { validateFields } = form;
					validateFields()
						.then((values) => {
							console.log('Submitted values', values);
						})
						.catch((ex) => {
							console.log('Error occured');
						});
				}}
			>
				<Form.Item
					name={[ 'password', 'old' ]}
					label="Old password"
					rules={[
						{
							required: true,
							message: 'Old password is required'
						}
					]}
				>
					<Input />
				</Form.Item>
				<Form.Item
					name={[ 'password', 'new' ]}
					label="New password"
					dependencies={[ 'password' ]}
					rules={[
						{
							required: true,
							message: 'New password is required'
						},
						({ getFieldValue }) => ({
							validator(rule, value) {
								if (!value || getFieldValue([ 'password', 'old' ]) !== value) {
									return Promise.resolve();
								}
								return Promise.reject('Old password and new password should be different');
							}
						})
					]}
				>
					<Input />
				</Form.Item>
				<Button htmlType="submit">Submit</Button>
			</Form>
		);
	}
}
