export interface MessageEvent {
  event: "roomMessage";
  data: {
    sender: string;
    roomId: string;
    content: string;
    token: string;
  };
}

export interface PrivateMessageEvent {
  event: "privateMessage";
  data: {
    sender: string;
    receiver: string;
    token: string;
    content: string;
  };
}
export interface JoinRoomEvent {
  event: "joinRoom";
  data: {
    roomId: string;
    sender: string;
    token: string;
  };
}

export type RoutePath = "/chat";
