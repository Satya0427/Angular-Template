import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from "../header/header";
import { Breadcrumb } from '../../shared/components/breadcrumb/breadcrumb';

@Component({
  selector: 'app-layout',
  imports: [RouterOutlet, Header,Breadcrumb],
  templateUrl: './layout.html',
  styleUrl: './layout.css',
})
export class Layout {

}
