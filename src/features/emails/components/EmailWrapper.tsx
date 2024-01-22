/* eslint-disable @next/next/no-head-element */
import { ReactNode } from "react";

import { Body, Head, Html, Preview } from "@react-email/components";
import { styles } from "../styles";
interface EmailWrapperProps {
	preview: string;
	children: ReactNode;
}
const EmailWrapper = ({ preview, children }: EmailWrapperProps) => {
	return (
		<Html>
			<Head>
				<meta name="viewport" content="width=device-width" />
			</Head>
			<Preview>{preview}</Preview>
			<Body style={styles.main}>{children}</Body>
		</Html>
	);
};

export default EmailWrapper;
