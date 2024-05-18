export class Message {
    constructor(
      public groupId: string,
      public message: string,
      public timestamp: string,
      public img: string,
      public sender: string,
      public senderPic: string
    ) {}
  }