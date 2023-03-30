import {AfterViewInit, Component, HostBinding, OnInit, ViewChild} from '@angular/core';
import {FormControl} from "@angular/forms";
import {OverlayContainer} from "@angular/cdk/overlay";
import {DataService} from "./data.service";
import {MessageModel} from "./Message.model";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit, OnInit{
  title = 'finalProjectUMGAngular';
  @HostBinding('class') className = '';
  toggleControl = new FormControl(false);
  flagToggle: boolean = false;
  displayedColumns: String[] = ['id', 'message', 'author', 'date', 'status', 'actions'];
  dataSource: any;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.getAllMessages();
  }

  constructor(private dataService: DataService, private overlay: OverlayContainer) {
  }

  message : MessageModel = {
    id: 0,
    message: '',
    author: '',
    date: '',
    status: false
  }
  messages?: MessageModel[];

  submitted = false;

  getAllMessages() {
    this.dataService.getAllMessages().subscribe((messages) => {
      this.dataSource = new MatTableDataSource<MessageModel>(messages);
      this.dataSource.paginator = this.paginator;
      this.messages = messages;
      console.log(messages);
    }, error => {
      console.log(error);
    });
  }

  createMessage() {
    const data = {
      message: this.message.message,
      author: this.message.author
    };
    this.dataService.newMessage(data).subscribe(response => {
      console.log(response);
      this.submitted = true;
      this.message = {
        message: '',
        author: '',
      };
      this.getAllMessages();
    }, error => {
      console.log(error);
    });
  }

  updateMessage(id : number) {
    const data = {
      message: this.message.message,
      author: this.message.author
    };
    this.dataService.updateMessage(id, data).subscribe(response => {
        console.log(response);
        this.submitted = true;
        this.message = {
          message: '',
          author: '',
        };
        this.getAllMessages();
      },
      error => {
        console.log(error);
      });
  }

  deleteMessage(id: number) {
    this.dataService.deleteMessage(id).subscribe(response => {
        console.log(response);
        this.getAllMessages();
      },
      error => {
        console.log(error);
      });
  }
  ngOnInit(): void {
    this.toggleControl.valueChanges.subscribe((darkMode) => {
      const darkClassName = 'darkMode';
      this.className = darkMode ? darkClassName : '';
      if (darkMode) {
        this.overlay.getContainerElement().classList.add(darkClassName);
        this.flagToggle = true;
      } else {
        this.overlay.getContainerElement().classList.remove(darkClassName);
        this.flagToggle = false;
      }
    });
  }
}
