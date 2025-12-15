import { Component, inject, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BaseComponent } from '../../../../shared/components/base-component/base-component';
import { MATERIAL } from '../../../../shared/material/materials';
import { takeUntil } from 'rxjs';
import { API_ENDPOINTS } from '../../../../core/config/api-endpoints';
import { LoaderService } from '../../../../core/services/loader.service';

export interface User {
  id: number;
  firstName: string;
  email: string;
  contactNumber: string;
  userType: 'Admin' | 'User';
  status: 'Active' | 'Inactive';
}

@Component({
  selector: 'app-users-list',
  imports: [FormsModule, CommonModule, MATERIAL],
  templateUrl: './users-list.html',
  styleUrl: './users-list.css',
})
export class UsersList extends BaseComponent implements OnInit {

  private loader = inject(LoaderService)
  //DEPENDENCY INJUCTION VARIABLE
  displayedColumns: string[] = ['firstName', 'email', 'contactNumber', 'userType', 'status', 'actions'];
  dataSource = new MatTableDataSource<User>();
  data: any

  ngOnInit(): void {
    this.setBreadcrumb([
      { label: 'Configuration', link: '/home' },
      { label: 'Employees', active: true }
    ]);
    this.getUsersList();
  }

  // API CALL FOR GET USERS LIST
  getUsersList() {
    this.loader.show();
    const payload = {
      "page_size": "",
      "page_index": '1',
      "search_key": ""
    };
    this._apiService.get(API_ENDPOINTS.users.getUsersList, payload).pipe(takeUntil(this.destroy$)).subscribe({
      next: (_res: any) => {
        const resData = _res?.data ? _res?.data?.empdata : [];
        const data = resData.map((item: any) => {
          return {
            id: item?.empid || '',
            firstName: item?.empname || '',
            email: item?.mail || '',
            contactNumber: item?.contactno || '',
            userType: item?.user_type || '',
            status: item?.status_code || '',
          }
        });
        this.dataSource = new MatTableDataSource<User>(data);
      }
    })
  }
  onAddNewUser() {
    this._router.navigateByUrl('/home/user/user-creation')
  }

  onEditUser(user: User) {
    this._router.navigate(['/home/user/user-edit', user.id]);
  }
}
