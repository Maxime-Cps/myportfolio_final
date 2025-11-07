import { Component } from '@angular/core';
import {Tab, TabList, TabPanel, TabPanels, Tabs} from 'primeng/tabs';
import {RouterLink, RouterOutlet} from '@angular/router';
import {ToolsTab} from './tools-tab/tools-tab';
import {IdesTab} from './ides-tab/ides-tab';
import {FrameworksTab} from './frameworks-tab/frameworks-tab';
import {LanguagesTab} from './languages-tab/languages-tab';

@Component({
  selector: 'app-tabs-menu',
  imports: [
    Tabs,
    TabList,
    Tab,
    TabPanels,
    TabPanel,
    ToolsTab,
    IdesTab,
    FrameworksTab,
    LanguagesTab,
  ],
  templateUrl: './tabs-menu.html',
  styleUrl: './tabs-menu.scss'
})
export class TabsMenu {
  tabs = [
    { value: 'tools', title: 'Outils', icon: 'pi pi-wrench'},
    { value: 'ides', title: 'IDEs', icon: 'pi pi-desktop'},
    { value: 'frameworks', title: 'Frameworks', icon: 'pi pi-briefcase'},
    { value: 'languages', title: 'Langages', icon: 'pi pi-language'}
  ];

  getContent(): HTMLElement {
    return document.getElementById('content') as HTMLElement;
  }
}
