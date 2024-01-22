import { Container, Heading, Section, Text } from "@react-email/components";

import Footer from "../components/Footer";
import { styles } from "../styles";

type EmailAddressChangeProps = {
	name: string;
	code: string;
};

export const EmailAddressChange = ({ name, code }: EmailAddressChangeProps) => {
	return (
		<Container style={styles.container}>
			<Heading style={styles.h1}>Change your email address</Heading>
			<Section style={styles.section}>
				<Text style={styles.text}>
					Welcome dude
					<br />
					change email
				</Text>
				<Text style={styles.code}>{code}</Text>
				<Text style={styles.textMuted}>
					Expires in minutes
					<br />
					You can ignore if you want
				</Text>
			</Section>
			<Footer />
		</Container>
	);
};

export default EmailAddressChange;
