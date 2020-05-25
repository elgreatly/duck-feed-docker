import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DuckFeedFormComponent } from './component/duck-feed-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbTimepickerModule} from '@ng-bootstrap/ng-bootstrap';



@NgModule({
  declarations: [DuckFeedFormComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgbTimepickerModule
  ],
  exports: [DuckFeedFormComponent]
})
export class DuckFeedFormModule { }
