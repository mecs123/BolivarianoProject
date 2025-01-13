import { Component } from '@angular/core';
import { FooterComponent } from '../../componentes/footer/footer.component';
import { HeaderComponent } from "../../componentes/header/header.component";
import { MenuComponent } from "../../componentes/menu/menu.component";

@Component({
  selector: 'app-home',
  imports: [FooterComponent, HeaderComponent, MenuComponent],
  templateUrl: './home.component.html',
  styles: ``
})
export class HomeComponent {

}
