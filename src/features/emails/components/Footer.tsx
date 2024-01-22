import { Img, Link, Section } from "@react-email/components";

import { env } from "@/env.mjs";
import { styles } from "../styles";

const Footer = () => {
	return (
		<Section style={styles.footer}>
			<Link href={env.NEXT_PUBLIC_BASE_URL}>
				<Img src="/email/Logo.png" alt="Crimplex" style={styles.logo} />
			</Link>
			<br />
			Climbing has never been so easy
		</Section>
	);
};

export default Footer;
