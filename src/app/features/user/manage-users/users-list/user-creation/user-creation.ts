import { Component, inject, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MATERIAL } from '../../../../../shared/material/materials';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { BaseComponent } from '../../../../../shared/components/base-component/base-component';
import { map, Observable, takeUntil } from 'rxjs';
import { API_ENDPOINTS } from '../../../../../core/config/api-endpoints';
import { DialogService } from '../../../../../core/services/dialog-service';

@Component({
  selector: 'app-user-creation',
  imports: [MATERIAL, FormsModule, ReactiveFormsModule],
  templateUrl: './user-creation.html',
  styleUrl: './user-creation.css',
})
export class UserCreation extends BaseComponent implements OnInit {

  // #region dependency Injections
  private _fb = inject(FormBuilder);
  private dialog = inject(DialogService)
  //#endregion

  userForm!: FormGroup;
  private ud: any;
  @ViewChild('logoutTemplate', { static: true }) logoutTemplate!: TemplateRef<any>;


  ngOnInit(): void {
    this.userForm = this._fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required]],
      address: [''],
      password: ['', [Validators.required]],
      contact_number: ['', [Validators.required]]
    })
    const storagedData: string = sessionStorage.getItem('userDetails') || '';
    this.ud = storagedData ? JSON.parse(storagedData) : ''

  }

  canDeactivate(): boolean | Observable<boolean> {
    if (this.userForm.dirty) {
      return this.dialog.open({
        title: 'Unsaved Changes',
        width: '500px',
        height: '300px',
        contentTemplate: this.logoutTemplate,
        data: { message: 'You have unsaved changes. Do you really want to leave this page?' },
        actions: [
          { label: 'Cancel', value: false },
          { label: 'Ok', value: true }
        ]
      }).pipe(map((result: any) => result || false));
    }
    return false;
  }



  //------------API CALL FOR CREATE USER ---------//
  createUser() {
    if (this.userForm.invalid) {
      this._toastr.warning('Enter full details');
      return;
    }
    const formData = this.userForm.value;
    const payload = {
      name: formData.name,
      email: formData.email,
      password: formData.password,
      phone_number: formData.contact_number,
      address: formData.address,
      user_type: this.ud.user_type ? this.ud.user_type : 'member'
    }
    this._apiService.post(API_ENDPOINTS.users.createUser, payload).pipe(takeUntil(this.destroy$)).subscribe({
      next: (_res: any) => {
        this._toastr.success(_res.msg);
        this.userForm.reset();
      }
    })
  }


}
