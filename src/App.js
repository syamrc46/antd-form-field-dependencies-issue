import React from 'react';
import { Form, Button, Input } from 'antd';
import 'antd/dist/antd.css';

export default function App(props) {
	{
		const [ form ] = Form.useForm();

		const initialValues = {
			security: {
				password: null,
				confirm: null
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
					name={[ 'security', 'password' ]}
					label="Password"
					rules={[
						{
							required: true,
							message: 'Password is required'
						}
					]}
				>
					<Input />
				</Form.Item>
				<Form.Item
					name={[ 'security', 'confirm' ]}
					label="Confirm"
					dependencies={['security', 'password' ]}
					rules={[
						{
							required: true,
							message: 'Confirm password is required'
						},
						({ getFieldValue }) => ({
							validator(rule, value) {
								if (!value || getFieldValue([ 'security', 'password' ]) !== value) {
									return Promise.resolve();
								}
								return Promise.reject('The two passwords that you entered do not match!');
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
