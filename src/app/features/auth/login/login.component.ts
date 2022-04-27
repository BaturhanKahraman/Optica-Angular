import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  isLoading=false;
  constructor(private authService:AuthService) { }

  ngOnInit(): void {
  }

  login(){
    this.authService.login({email:"baturhan.kahraman@gmail.com",password:"123456"}).subscribe(
      console.log
    );
  }

}
