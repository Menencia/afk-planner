import { NgFor } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { Faction } from 'src/app/core/enums/faction';
import { getFactionList } from 'src/app/core/utils/faction.utils';

@Component({
  selector: 'app-switch-faction',
  standalone: true,
  imports: [NgFor],
  templateUrl: './switch-faction.component.html',
  styleUrl: './switch-faction.component.scss',
})
export class SwitchFactionComponent {
  faction?: Faction;

  @Output() factionChange = new EventEmitter();

  factions = getFactionList();

  onClick(newFaction: Faction) {
    this.faction = newFaction !== this.faction ? newFaction : undefined;
    this.factionChange.emit(this.faction);
  }
}
