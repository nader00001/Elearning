import {
  AfterViewChecked,
  Component,
  ElementRef,
  HostListener,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user';
import { WebSocketService } from 'src/app/web-socket.service';
import { LoginService } from '../../login.service';
import { MessageService } from '../../message.service';
import { Message } from '../../models/message';
import { UserService } from '../../user.service';
@Component({
  selector: 'app-conversation',
  templateUrl: './conversation.component.html',
  styleUrls: ['./conversation.component.css'],
})
export class ConversationComponent implements OnInit, AfterViewChecked {
  @ViewChild('messageList') private messageList?: ElementRef;
  userId: string = '';
  message: any;
  user: any;
  messages: {
    groupId: string;
    message: string;
    timestamp: string;
    img: string;
    sender: string;
    senderPic: string;
  }[] = [];
  groupId: string = '';
  parsedMessage: any;
  img: string = '';

  msg: Message = new Message('', '', '', '', '', '');
  msgs: any;

  groupe = {
    id: '',
    lastMessage: '',
  };
  grp: any;
  isPopupOpen: boolean = false;
  messageColor: string = '';
  senderUser: any;
  userType: string | null = '';
  constructor(
    private webSocketService: WebSocketService,
    private activatedRoute: ActivatedRoute,
    private messageService: MessageService,
    private router: Router,
    private userService: UserService,
    private loginService: LoginService
  ) {}
  users: Observable<User[]> | undefined;
  ngOnInit() {
    if(this.userType=='user'){
      this.sendMessage()
    }
    this.userType = this.loginService.userType();


    this.users = this.userService.getAllUsers();
    this.activatedRoute.params.subscribe((params) => {
      this.groupId = params['id'];
      this.msg.groupId = params['id'];
      this.userId = params['id'];
      console.log(this.userType);
      this.getUserByID();
    });
    this.getMessagesByGroupId(this.userId);
    this.webSocketService.getMessage().subscribe((msg: any) => {
      try {
        this.parsedMessage = JSON.parse(msg);
        this.getMessagesByGroupId(this.userId);
      } catch (error) {
        console.log("Le message n'est pas un JSON :", msg);
      }
      this.messages.push(this.parsedMessage);
      console.log('message ', this.messages);
    });
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    this.img = '../../../assets/imgs/' + file.name;
    if (file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = () => {};
      reader.readAsDataURL(file);
    } else {
      console.error("Le fichier sélectionné n'est pas une image.");
    }
  }

  sendMessage() {
    if (this.message !== '' || this.img != '') {
      this.msg.message = this.message;
      this.msg.timestamp = new Date().toLocaleTimeString();
      this.msg.img = this.img;

      if (this.userId != null) {
        if (this.userType === 'admin') {
          this.msg.sender = 'admin';
          this.messageColor = 'admin';
        } else {
          this.msg.sender = 'user';
          this.messageColor = 'user';
        }
        this.saveMessage();
      }
      console.log('useridddddddd', this.userId);

      const messageObject = {
        groupId: this.userId,
        message: this.msg.message,
        timestamp: this.msg.timestamp,
        img: this.msg.img,
        sender: this.msg.sender,
      };
      this.getMessagesByGroupId(this.userId);
      this.msg.groupId = this.userId;
      this.groupe.id = this.msg.groupId;
      this.groupe.lastMessage = this.msg.message;
      if (this.msg.img) {
        this.groupe.lastMessage = 'photo';
      }

      const messageJson = JSON.stringify(messageObject);

      this.webSocketService.sendMessage(messageJson);

      this.message = '';
      this.img = '';
    }
  }

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.sendMessage();
    }
  }

  isDropdownOpen: boolean = false;

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  @HostListener('document:click', ['$event'])
  onClick(event: MouseEvent) {
    if (
      !event.target ||
      !(event.target instanceof Element) ||
      (!event.target.closest('.action_menu_btn') &&
        !event.target.closest('#action_menu_btn'))
    ) {
      this.isDropdownOpen = false;
    }
  }
  saveMessage() {
    this.msg.groupId = this.userId;
    this.messageService.saveMessage(this.msg).subscribe(
      () => {
        console.log('Message saved successfully!');
        this.msg = new Message('', '', '', '', '', '');
      },
      (error) => {
        console.error('Error saving message:', error);
      }
    );
  }
  suppImg() {
    this.img = '';
  }
  getMessagesByGroupId(groupId: string) {
    this.messageService.getMessagesByGroupId(groupId).subscribe(
      (messages) => {
        this.messages = messages;
        console.log('Messages loaded:', this.messages);
      },
      (error) => {
        console.error('Error loading messages:', error);
      }
    );
  }

  getUserByID() {
    if (!this.userId) {
      console.error('User ID is null');
      return;
    }
    this.userService.getUserByID(this.userId).subscribe(
      (data: User) => {
        this.user = data;
        console.log('userdata', this.user);
      },
      (error) => {
        console.error('Error fetching user:', error);
      }
    );
  }
  navigateTo(destination: string, id: string) {
    this.router.navigate([destination, id]);
  }

  navigateToWithReload(destination: string, id: string) {
    this.router.navigate(['/conversation/',id]).then(() => {
      // Step 2: Once on that route, reload the component associated with it
      window.location.reload();
    });}

  ngAfterViewChecked() {
    if (this.messageList) {
      this.scrollToBottom();
    }
  }

  scrollToBottom(): void {
    try {
      if (this.messageList) {
        this.messageList.nativeElement.scrollTop =
          this.messageList.nativeElement.scrollHeight;
      }
    } catch (err) {}
  }
}
