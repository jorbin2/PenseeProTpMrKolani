import { Component, OnInit } from '@angular/core';
import { ApiService } from './service/api.service';
import { Observable } from 'rxjs';
import { Article, User } from './model/model';


declare var $: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'pensee_pro_web';
    users!: User[];
    articles!: Article[];
   public article: Article={};
    public user: User={
      username: '',
      password: ''
    };
    public user2: User={
      username: '',
      password: ''
    };
   public password ="";
   public username ="";
   public titre ="";
   public content ="";
   public loginUser ="";
   userConnected:boolean=false;

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.getArticleData();


  }
  public creerUser(username:string,pwd:string){
    if (username!=""&& pwd!="") {
      this.user!.username =username;
      this.user!.password =pwd;
      this.apiService.postData(this.user!,"users").subscribe((response:any) => {

        console.log("save********");
        console.log(response);
        this.password ="";
        this.username ="";
        this.closeModal();
      },err=>{
        console.log(err);
        console.log("non save********");


      }
      )
      this.user!.password ="";
      this.user!.username ="";
      this.closeModal();
    }


  }

  public login(username:string,pwd:string){
    if (username!=""&& pwd!="") {
      this.apiService.getData("users").subscribe((response:any) => {

        this.users = response;
        console.log("login******");
        console.log(this.users);

        for (let i = 0; i < this.users.length; i++) {
         if (this.users[i]!.username==username && this.users[i]!.password==pwd!) {
          this.userConnected=true;


          this.user2!.username!=username;
          this.user2!.password!=pwd;
          this.loginUser=username;
          this.apiService.loginUserService=username;
          this.password ="";
          this.username ="";


         }else{
          console.log("donnee ne correspond pas");
         }
        }


      },err=>{
        console.log(err);

      }
      );

      this.ngOnInit();
    }

  }



  public getArticleData(){
    this.apiService.getArticleData("articles").subscribe((response:any) => {

      this.articles = response;
      console.log(this.articles);
      console.log("////////////////////////////////**//*");
      console.log(response);
    },err=>{
      console.log(err);
    }
    );



  }
  public addArticle(title:string,content:string){
    if (title!=""&& content!="" && this.apiService.loginUserService!="") {
     this.article!.title! = title!;
     this.article!.content! =content!;
     this.article!.username! = this.apiService.loginUserService!;
      this.apiService.postArticleData(this.article!,"articles").subscribe((response:any) => {

        console.log("save********");
        console.log(response);
        this.titre ="";
        this.content ="";
        this.ngOnInit();

      },err=>{
        console.log(err);
        console.log("non save********");


      }
      )


    }


  }

  openModal() {
    this.user = {
      id: 0,
      username: '',
      password: '',

    };
    $('#exampleModal').modal('show');
  }

  closeModal() {
    $('#exampleModal').modal('hide');
  }



}
