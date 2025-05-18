import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { TerminalService } from 'primeng/terminal';
import { NgForm, NgModel } from '@angular/forms';

interface User {
  id?: number;
  username: string;
  fname: string;
  lname: string;
  gender: string;
  dob: any;
  email: string;
  mobile: number;
  address1: string;
  address2: string;
  country: string;
  state: string;
  zipcode: string;
  timezone: string;
  locale: string;
  image: string | null;
  isAdmin: boolean;
  permissions: string[];
  datetime: any;
  status: string;
  password: string;
}

@Component({
  selector: 'app-notfound',
  templateUrl: './notfound.component.html',
  styleUrl: './notfound.component.css',
  providers: [ConfirmationService, MessageService, TerminalService],
})
export class NotfoundComponent {
  users: User[] = [];
  states: string[] = [];
  visible: boolean = false;
  mode: 'view' | 'edit' | 'add' = 'view';
  first = 0;
  rows = 10;
  totalRecords = 0;
  curPageInput: number = 1;
  maxPage: number = 1;
  uploadedFileName: string = '';
  @ViewChild('dt') tableRef!: ElementRef;
  paginatorMargin: number = 0;

  curUser = {
    username: 'admin',
    permissions: ['add', 'edit', 'view', 'delete'],
  };

  locales: string[] = ['en-US', 'en-GB', 'fr-FR', 'de-DE', 'es-ES', 'zh-CN'];

  genders: any[] = [
    { label: 'Male', gender: 'male' },
    { label: 'Female', gender: 'female' },
    { label: 'Others', gender: 'others' },
  ];

  timezones: string[] = [
    'IST - UTC+5:30',
    'PST - UTC-8',
    'EST - UTC-5',
    'CST - UTC-6',
    'MST - UTC-7',
    'AKST - UTC-9',
  ];

  countries = [
    { label: 'India', value: 'India' },
    { label: 'USA', value: 'USA' },
  ];

  permissionLabels = ['Add', 'Delete', 'Edit', 'View'];

  permissions = this.permissionLabels.map((label) => ({
    label,
    value: label.toLowerCase(),
  }));

  newUser: User = this.getEmptyUser();

  constructor() {
    this.fetchUsers();
  }

  ngAfterViewInit() {
    this.adjustPaginatorPosition();
  }

  @HostListener('window:resize')
  onResize() {
    this.adjustPaginatorPosition();
  }

  adjustPaginatorPosition() {
    if (this.tableRef) {
      const tableHeight = this.tableRef.nativeElement.clientHeight;
      const viewportHeight = window.innerHeight;
      const marginValue = viewportHeight - tableHeight - 80;
      document.documentElement.style.setProperty(
        '--paginator-margin',
        `${marginValue}px`
      );
    }
  }

  getEmptyUser(): User {
    return {
      username: '',
      fname: '',
      lname: '',
      gender: '',
      dob: '',
      email: '',
      mobile: 0,
      address1: '',
      address2: '',
      country: '',
      state: '',
      zipcode: '',
      timezone: '',
      locale: '',
      image: '',
      isAdmin: false,
      permissions: [],
      datetime: new Date().toISOString(),
      status: 'Active',
      password: '12345',
    };
  }

  showMessage(
    summary: string,
    detail: string,
    severity: 'success' | 'error' | 'info' | 'warn'
  ) {
    console.log(`[${severity.toUpperCase()}] ${summary}: ${detail}`);
  }

  onPermissionChange() {
    const permissionsSet = new Set(this.newUser.permissions);
    if (permissionsSet.has('edit')) {
      permissionsSet.add('view');
    }
    this.newUser.permissions = Array.from(permissionsSet);
  }

  hasPermission(action: string): boolean {
    return this.curUser?.permissions?.includes(action);
  }

  showPermissionError(action: string) {
    this.showMessage(
      'Permission Denied',
      `You don't have permission to ${action}`,
      'warn'
    );
  }

  onCountryChange(event: any) {
    const selectedCountry = event.value || event.target?.value;
    this.states = this.getStatesByCountry(selectedCountry);
  }

  getStatesByCountry(country: string): string[] {
    if (country === 'India')
      return [
        'Karnataka',
        'Tamil Nadu',
        'Delhi',
        'Madhya Pradesh',
        'Maharashtra',
        'Kerala',
        'Haryana',
        'Himachal Pradesh',
      ];
    if (country === 'USA')
      return [
        'California',
        'New York',
        'Texas',
        'Florida',
        'Illinois',
        'Pennsylvania',
        'Ohio',
        'Georgia',
        'Washington',
        'Massachusetts',
      ];
    return [];
  }

  onPageChange(event: any) {
    this.first = event.first;
    this.rows = event.rows;
    this.maxPage = Math.ceil(this.totalRecords / this.rows);
    this.curPageInput = event.page + 1;
  }

  goToPage(table: any) {
    const targetPage = this.curPageInput;
    if (targetPage >= 1 && targetPage <= this.maxPage) {
      this.first = (targetPage - 1) * this.rows;
      table.first = this.first;
      table.paginate({ first: table.first, rows: this.rows });
    } else {
      this.showMessage('Invalid Page', 'Page does not exist', 'warn');
    }
  }

  fetchUsers() {
    this.users = [
      {
        id: 1,
        username: 'john_doe',
        fname: 'John',
        lname: 'Doe',
        gender: 'male',
        dob: '1990-01-01',
        email: 'john@example.com',
        mobile: 9876543210,
        address1: '123 Street',
        address2: '',
        country: 'USA',
        state: 'California',
        zipcode: '90001',
        timezone: 'PST - UTC-8',
        locale: 'en-US',
        image: '',
        isAdmin: false,
        permissions: ['view', 'edit'],
        datetime: new Date().toISOString(),
        status: 'Active',
        password: '12345',
      },
    ];
    this.totalRecords = this.users.length;
    this.maxPage = Math.ceil(this.totalRecords / this.rows);
  }

  switchToEditMode(): boolean {
    if (!this.hasPermission('edit')) {
      this.showPermissionError('edit');
      return false;
    }
    this.mode = 'edit';
    return true;
  }

  showDailog(user: User | null, mode: 'view' | 'add' | 'edit' = 'add') {
    this.mode = mode;
    if (!this.hasPermission(mode)) {
      this.showPermissionError(mode);
      return;
    }
    this.newUser = user
      ? { ...user, dob: user.dob ? new Date(user.dob) : '' }
      : this.getEmptyUser();
    if (user) {
      this.states = this.getStatesByCountry(user.country);
    }
    this.visible = true;
  }

  confirmDelete(user: User) {
    if (!this.hasPermission('delete')) {
      this.showPermissionError('delete');
      return;
    }
    const confirmed = confirm('Are you sure you want to delete this user?');
    if (confirmed) {
      this.users = this.users.filter((u) => u.id !== user.id);
      this.showMessage('Deleted', 'User deleted successfully', 'success');
    } else {
      this.showMessage('Cancelled', 'Deletion cancelled', 'info');
    }
  }

  saveUser(userForm: NgForm) {
    const u = userForm.controls;
    if (
      !u['userName']?.value?.trim() ||
      !/^[a-zA-Z0-9]*$/.test(u['userName']?.value)
    ) {
      this.showMessage(
        'Invalid Username',
        'Username is required and must be alphanumeric',
        'error'
      );
      return;
    }

    if (
      !u['firstName']?.value?.trim() ||
      !/^[a-zA-Z0-9 ]*$/.test(u['firstName']?.value)
    ) {
      this.showMessage(
        'Invalid First Name',
        'First name is required and alphanumeric',
        'error'
      );
      return;
    }

    if (u['lastName']?.value && !/^[a-zA-Z0-9 ]*$/.test(u['lastName'].value)) {
      this.showMessage(
        'Invalid Last Name',
        'Only alphanumeric values allowed',
        'error'
      );
      return;
    }

    if (!/\S+@\S+\.\S+/.test(u['email']?.value)) {
      this.showMessage('Invalid Email', 'Email must be valid', 'error');
      return;
    }

    if (userForm.valid) {
      this.newUser.datetime = new Date();
      const duplicate = this.users.find(
        (user) =>
          user.username === this.newUser.username &&
          (this.mode === 'add' || user.id !== this.newUser.id)
      );

      if (duplicate) {
        this.showMessage(
          'Duplicate Username',
          'Username already exists!',
          'error'
        );
        return;
      }

      if (this.mode === 'edit') {
        const index = this.users.findIndex((u) => u.id === this.newUser.id);
        if (index !== -1) {
          this.users[index] = { ...this.newUser };
          this.showMessage(
            'User Updated',
            'User details updated successfully.',
            'success'
          );
        }
      } else {
        const newId = Math.max(...this.users.map((u) => u.id || 0)) + 1;
        const newUser = { ...this.newUser, id: newId };
        this.users.push(newUser);
        this.showMessage('User Added', 'User added successfully.', 'success');
      }

      if (this.newUser.username === this.curUser.username) {
        this.curUser = { ...this.newUser };
      }

      this.totalRecords = this.users.length;
      this.maxPage = Math.ceil(this.totalRecords / this.rows);
      this.visible = false;
      this.mode = 'view';
      userForm.resetForm();
    }
  }

  onImageUpload(event: any) {
    const file: File = event.target.files[0];
    const validTypes = ['image/png', 'image/jpeg', 'image/jpg'];

    if (file && !validTypes.includes(file.type)) {
      this.showMessage(
        'Invalid File',
        'Only PNG, JPEG, and JPG formats are allowed.',
        'error'
      );
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      this.showMessage(
        'File Too Large',
        'Image must be less than 2MB',
        'error'
      );
      return;
    }

    this.uploadedFileName = file.name;
    const reader = new FileReader();
    reader.onload = () => {
      this.newUser.image = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  removeImage() {
    this.uploadedFileName = '';
    this.newUser.image = null;
  }

  getSeverity(status: string): string {
    switch (status) {
      case 'Active':
        return 'success';
      case 'Disabled':
        return 'secondary';
      default:
        return 'secondary';
    }
  }

  onCancel() {
    if (this.mode === 'add') {
      this.visible = false;
    } else if (this.mode === 'edit') {
      const original = this.users.find(
        (user) => user.username === this.newUser.username
      );
      if (original) this.newUser = { ...original };
      this.mode = 'view';
    }
  }
}
