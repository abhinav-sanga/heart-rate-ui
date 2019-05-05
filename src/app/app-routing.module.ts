import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ShowgraphComponent } from './showgraph/showgraph.component';
import { HomepageComponent } from './homepage/homepage.component';

// import { HomeComponent } from './Home/home.component';
// import { LoginComponent } from './Login/login.component';
// import { GlobalAnalyticsComponent } from './Dashboard/global-analytics/global-analytics.component';
// import { ListCampaignsComponent } from './Campaigns/list-campaigns/list-campaigns.component';
// import { ManageCampaignsComponent } from './Campaigns/manage-campaigns/manage-campaigns.component';
// import { ListBrandsComponent } from './Brands/list-brands/list-brands.component';
// import { ManageBrandsComponent } from './Brands/manage-brands/manage-brands.component';
// import { GuardService } from './Services/Auth-guard/guard.service';
// import { CampaignAnalyticsComponent } from './Analytics/campaign-analytics/campaign-analytics.component';

const appRoutes: Routes = [
  {
    path: 'home', component: HomepageComponent,
    // children: [
    //   { path: '', component: GlobalAnalyticsComponent },
    //   { path: 'brands', component: ListBrandsComponent },
    //   { path: 'campaigns', component: ListCampaignsComponent },
    //   { path: 'manageCampaign', component: ManageCampaignsComponent },
    //   { path: 'analytics', component: CampaignAnalyticsComponent }
    // ]
  },
  {
    path: 'session', component: ShowgraphComponent
  },
  {
    path: '', redirectTo: '/home', pathMatch: 'full'
  },
  { path: '**', redirectTo: '/home', pathMatch: 'full'  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(appRoutes)
  ],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule { }
