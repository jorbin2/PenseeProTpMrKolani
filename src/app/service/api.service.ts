import { HttpClient,HttpHeaders  } from '@angular/common/http';
import { Injectable } from '@angular/core';

import axios, { AxiosResponse } from 'axios';
import { Observable } from 'rxjs';
import { Article, User } from '../model/model';



@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private readonly baseUrl: string="";
  public loginUserService ="";


  private apiUrl = "http://localhost:8080/api/";

  constructor(private http: HttpClient) { }



  public getData(url:string): Observable<User[]>{

    return this.http.get<User[]>(this.apiUrl+url);
  }

  postData(data: User,url:string): Observable<User> {
    return this.http.post<User>(this.apiUrl+url, data);
  }
  public getArticleData(url:string): Observable<Article[]>{

    return this.http.get<Article[]>(this.apiUrl+url);
  }
  postArticleData(data: Article,url:string): Observable<Article> {
    return this.http.post<Article>(this.apiUrl+url, data);
  }
}


