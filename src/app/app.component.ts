import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(authService: AuthService, private router: Router, private userService: UserService) {

    authService.user$.subscribe(user => {
      if (!user) return  
      
      userService.save(user);
      
      let returnUrl = localStorage.getItem('returnUrl');
      if (!returnUrl) return;
      //remove returnUrl from root view local storage after user$ is returned. This will allow refresh without 
      //navigation to the returnUrl everytime
      localStorage.removeItem('returnUrl');
      router.navigateByUrl(returnUrl);
      
    })
  }
}