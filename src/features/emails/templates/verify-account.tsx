import { Container, Heading, Hr, Section, Text } from "@react-email/components";

import EmailWrapper from "../components/EmailWrapper";
import Footer from "../components/Footer";
import { styles } from "../styles";

interface EmailVerifyAccountProps {
	code: string;
	name: string;
}

const EmailVerifyAccount = ({ code, name }: EmailVerifyAccountProps) => {
	return (
		<EmailWrapper preview="Your verification code">
			<Container style={styles.container}>
				<Heading style={styles.h1}>Verify your account</Heading>
				<Section style={styles.section}>
					<Text style={styles.text}>
						Welcome{` ${name ?? ""}`}.
						<br />
						You're almost there ! Here is your validation code :
					</Text>
					<Section style={styles.codeBox}>
						<Text style={styles.code}>{code}</Text>
					</Section>

					<Text style={styles.textMuted}>
						(You may copy and paste this code)
					</Text>

					<Text style={styles.text}>
						This code will be valid for the next 5 minutes.
						<br />
						If you did not try to register, please ingore this email.
					</Text>
				</Section>
				<Hr />
				<Footer />
			</Container>
		</EmailWrapper>
	);
};

export default EmailVerifyAccount;
