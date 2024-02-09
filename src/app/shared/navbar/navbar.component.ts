import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SidebarService } from '../sidebar/sidebar.service';
import { AuthService } from '@app/services/auth/auth.service'
import { ToastService, TYPE } from 'src/app/services/toast';
import { environment } from '@environments/environment';
import { CurrentuserService } from '@app/services/currentuser.service';
@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss']
})

export class NavbarComponent implements OnInit {
    userData:any;
    showNavbar: boolean = true;
    imgUrl = environment.Image_Base
    userCoins:any;
    constructor(private router: Router,public sidebarservice: SidebarService, public userService:CurrentuserService,public authService: AuthService, private toast: ToastService) {}
    toggleSidebar() {
        this.sidebarservice.setSidebarState(!this.sidebarservice.getSidebarState());
    }

    getSideBarState() {
        return this.sidebarservice.getSidebarState();
    }


    hideSidebar() {
        this.sidebarservice.setSidebarState(true);
    }

    ngOnInit() {
    }
    logoutClicked() {
        this.authService.signOut();
    }

    workInProgress(){
        this.toast.toast("Work in Progress", TYPE.INFO)
    }

}
