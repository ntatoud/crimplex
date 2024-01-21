import MaxWidthWrapper from "@/components/MaxWidthWrapper";

import UsersTable from "./UsersTable";

const PageAdminUsers = () => {
	return (
		<MaxWidthWrapper className="max-w-7xl pt-5">
			<UsersTable />
		</MaxWidthWrapper>
	);
};

export default PageAdminUsers;
