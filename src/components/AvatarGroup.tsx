import { getFileUrl } from "@/lib/uploadthing/client";
import { cn } from "@/lib/utils";
import { UserAccount } from "@/server/config/schemas/Account";
import { FC, HTMLAttributes } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Skeleton } from "./ui/skeleton";

export type AvatarGroupSize = "sm" | "md" | "lg";

interface AvatarGroupProps extends React.HTMLAttributes<HTMLDivElement> {
	size?: AvatarGroupSize;
	avatarDisplayCount?: number;
	usernameDisplayCount?: number;
	users?: UserAccount[];
	preText?: string;
	postText?: string;
}
const AvatarGroup: FC<AvatarGroupProps> = ({
	size = "md",
	users,
	avatarDisplayCount = 3,
	usernameDisplayCount = 3,
	preText,
	postText,
	className,
	...props
}) => {
	if (!users)
		return (
			<AvatarGroupLoadingState
				size={size}
				className={className}
				{...props}
				length={avatarDisplayCount}
			/>
		);

	return (
		<div
			className={cn("flex w-full items-center gap-[1rem]", className)}
			{...props}
		>
			<Avatars users={users} displayCount={avatarDisplayCount} size={size} />
			<UsernamesText
				users={users}
				displayCount={usernameDisplayCount}
				size={size}
				preText={preText}
				postText={postText}
			/>
		</div>
	);
};

const avatarProps = {
	sm: { size: 8, ml: "-ml-5", loaderW: 40, loaderH: 3 },
	md: { size: 11, ml: "-ml-7", loaderW: 48, loaderH: 4 },
	lg: { size: 14, ml: "-ml-9", loaderW: 60, loaderH: 5 },
} as const;
export interface AvatarsProps {
	users: UserAccount[];
	displayCount: number;
	size?: AvatarGroupSize;
	className?: string;
}
export const Avatars = ({
	size = "md",
	users,
	displayCount,
	className,
}: AvatarsProps) => {
	if (users.length === 0) return null;

	const avatars = users
		.slice(0, displayCount)
		.reverse()
		.map((user, index) => (
			<div
				key={`${user.name}-${user.profilePictureKey}`}
				className={cn(
					"relative flex rounded-full p-0.5 bg-background ",
					index !== displayCount - 1 && avatarProps[size].ml,
				)}
			>
				<Avatar
					className={`h-${avatarProps[size].size} w-${avatarProps[size].size}`}
				>
					<AvatarImage src={getFileUrl(user.profilePictureKey)} alt="PP" />
					<AvatarFallback className={`uppercase text-${size}`}>
						{user.name[0]}
					</AvatarFallback>
				</Avatar>
			</div>
		));

	return (
		<div className={cn("flex flex-row-reverse", className)}>{avatars}</div>
	);
};

export interface UsernamesTextProps {
	users: UserAccount[];
	displayCount: number;
	size?: AvatarGroupSize;
	preText?: string;
	postText?: string;
	className?: string;
}
const UsernamesText = ({
	size,
	users,
	displayCount,
	preText,
	postText,
	className,
}: UsernamesTextProps) => {
	if (users.length === 0) return null;

	const otherNamesCount = users.length - displayCount;

	const usernames = users.slice(0, displayCount).map((user, index) => {
		if (index === displayCount - 1)
			return <p key={`${user.name}-${user.email}`}>{user.name}</p>;

		return <p key={`${user.name}-${user.email}`}>{user.name},</p>;
	});

	return (
		<span className={cn(`flex gap-1 text-${size} font-semibold`, className)}>
			{preText}
			{usernames}
			{otherNamesCount > 0 && <p>and {otherNamesCount} other person</p>}
			{postText}
		</span>
	);
};

export const AvatarGroupLoadingState = ({
	size,
	className,
	length = 3,
	...props
}: HTMLAttributes<HTMLDivElement> & {
	size: AvatarGroupSize;
	length?: number;
}) => {
	const avatarsLoading = Array.from({ length }, (_, index) => (
		<div
			key={`avatar-skeleton-${index}`}
			className={cn(
				"relative flex rounded-full p-0.5 bg-background ",
				index !== length - 1 && avatarProps[size].ml,
			)}
		>
			<Skeleton
				className={`rounded-full h-${avatarProps[size].size} w-${avatarProps[size].size}`}
			/>
		</div>
	));

	return (
		<div
			className={cn("flex w-full items-center gap-[1rem]", className)}
			{...props}
		>
			<div className="flex flex-row-reverse">{avatarsLoading}</div>
			<Skeleton
				className={`w-${avatarProps[size].loaderW} h-${avatarProps[size].loaderH}`}
			/>
		</div>
	);
};

export default AvatarGroup;
