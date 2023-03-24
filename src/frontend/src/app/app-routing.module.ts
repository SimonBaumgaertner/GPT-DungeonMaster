import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HexTestComponent } from './hex-test/hex-test.component';

const routes: Routes = [
  { path: '', component: HexTestComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
