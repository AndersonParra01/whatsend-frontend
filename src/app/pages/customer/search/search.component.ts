import { CommonModule } from '@angular/common';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Branch_Office } from '@app/models/branch_office';
import { Customer } from '@app/models/customers';
import { BranchService } from '@app/services/branch.service';
import { CustomerService } from '@app/services/customer.service';
import { InputTextModule } from 'primeng/inputtext';
import { Tag } from 'primeng/tag';

@Component({
  selector: 'app-search',
  imports: [FormsModule, CommonModule, Tag, InputTextModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css',
})
export class SearchComponent implements OnInit {
  @Output() customers: EventEmitter<Customer[]> = new EventEmitter<Customer[]>();
  search: string = '';


  constructor(
    private branchServices: BranchService,
    private customerService: CustomerService
  ) { }
  ngOnInit(): void {
    this.getAllBranches();
  }

  availableTags: Branch_Office[] = [];
  selectedTags: string[] = [];

  filtrarItems(): void {
    console.log('Searching: ', this.search);
    if (this.search.length > 0) {
      this.customerService.searchCustomer(this.search).subscribe({
        next: (customers) => {
          console.log('Filtered customers', customers);
          this.customers.emit(customers);
        },
        error: (error) => {
          console.error('Error searching customers', error);
        },
      })

    } else {
      this.getCustomerAll();
    }
  }

  toggleTag(tag: string): void {
    const index = this.selectedTags.indexOf(tag);
    if (index > -1) {
      this.selectedTags.splice(index, 1);
    } else {
      this.selectedTags.push(tag);
    }
    this.filtrarItems();
  }

  getAllBranches(): void {
    this.branchServices.getAllBranches().subscribe({
      next: (branches) => {
        this.availableTags = branches;
      },
      error: (error) => {
        console.error('Error getting branches', error);
      },
    });
  }

  getCustomerAll(): void {
    this.customerService.getAllCustomers().subscribe({
      next: (customers) => {
        console.log('All customers', customers);
        this.customers.emit(customers);
      },
      error: (error) => {
        console.error('Error getting customers', error);
      },
    });
  }
}
