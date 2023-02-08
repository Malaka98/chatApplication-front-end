import {Component, OnInit} from '@angular/core';
import {ChatService} from "../../../../services/chat.service";
import {UserService} from "../../../../services/user.service";
import {NzNotificationService} from "ng-zorro-antd/notification";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  public roomId!: string;
  public messageText!: string;
  public messageArray: { user: string, message: string }[] = [];
  private storageArray: Array<any> = [];

  // public phone!: string;
  public currentUser: any = {};
  public selectedUser!: any;

  public userList: Array<any> = [];

  constructor(private chatService: ChatService, private _userService: UserService,
              private _notification: NzNotificationService) {
    this._userService.getAllUsers().subscribe({
      next: value => {
        this.userList = value.message
        this._userService.isLogged().subscribe({
          next: value => {
            this.currentUser = value.message
            this.userList = this.userList.filter((user) => user.phone_number !== this.currentUser.phone_number);
          },
          error: err => {
            this._notification.create(
              'error',
              'Internal Error',
              `Somthing went wrong ${err.message}`
            )
          }
        })
      },
      error: err => {
        this._notification.create(
          'error',
          'Internal Error',
          `Somthing went wrong ${err.message}`
        )
      }
    })

  }

  ngOnInit(): void {
    this.chatService.getMessage()
      .subscribe((data: { user: string, room: string, message: string }) => {
        this.messageArray.push(data);
        // if (this.roomId) {
        //   setTimeout(() => {
        //     this.storageArray = this.chatService.getStorage();
        //     const storeIndex = this.storageArray
        //       .findIndex((storage: any) => storage.roomId === this.roomId);
        //     this.messageArray = this.storageArray[storeIndex].chats;
        //   }, 500);
        // }
      });
  }

  selectUserHandler(phone: string): void {
    this.selectedUser = this.userList.find((user: any) => user.phone_number === phone);
    this.roomId = this.selectedUser.roomId[this.currentUser.id];
    console.log(this.roomId)
    this.messageArray = [];

    this.storageArray = this.chatService.getStorage();
    const storeIndex = this.storageArray
      .findIndex((storage: any) => storage.roomId === this.roomId);

    if (storeIndex > -1) {
      this.messageArray = this.storageArray[storeIndex].chats;
    }

    this.join(this.currentUser.first_name, this.roomId);
  }

  join(username: string, roomId: string): void {
    this.chatService.joinRoom({user: username, room: roomId});
  }

  sendMessage(): void {
    this.chatService.sendMessage({
      user: this.currentUser.first_name,
      room: this.roomId,
      message: this.messageText
    });

    this.storageArray = this.chatService.getStorage();
    const storeIndex = this.storageArray
      .findIndex((storage: any) => storage.roomId === this.roomId);

    if (storeIndex > -1) {
      this.storageArray[storeIndex].chats.push({
        user: this.currentUser.first_name,
        message: this.messageText
      });
    } else {
      const updateStorage = {
        roomId: this.roomId,
        chats: [{
          user: this.currentUser.first_name,
          message: this.messageText
        }]
      };

      this.storageArray.push(updateStorage);
    }

    this.chatService.setStorage(this.storageArray);
    this.messageText = '';
  }
}
