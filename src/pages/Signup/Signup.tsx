import { SignupAgreements, SignupBar, SignupButton, SignupForm, SignUpTitle } from '@/components/Signup';

const Signup = () => {
	return (
		<div className="flex flex-col items-center justify-center">
			<SignUpTitle />
			<SignupBar />
			<SignupForm />
			<SignupAgreements />
			<SignupButton />
		</div>
	);
};

export default Signup;
