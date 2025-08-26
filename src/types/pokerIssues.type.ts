export type PokerIssue = {
  UUID: string;
  pokerUUID: string;
  text: string;
  status: 'idle' | 'done' | 'active';
};
