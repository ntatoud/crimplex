import LikeButton from "@/components/LikeButton";
import { Button } from "@/components/ui/button";

import { trpc } from "@/lib/trpc/client";
import { Marker as TMarker } from "@/server/config/schemas/Marker";
import { Trash } from "lucide-react";
import { toast } from "sonner";
import MarkerImagesCarousel from "./MarkerImagesCarousel";

const SpotPopupContent = ({ marker }: { marker: TMarker }) => {
	const { position } = marker;
	const trpcUtils = trpc.useUtils();

	const isLiked = trpc.markers.isLiked.useQuery({
		position,
	});

	const { mutate: markerLike } = trpc.markers.like.useMutation({
		onMutate: async (variables) => {
			// Snapshot of the previous state
			const prevLikeState = trpcUtils.markers.isLiked.getData(variables);
			// Optimistic update
			await trpcUtils.markers.isLiked.cancel();

			trpcUtils.markers.isLiked.setData(variables, !prevLikeState, undefined);

			return { prevLikeState };
		},
		onError: (_, variables, context) => {
			// Rollback to the previous state in case of error
			trpcUtils.markers.isLiked.setData(
				variables,
				context?.prevLikeState,
				undefined,
			);
		},
	});

	const { mutate: markerDelete, isLoading: isDeleteLoading } =
		trpc.markers.deleteByPos.useMutation({
			onSuccess: (data) => {
				toast.success("Spot Deleted", {
					description: `Spot ${data.name} deleted successfully`,
				});
				trpcUtils.markers.invalidate();
			},
			onError: () => {
				toast.success("Could not delete the spot", {
					description: "An error occured while deleting the spot",
				});
			},
		});
	return (
		<div className="flex flex-col gap-2 bg-background border rounded-lg border-muted">
			<div className="flex flex-1 items-center justify-between">
				{marker.name}
				<Button
					variant="link"
					className="text-red-500 hover:text-red-700"
					size="sm"
					onClick={() =>
						markerDelete({
							position,
						})
					}
					isLoading={isDeleteLoading}
				>
					<Trash />
				</Button>
			</div>
			<div className="flex w-full justify-center">
				<MarkerImagesCarousel imagesSrc={[]} />
			</div>
			{trpcUtils.auth.isAuth.getData()?.status && (
				<LikeButton
					isLiked={isLiked?.data}
					onLike={() => markerLike({ position })}
				/>
			)}
		</div>
	);
};

export default SpotPopupContent;
