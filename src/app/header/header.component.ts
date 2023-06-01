import {Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  collapsed = true
  @Output('navLinkChanged') navLinkChange: EventEmitter<string> = new EventEmitter();
  onSelectLink(link: string) {
    this.navLinkChange.emit(link)
  }
}
