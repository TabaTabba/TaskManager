import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CanComponentDeactivate } from 'app/guards/can-deactivate-guard.service';
import { Country } from 'app/models/country';
import { SignUpViewModel } from 'app/models/sign-up-view-model';
import { CountriesService } from 'app/services/countries.service';
import { CustomValidatorsService } from 'app/services/custom-validators.service';
import { LoginService } from 'app/services/login.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit, CanComponentDeactivate
{
  signUpForm: FormGroup | any = null;
  genders = ["male", "female", "other"];
  countries: Country[] = [];
  registerError: string | null = null;

  canLeave: boolean = true;

  constructor(private countriesService: CountriesService, private formBuilder: FormBuilder, private customValidatorsService: CustomValidatorsService, private loginService: LoginService, private router: Router)
  {
  }

  ngOnInit()
  {
    this.countriesService.getCountries().subscribe((response) =>
    {
      this.countries = response;
    });

    this.signUpForm = this.formBuilder.group({
      personName: this.formBuilder.group({
        firstName: [null, [Validators.required, Validators.minLength(2)]],
        lastName: [null, [Validators.required, Validators.minLength(2)]],
      }),

      email: [null, [Validators.required, Validators.email], [this.customValidatorsService.DuplicateEmailValidator()], { updateOn: 'blur'}],
      mobile: [null, [Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/)]],
      dateOfBirth: [null, [Validators.required, this.customValidatorsService.minimumAgeValidator(18)]],
      password: [null, [Validators.required]],
      confirmPassword: [null, [Validators.required]],
      gender: [null, [Validators.required]],
      countryID: [null, [Validators.required]],
      receiveNewsLetters: [null],
      skills: this.formBuilder.array([])
    }, {
      validators: [
        this.customValidatorsService.compareValidator("confirmPassword", "password")
      ]
    });

    this.signUpForm.valueChanges.subscribe((value: any) =>
    {
      console.log(value);
      this.canLeave = false;
    });
  }

  onSubmitClick()
  {
    this.signUpForm["submitted"] = true;
    console.log(this.signUpForm);

    if (this.signUpForm.valid)
    {
      var signUpViewModel = this.signUpForm.value as SignUpViewModel;
      this.loginService.Register(signUpViewModel).subscribe(
        (response) =>
        {
          this.canLeave = true;
          this.router.navigate(["/employee","tasks"]);
        },
        (error) =>
        {
          console.log(error);
          this.registerError = "Unable to submit";
        });
    }
  }

  onAddSkill()
  {
    var formGroup = new FormGroup({
      skillName: new FormControl(null, [Validators.required]),
      skillLevel: new FormControl(null, [Validators.required])
    });

    (<FormArray>this.signUpForm.get("skills")).push(formGroup);
  }

  onRemoveClick(index: number)
  {
    (<FormArray>this.signUpForm.get("skills")).removeAt(index);
  }
}