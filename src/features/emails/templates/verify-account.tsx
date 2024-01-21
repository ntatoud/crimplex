import { Heading, Hr, Section, Text } from "@react-email/components";

import EmailWrapper from "../components/EmailWrapper";
import Footer from "../components/Footer";

interface EmailVerifyAccountProps {
	code: string;
	name: string;
}

const EmailVerifyAccount = ({ code, name }: EmailVerifyAccountProps) => {
	return (
		<EmailWrapper preview="Your verification code">
			<Heading className="text-2xl">Verify your account</Heading>
			<Section className="gap-2">
				<Text className="text-md">
					Welcome{` ${name ?? ""}`}.
					<br />
					You're almost there ! Here is your validation code :
				</Text>
				<Text className="w-fit px-2 py-1 mb-[-1rem] text-lg rounded-md font-bold bg-gray-100 border ring-gray-800 text-green-800 dark:bg-gray-800 dark:border-gray-300 dark:text-green-400">
					{code}
				</Text>
				(You may copy and paste this code)
				<Text className="text-md text-gray-700 dark:text-gray-400">
					This code will be valid for the next 5 minutes.
					<br />
					If you did not try to register, please ingore this email.
				</Text>
			</Section>
			<Hr />
			<Footer />
		</EmailWrapper>
	);
};

export default EmailVerifyAccount;
