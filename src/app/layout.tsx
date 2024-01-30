import BetaTag from "@/components/BetaTag";
import Document from "./Document";
import "./globals.css";

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<Document>
			<BetaTag />
			{children}
		</Document>
	);
}
