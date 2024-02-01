import LikeButton from "@/components/LikeButton";

import AvatarGroup from "@/components/AvatarGroup";
import { Badge } from "@/components/ui/badge";
import { trpc } from "@/lib/trpc/client";
import { Marker as TMarker } from "@/server/config/schemas/Marker";
import MarkerImagesCarousel from "./MarkerImagesCarousel";
import SpotActions from "./SpotActions";
import SpotDetails from "./SpotDetails";

const SpotPopupContent = ({ marker }: { marker: TMarker }) => {
	const { id } = marker;
	const trpcUtils = trpc.useUtils();

	const account = trpc.account.get.useQuery();
	const isLiked = trpc.markers.isLiked.useQuery({ id });
	isLiked.isSuccess;

	const author = trpc.users.getById.useQuery({
		id: marker.createdById,
	});

	const likesUsers = trpc.markers.getLikesUsers.useQuery({
		id: marker.id,
	});

	const { mutate: markerLike } = trpc.markers.like.useMutation({
		onMutate: async (variables) => {
			// Snapshot of the previous state
			const prevLikeState = trpcUtils.markers.isLiked.getData({ id });
			// Optimistic update
			await trpcUtils.markers.isLiked.cancel();

			trpcUtils.markers.isLiked.setData({ id }, !prevLikeState, undefined);

			return { prevLikeState };
		},
		onSuccess: () => {
			likesUsers.refetch();
		},
		onError: (_, variables, context) => {
			// Rollback to the previous state in case of error
			trpcUtils.markers.isLiked.setData(
				{ id },
				context?.prevLikeState,
				undefined,
			);
		},
	});

	return (
		<div className="flex flex-col gap-2 bg-background border rounded-lg border-muted p-3">
			<div className="flex flex-1 items-center justify-between">
				<div className="flex items-center">
					<h3 className="text-lg font-bold">{marker.name}</h3>
					<Badge variant="outline" className="text-xs">
						{author.data?.id === account.data?.id ? "You" : author.data?.name}
					</Badge>
				</div>
				<SpotActions marker={marker} author={author.data} />
			</div>
			<div className="relative flex w-full justify-center">
				<MarkerImagesCarousel marker={marker} />
			</div>
			<div className="flex items-center w-full gap-4">
				{trpcUtils.auth.isAuth.getData()?.status && (
					<LikeButton
						isLiked={isLiked?.data}
						onLike={() => {
							markerLike({ id });
						}}
					/>
				)}
				<AvatarGroup
					key={`${likesUsers.isStale}`}
					users={likesUsers?.data}
					size="sm"
					preText="Liked by"
				/>
			</div>

			<SpotDetails marker={marker} />
		</div>
	);
};

export default SpotPopupContent;
