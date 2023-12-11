/* tslint:disable */
/* eslint-disable */
export interface PollInput {
  description: string;
  multipleChoice: boolean;
  options: Array<string>;
  pollId?: string;
  title: string;
  votes: Array<string>;
}
