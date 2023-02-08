import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SingUpComponent} from "./components/sing-up/sing-up.component";
import {LoginComponent} from "./components/login/login.component";
import {PageNotFoundComponent} from "./components/page-not-found/page-not-found.component";
import {AuthGuard} from "./auth.guard";
import {DashboardComponent} from "./components/dashboard/dashboard.component";
import {ChatComponent} from "./components/dashboard/components/chat/chat.component";

const routes: Routes = [
  {path: "", redirectTo: "/login", pathMatch: "full"},
  // {path: "home", component: HomePageComponent},
  {path: "login", component: LoginComponent},
  {path: "sing-up", component: SingUpComponent},
  {
    path: "dashboard",
    component: DashboardComponent,
    children: [
      {path: "", redirectTo: "/dashboard/chat", pathMatch: "full"},
      {path: "chat", component: ChatComponent},
      // {path: "checkout", component: CheckoutComponent},
      {path: '**', component: PageNotFoundComponent}
    ],
    canActivate: [AuthGuard]
  },
  {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
