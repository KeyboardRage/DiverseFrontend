import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "bitwise"
})
export class BitwisePipe implements PipeTransform {
  transform(flag) {
    let flags = {
      active: 1,
      note: 2,
      warn: 4,
      mute: 8,
      dwc: 16,
      kick: 32,
      tempban: 64,
      ban: 128,
      archived: 256
    };
    let label =
      flag & flags.note
        ? "Note"
        : flag & flags.warn
        ? "Warning"
        : flag & flags.mute
        ? "Mute"
        : flag & flags.dwc
        ? "DWC"
        : flag & flags.kick
        ? "Kick"
        : flag & flags.tempban
        ? "Temp-ban"
        : flag & flags.ban
        ? "Ban"
        : "Note";

    return label;
  }
}
