import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ActivatedRoute, Params, Router } from "@angular/router";

interface MenuItem {
  icon: string;
  label: string;
  children?: MenuItem[];
  isOpen?: boolean;
}

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent {
  @Input() isSidebarCollapsed = false;
  @Output() sidebarToggle = new EventEmitter<void>();

  routeList:string[][] = [
  ]

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {
  }

  toggleSidebar() {
    this.sidebarToggle.emit();
  }

  navClick(indexI: number) {                                                                                           
    let routeNav = ''                                                                                                  
    for (let e in this.routeList[indexI]) {                                          
      if (this.routeList[indexI][e].includes(':')){                                                                           
        routeNav = routeNav + '/' + (<HTMLInputElement>document.getElementById('param_' + indexI + '_' + e)).value;  
      } else {                                                                                                                
        routeNav = routeNav + '/' + this.routeList[indexI][e];                                                                
      }                                                                                                                       
    }            
    this.router.navigate([routeNav]).then(() => {                                                             
      window.location.reload();                                                                                       
    });  
  }     
}