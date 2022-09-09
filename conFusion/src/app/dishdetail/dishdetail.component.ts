import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { Dish } from '../shared/dish';
import { DishService } from '../services/dish.service';
import { Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { switchMap } from 'rxjs/operators';
import { Comment } from '../shared/comment';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { expand, flyInOut, visibility } from '../animations/app.animation';


@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.scss'],
  // tslint:disable-next-line:use-host-property-decorator
  host: {
  '[@flyInOut]': 'true',
  'style': 'display: block;'
  },
  animations: [
    flyInOut(),
    visibility(),
    expand()
  ]
})
export class DishdetailComponent implements OnInit {
  @ViewChild('fform') commentsFormDirective;
  visibility = 'shown';
  commentsForm: FormGroup;
  dish: Dish;
  dishIds: string[];
  prev: string;
  next: string;
  comment: Comment;
  errMess: string;
  dishcopy: Dish;

  createForm() {
    this.commentsForm = this.fb.group({
      author: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(50),
        ],
      ],
      rating: 5,
      comment: [
        '',
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(1000),
        ],
      ],
    });
    this.commentsForm.valueChanges.subscribe((data) =>
      this.onValueChanged(data)
    );

    this.onValueChanged(); // (re)set validation messages now
  }

  setPrevNext(dishId: string) {
    const index = this.dishIds.indexOf(dishId);
    this.prev =
      this.dishIds[(this.dishIds.length + index - 1) % this.dishIds.length];
    this.next =
      this.dishIds[(this.dishIds.length + index + 1) % this.dishIds.length];
  }

  goBack(): void {
    this.location.back();
  }

  onSubmit() {
    let data = new Date();
    data.toISOString();
    this.commentsForm.value.date = data;
    this.comment = this.commentsForm.value;
    this.dishcopy.comments.push(this.comment);
    this.dishservice.putDish(this.dishcopy)
      .subscribe(dish => {
        this.dish = dish; this.dishcopy = dish;
      },
      errmess => { this.dish = null; this.dishcopy = null; this.errMess = <any>errmess; });
    this.commentsForm.reset();
    this.commentsFormDirective.resetForm({
      author: '',
      rating: 5,
      comment: '',
    });
  }

  onValueChanged(data?: any) {
    if (!this.commentsForm) {
      return;
    }
    const form = this.commentsForm;
    for (const field in this.formErrors) {
      if (this.formErrors.hasOwnProperty(field)) {
        // clear previous error message (if any)
        this.formErrors[field] = '';
        const control = form.get(field);
        if (control && control.dirty && !control.valid) {
          const messages = this.validationMessages[field];
          for (const key in control.errors) {
            if (control.errors.hasOwnProperty(key)) {
              this.formErrors[field] += messages[key] + ' ';
            }
          }
        }
      }
    }
  }

  formErrors = {
    author: '',
    comment: '',
  };

  validationMessages = {
    author: {
      required: 'Name is required.',
      minlength: 'Name must be at least 2 characters long.',
      maxlength: 'Name cannot be more than 50 characters long.',
    },
    comment: {
      required: 'Message is required.',
      minlength: 'Message must be at least 10 characters long',
      maxlength: 'Message cannot be more than 1000 characters long.',
    },
  };

  constructor(
    private dishservice: DishService,
    private route: ActivatedRoute,
    private location: Location,
    private fb: FormBuilder,
    @Inject('BaseURL') public BaseURL
  ) {
    this.createForm();
  }

  ngOnInit() {
    this.dishservice
      .getDishIds()
      .subscribe(dishIds => this.dishIds = dishIds,
      errmess => this.errMess = <any>errmess
      );
      this.route.params.pipe(switchMap((params: Params) => { this.visibility = 'hidden'; return this.dishservice.getDish(params['id']); }))
    .subscribe(dish => { this.dish = dish; this.dishcopy = dish; this.setPrevNext(dish.id); this.visibility = 'shown'; },
      errmess => this.errMess = <any>errmess);
  }
}
