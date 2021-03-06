import { Injectable } from '@angular/core';
import { BackendService } from './backend.service';
import { SessionService } from './session.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private backend: BackendService, private session: SessionService) {}

  register(data) {
    return this.backend.register(data);
  }

  login(data) {
    return this.backend.login(data).then(response => {
      if (response) {
        return this.session.setSession(response);
      }
    });
  }

  logout() {
    return this.backend.logout().then(() => {
      return this.session.clearSession();
    });
  }
}
