import {
  createClient,
  LiveList,
  LiveMap,
  LiveObject,
} from "@liveblocks/client";
import { createRoomContext } from "@liveblocks/react";
import type { Layer, Color } from "@/types/canvas";

// ✅ Move resolveUsers and resolveMentionSuggestions into createClient
const client = createClient({
  authEndpoint: "/api/liveblocks-auth",
  throttle: 16,

  async resolveUsers({ userIds }) {
    // Used only for Comments. Return a list of user information retrieved
    // from `userIds`. This info is used in comments, mentions etc.

    // const usersData = await __fetchUsersFromDB__(userIds);
    // return usersData.map((userData) => ({
    //   name: userData.name,
    //   avatar: userData.avatar.src,
    // }));

    return [];
  },

  async resolveMentionSuggestions({ text, roomId }) {
    // Used only for Comments. Return a list of userIds that match `text`.

    // const userIds = await __fetchAllUserIdsFromDB__(roomId);
    // if (!text) return userIds;
    // return userIds.filter((userId) =>
    //   userId.toLowerCase().includes(text.toLowerCase())
    // );

    return [];
  },
});

// Define types for presence, storage, metadata, etc.
type Presence = {
  cursor: { x: number; y: number } | null;
  selection: string[];
  pencilDraft: [x: number, y: number, pressure: number][] | null;
  pencilColor: Color | null;
};

type Storage = {
  layers: LiveMap<string, LiveObject<Layer>>;
  layerIds: LiveList<string>;
};

type UserMeta = {
  id?: string;
  info?: {
    name?: string;
    picture?: string;
  };
};

type RoomEvent = {
  // Define your events here
};

export type ThreadMetadata = {
  // Define your thread metadata here
};

// ✅ Now just pass `client` alone to createRoomContext
export const {
  suspense: {
    RoomProvider,
    useRoom,
    useMyPresence,
    useUpdateMyPresence,
    useSelf,
    useOthers,
    useOthersMapped,
    useOthersConnectionIds,
    useOther,
    useBroadcastEvent,
    useEventListener,
    useErrorListener,
    useStorage,
    useObject,
    useMap,
    useList,
    useBatch,
    useHistory,
    useUndo,
    useRedo,
    useCanUndo,
    useCanRedo,
    useMutation,
    useStatus,
    useLostConnectionListener,
    useThreads,
    useUser,
    useCreateThread,
    useEditThreadMetadata,
    useCreateComment,
    useEditComment,
    useDeleteComment,
    useAddReaction,
    useRemoveReaction,
  },
} = createRoomContext<Presence, Storage, UserMeta, RoomEvent, ThreadMetadata>(client);
