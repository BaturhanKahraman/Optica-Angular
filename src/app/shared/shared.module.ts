import { NgModule } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import {MatCommonModule} from '@angular/material/core';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from '../material.module';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
  ],
  exports:[
    FlexLayoutModule,
    MaterialModule,
    CommonModule
  ]
})
export class SharedModule { }
