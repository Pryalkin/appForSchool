import { Component, OnInit } from '@angular/core';
import {Subscription} from "rxjs";
import {AdministrationService} from "../../service/administration.service";
import {NotificationService} from "../../service/notification.service";
import {Teacher} from "../../entity/teacher";
import {NotificationType} from "../../enum/notification-type.enum";
import {HttpErrorResponse} from "@angular/common/http";
import {Item} from "../../entity/item";

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {
  showLoading: boolean = false;
  private subscriptions: Subscription[] = [];

  constructor(private administrationService: AdministrationService,
              private notificationService: NotificationService) { }

  ngOnInit(): void {

  }


  public onItem(item: Item){
    this.subscriptions.push(
      this.administrationService.addItem(item).subscribe(
        (response: Item) => {
          this.showLoading = false;
          let form: HTMLFormElement = <HTMLFormElement> document.getElementById('item');
          form.reset();
          this.notificationService.notify(NotificationType.SUCCESS, `Предмет ${item.name} успешно добавлен в систему.`);
        },
        (errorResponse: HttpErrorResponse) => {
          this.showLoading = false;
          let form: HTMLFormElement = <HTMLFormElement> document.getElementById('item');
          form.reset();
          this.notificationService.notify(NotificationType.ERROR, errorResponse.error.message);
        })
    );
  }
}
