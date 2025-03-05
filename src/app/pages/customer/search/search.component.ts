import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Branch_Office } from '@app/models/branch_office';
import { BranchService } from '@app/services/branch.service';
import { InputTextModule } from 'primeng/inputtext';
import { Tag } from 'primeng/tag';

@Component({
  selector: 'app-search',
  imports: [FormsModule, CommonModule, Tag, InputTextModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent implements OnInit {
  search: string = '';
  searchText: string = '';

  constructor(private branchServices: BranchService) { }
  ngOnInit(): void {
    this.getAllBranches();
  }

  availableTags: Branch_Office[] = [];
  // Tags actualmente seleccionadas
  selectedTags: string[] = [];



  filtrarItems(): void {

  }

  // Alterna la selección de un tag y vuelve a filtrar los items.
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
      }
    })
  }
}
