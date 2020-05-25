import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { DuckFeedService } from '../services/duck-feed.service';
import { DuckFeedRequestModel } from '../models/duck-feed-request.model';

@Component({
  selector: 'app-duck-feed-form',
  templateUrl: './duck-feed-form.component.html',
  styleUrls: ['./duck-feed-form.component.scss']
})
export class DuckFeedFormComponent implements OnInit {
  duckFeedForm: FormGroup;
  submitted: boolean;
  loading: boolean;
  successMessage: string;

  constructor(
    private fb: FormBuilder,
    private duckFeedService: DuckFeedService
    ) {
    this.duckFeedForm = this.fb.group({
      fed_time: ['', [Validators.required]],
      food: ['', [Validators.required]],
      place: ['', [Validators.required]],
      number_of_ducks: ['', [Validators.required]],
      food_type: ['', [Validators.required]],
      food_weight: ['', [Validators.required]],
      schedule: [false, []],
    });
  }

  get duckFeedFormControl() {
    return this.duckFeedForm.controls;
  }

  ngOnInit() {
  }

  onSubmit() {
    this.submitted = true;
    if (this.duckFeedForm.valid) {
      this.loading = true;
      const duckFeedRequest: DuckFeedRequestModel = {
        fed_time: `${this.duckFeedForm.value.fed_time.hour}:${this.duckFeedForm.value.fed_time.minute}`,
        food: this.duckFeedForm.value.food,
        place: this.duckFeedForm.value.place,
        number_of_ducks: this.duckFeedForm.value.number_of_ducks,
        food_type: this.duckFeedForm.value.food_type,
        food_weight: this.duckFeedForm.value.food_weight,
        schedule: this.duckFeedForm.value.schedule
      };

      this.duckFeedService.sendDuckFeedData(duckFeedRequest).subscribe(response => {
        this.loading = false;
        this.submitted = false;
        this.successMessage = response.data.message;
        this.duckFeedForm.reset();
        setTimeout(() => {
          this.successMessage = '';
        }, 5000);
      }, error => {
        this.loading = false;
      });
    }
  }

}
