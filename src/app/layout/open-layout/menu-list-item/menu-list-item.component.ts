import { Component, OnInit, HostBinding, Input } from '@angular/core';
import {
  animate,
  state,
  style,
  transition,
  trigger
} from '@angular/animations';
import { NavModel } from '../nav-model';
import { Router } from '@angular/router';
import { NavService } from '../../../shared/nav-service/nav.service';

@Component({
  selector: 'app-menu-list-item',
  templateUrl: './menu-list-item.component.html',
  styleUrls: ['./menu-list-item.component.scss'],
  animations: [
    trigger('indicatorRotate', [
      state('collapsed', style({ transform: 'rotate(0deg)' })),
      state('expanded', style({ transform: 'rotate(180deg)' })),
      transition(
        'expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4,0.0,0.2,1)')
      )
    ])
  ]
})
export class MenuListItemComponent implements OnInit {
  expanded: boolean;

  @Input() item: NavModel;
  @Input() depth: number;
  @Input() closed: boolean;
  @Input() expands: boolean;

  constructor(public router: Router, private navService: NavService) {
    this.navService.currentFilter.subscribe(res => {
      if (res) {
        this.expanded = false;
      }
    });
    if (this.depth === undefined) {
      this.depth = 0;
    }
  }
  ngOnInit(): void {}

  onItemSelected(item: NavModel) {
    if (!item.children || !item.children.length) {
      console.log('Menu Clicked');
      // this.router.navigate([item.route]);
      // this.navService.closeNav();
    }
    if (item.children && item.children.length) {
      this.expanded = !this.expanded;
    }
  }
}
