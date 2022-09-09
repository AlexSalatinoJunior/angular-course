import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { expand, flyInOut } from '../animations/app.animation';
import { FeedbackService } from '../services/feedback.service';
import { Feedback, ContactType } from '../shared/feedback';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
  // tslint:disable-next-line:use-host-property-decorator
  host: {
    '[@flyInOut]': 'true',
    'style': 'display: block;'
    },
    animations: [
      flyInOut(),
      expand()
    ]
})
export class ContactComponent implements OnInit {
  @ViewChild('fform') feedbackFormDirective;
  feedbacks: Feedback[]
  feedbackForm: FormGroup;
  feedback: Feedback;
  contactType = ContactType;
  errMess: string;
  id: number
  feedbackCopy: Feedback
  loading = false
  default = true

  createForm() {
    this.feedbackForm = this.fb.group({
      firstname: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(25),
        ],
      ],
      lastname: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(25),
        ],
      ],
      telnum: ['', [Validators.required, Validators.pattern]],
      email: ['', [Validators.required, Validators.email]],
      agree: false,
      contacttype: 'None',
      message: '',
    });
    this.feedbackForm.valueChanges.subscribe((data) =>
      this.onValueChanged(data)
    );

    this.onValueChanged(); // (re)set validation messages now
  }

  onValueChanged(data?: any) {
    if (!this.feedbackForm) {
      return;
    }
    const form = this.feedbackForm;
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
    firstname: '',
    lastname: '',
    telnum: '',
    email: '',
  };

  validationMessages = {
    firstname: {
      required: 'First Name is required.',
      minlength: 'First Name must be at least 2 characters long.',
      maxlength: 'FirstName cannot be more than 25 characters long.',
    },
    lastname: {
      required: 'Last Name is required.',
      minlength: 'Last Name must be at least 2 characters long.',
      maxlength: 'Last Name cannot be more than 25 characters long.',
    },
    telnum: {
      required: 'Tel. number is required.',
      pattern: 'Tel. number must contain only numbers.',
    },
    email: {
      required: 'Email is required.',
      email: 'Email not in valid format.',
    },
  };

  onSubmit() {
    this.loading = true
    this.default = false
    this.feedback = this.feedbackForm.value;
    this.feedbackService.putFeedback(this.feedback)
      .subscribe(feedback => this.feedback = feedback,
      errmess => { this.feedback = null; this.errMess = <any>errmess; });
    this.getLastFeedback()
    this.feedbackForm.reset({
      firstname: '',
      lastname: '',
      telnum: '',
      email: '',
      agree: false,
      contacttype: 'None',
      message: '',
    });
    this.feedbackFormDirective.resetForm();
    if(this.feedbackCopy != null){
    }
  }

  getLastFeedback(){
    this.feedbackService.getFeedbackIds().subscribe(ids => {
      this.id = ids.length;
      let lastId = this.id.toString();
      this.feedbackService.getFeedback(lastId).subscribe(feedback => {
        this.feedbackCopy = feedback;
        this.loading = false;
        setTimeout(() => this.default = true, 5000)},
        errmess => this.errMess = <any>errmess)
    },
      errmess => this.errMess = <any>errmess)
  }

  constructor(private fb: FormBuilder,
    private feedbackService: FeedbackService,
    @Inject('BaseURL') public BaseURL
    ) {
    this.createForm();
  }

  ngOnInit() {}
}
