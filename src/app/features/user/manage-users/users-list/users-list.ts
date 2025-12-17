import { Component, inject, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BaseComponent } from '../../../../shared/components/base-component/base-component';
import { MATERIAL } from '../../../../shared/material/materials';
import { takeUntil } from 'rxjs';
import { API_ENDPOINTS } from '../../../../core/config/api-endpoints';
import { LoaderService } from '../../../../core/services/loader.service';
import { ScrollingModule } from '@angular/cdk/scrolling';

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
  imports: [FormsModule, CommonModule, MATERIAL, ScrollingModule],
  templateUrl: './users-list.html',
  styleUrl: './users-list.css',
})
export class UsersList extends BaseComponent implements OnInit {

  private loader = inject(LoaderService)
  //DEPENDENCY INJUCTION VARIABLE
  displayedColumns: string[] = ['sno', 'name', 'email', 'phone_number', 'user_type', 'address', 'actions'];
  dataSource = new MatTableDataSource<User>();
  data: any

  // Pagination methods
  pagesize: number = 10;
  pageIndex: number = 1
  totalRecords: number = 0;
  loading: boolean = false;

  ngOnInit(): void {
    this.setBreadcrumb([
      { label: 'Configuration', link: '/home' },
      { label: 'Employees', active: true }
    ]);
    this.getUsersList();
  }
  getUsersList(index?: number) {

    if (this.loading) return;

    if (this.totalRecords && this.dataSource.data.length >= this.totalRecords) {
      return;
    }
    if (index !== undefined) {
      const threshold = this.dataSource.data.length - 10;
      if (index < threshold) return;
    }
    const payload = {
      skip_records: this.dataSource.data.length
    }
    this.loading = true;
    this._apiService.post(API_ENDPOINTS.users.getUsersList, payload).pipe(takeUntil(this.destroy$)).subscribe({
      next: (_res: any) => {
        const resData = _res?.data || {};
        const users = (resData.emp_data || []).map((item: any) => ({
          name: item?.name ?? '',
          email: item?.email ?? '',
          phone_number: item?.phone_number ?? '',
          address: item?.address ?? '',
          user_type: item?.user_type ?? '',
        }));
        this.totalRecords = resData?.pagination?.total_records ?? users.length;
        this.dataSource.data = [
          ...this.dataSource.data,
          ...users
        ];

        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }
  onAddNewUser() {
    this._router.navigateByUrl('/home/user/user-creation')
  }

  onEditUser(user: User) {
    this._router.navigate(['/home/user/user-edit', user.id]);
  }
}
