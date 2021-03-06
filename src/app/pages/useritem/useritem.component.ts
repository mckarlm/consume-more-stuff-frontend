import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BackendService } from '../../services/backend.service';
import { SessionService } from '../../services/session.service';

@Component({
  templateUrl: './useritem.component.html',
  styleUrls: ['./useritem.component.scss']
})
export class UserItemComponent implements OnInit {
  user: object;
  userItems: any;
  pendingItems: any = [];
  publishedItems: any = [];
  soldItems: any = [];
  removedItems: any = [];
  placeholderImage: string = "https://cdn.samsung.com/etc/designs/smg/global/imgs/support/cont/NO_IMG_600x600.png"

  private _isLoggedInAsObservable;
  private _isLoggedIn: boolean;

  showPending: boolean = false;
  showPublished: boolean = false;
  showSold: boolean = false;
  showRemoved: boolean = false;

  constructor(
    private router: Router,
    private session: SessionService,
    private backend: BackendService
  ) {
    this.user = this.session.getSession();
    this._isLoggedInAsObservable = this.session.isLoggedInAsAnObservable();

    this._isLoggedInAsObservable.subscribe(
      (loggedIn: boolean) => {
        this._isLoggedIn = loggedIn;
      },
      err => {
        console.log(err);
      }
    );
  }

  ngOnInit() {
    return this.backend.getUsersItems()
      .then(response => {
        let responseArr = Object.values(response);
        responseArr.map(item => {
          switch (item.itemStatus.name) {
            case 'Pending':
              this.pendingItems.push(item);
              break;
            case 'Published':
              this.publishedItems.push(item);
              break;
            case 'Sold':
              this.soldItems.push(item);
              break;
            case 'Removed':
              this.removedItems.push(item);
              break;
            default:
              break;
          }
        })
        responseArr.map(item => {
          if (item.photos.length > 0) {
            item.photo = item.photos[0].link
          } else {
            item.photo = this.placeholderImage
          }
        })
      })

  }

  togglePending() {
    if (this.showPending) {
      return this.showPending = false;
    } else {
      return this.showPending = true;
    }
  }

  togglePublished() {
    if (this.showPublished) {
      return this.showPublished = false;
    } else {
      return this.showPublished = true;
    }
  }

  toggleSold() {
    if (this.showSold) {
      return this.showSold = false;
    } else {
      return this.showSold = true;
    }
  }

  toggleRemoved() {
    if (this.showRemoved) {
      return this.showRemoved = false;
    } else {
      return this.showRemoved = true;
    }
  }

}
