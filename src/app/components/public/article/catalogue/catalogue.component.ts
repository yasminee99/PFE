import { Component, OnInit } from '@angular/core';
import { Article } from 'src/app/interfaces/article';
import { ArticleVue } from 'src/app/interfaces/article-vue';
import { ArticlesService } from 'src/app/services/articles.service';

@Component({
  selector: 'app-catalogue',
  templateUrl: './catalogue.component.html',
  styleUrls: ['./catalogue.component.scss']
})
export class CatalogueComponent implements OnInit {
  cat: Article[] = [] //from api
  art:ArticleVue[]=[]
  s: Article[] = [] //pour chaque itération
  pre: any //pour le retour
  
  parent = true
  
  parentId:any
  id: number[] = []

  constructor(private ser: ArticlesService) { }

  ngOnInit(): void {
   /* this.ser.getAllArticles().subscribe(
      res => {
        this.cat = res;
        this.s = this.cat.filter(item => item.parentId == 0);
        //console.log(this.s)
      },
      err => console.log(err)
    )*/
    this.getParent()

  }
  getChild(i: number,j:number) {
    //récuperer la liste des previous
    //this.pre = this.s
    //console.log(" previous") 
    //console.log(this.pre)
    //J'enregistre l'historique du catalogue
    

    //console.log("ahawa el multi1") 
    //console.log(this.multi)
    //console.log("-------------")

    //parent ces les articles ayant parentId=0
    this.parent = false
    //les fils qu'on va afficher
    this.s = this.cat.filter(item => item.parentId == i);
    this.id.push(j)
    //this.multi.push(this.s)

    
    
        //this.previous = false
  }

  OnClickPrevious() {
    this.parentId=this.id.pop()
    console.log("id")
    console.log(this.parentId)
    this.s = this.cat.filter(item => item.parentId == this.parentId);

   // this.previous = true;
    //this.pre = this.multi.pop();
    //console.log("ahawa el previous") 
    //console.log(this.pre)
    //console.log("ahawa el multi2") 
    //console.log(this.multi)
    if(this.id.length==0)
      this.getParent()
  }

  getParent(){
    this.ser.getAllArticles().subscribe(
      res => {
        this.cat = res;
        this.s = this.cat.filter(item => item.parentId == 0);
       // this.multi.push(this.s)
        //console.log("bonjour")
        //console.log(this.multi)
        this.parent=true
      },
      err => console.log(err)
    )
    this.ser.getAllArticlesData().subscribe(
      res=>{this.art=res;/*console.log(this.art)*/},
      err=>console.log(err)
    )
  }

}
