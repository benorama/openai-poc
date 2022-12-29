import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {NameMyPetComponent} from "./name-my-pet/name-my-pet.component";
import {TweetClassifierComponent} from "./tweet-classifier/tweet-classifier.component";
import {ChatComponent} from "./chat/chat.component";

const routes: Routes = [
    {path: '', redirectTo: '/home', pathMatch: 'full'},
    {path: 'home', component: HomeComponent},
    {path: 'name-my-pet', component: NameMyPetComponent},
    {path: 'tweet-classifier', component: TweetClassifierComponent},
    {path: 'chat', component: ChatComponent},
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
