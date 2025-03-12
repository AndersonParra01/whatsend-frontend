import { Injectable } from '@angular/core';
import { Environment as env } from '../../enviroments/enviroments';
import { HttpClient } from '@angular/common/http';
import { Branch_Office } from '@app/models/branch_office';

@Injectable({
  providedIn: 'root'
})
export class BranchService {
  private apiUrl = `${env.api}/branches`
  constructor(private http: HttpClient) { }

  getAllBranches() {
    return this.http.get<Branch_Office[]>(`${this.apiUrl}/all`);
  }
  getBranchById(id: number) {
    return this.http.get<Branch_Office>(`${this.apiUrl}/findBy/${id}`);
  }

  createBranch(branchOffice: Branch_Office | null) {
    return this.http.post<Branch_Office>(`${this.apiUrl}/create`, branchOffice);
  }

  updateBranch(branchOffice: Branch_Office | null) {
    return this.http.put<Branch_Office>(`${this.apiUrl}/update/${branchOffice?.id}`, branchOffice);
  }

  deleteBranch(id: number) {
    return this.http.delete(`${this.apiUrl}/delete/${id}`);
  }
}
