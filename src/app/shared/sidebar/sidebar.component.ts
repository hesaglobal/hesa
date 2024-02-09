import { Component, OnInit } from '@angular/core';
import { ROUTES } from './sidebar-routes.config';
import { Router, Event, NavigationStart, NavigationEnd, NavigationError } from '@angular/router';
import { SidebarService } from "./sidebar.service";
import { AuthService } from '@app/services/auth/auth.service';
import { environment } from '@environments/environment';
import * as $ from 'jquery';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
})

export class SidebarComponent implements OnInit {

  public menuItems: any[];
  showSideBar: boolean = true;
  sidebarHovered: boolean = false
  logoUrl: string = ''

  constructor(public sidebarservice: SidebarService, private router: Router, private authService: AuthService) {
    let userData = localStorage.getItem('USER') || null;
    let loginUserData = (userData) ? JSON.parse(userData) : null;
    this.logoUrl = loginUserData.logo ? environment.Image_Base + loginUserData.logo : ''
    router.events.subscribe((event: Event) => {

      if (event instanceof NavigationStart) {
        // Show loading indicator
      }

      if (event instanceof NavigationEnd && $(window).width() < 1025 && (document.readyState == 'complete' || false)) {

        this.toggleSidebar();
        // Hide loading indicator

      }

      if (event instanceof NavigationError) {
        // Hide loading indicator

        // Present error to user
        console.log(event.error);
      }
    });

  }


  toggleSidebar() {
    this.sidebarservice.setSidebarState(!this.sidebarservice.getSidebarState());
    let self = this
    if ($(".wrapper").hasClass("nav-collapsed")) {
      // unpin sidebar when hovered
      $(".wrapper").removeClass("nav-collapsed");
      $(".sidebar-wrapper").unbind("hover");
    } else {
      $(".wrapper").addClass("nav-collapsed");
      self.sidebarHovered = false
      $(".sidebar-wrapper").hover(
        function () {
          $(".wrapper").addClass("sidebar-hovered");
          self.sidebarHovered = true
        },
        function () {
          $(".wrapper").removeClass("sidebar-hovered");
          self.sidebarHovered = false
        }
      )

    }

  }

  getSideBarState() {
    return this.sidebarservice.getSidebarState();
  }

  hideSidebar() {
    this.sidebarservice.setSidebarState(true);
  }


  ngOnInit() {
    const user = this.authService.loginUser;
    this.menuItems = ROUTES.filter(menuItem => {
      if(user.role=='Admin') {
        return menuItem.roles.includes(user.role)
      }
      return user.modules?.includes(menuItem.module)
    });

    $.getScript('./assets/js/app-sidebar.js');


  }

}
