import { MaterialGame, MaterialRulesPart } from "@gamepark/rules-api";
import { MaterialType } from "../../material/MaterialType";
import { LocationType } from "../../material/LocationType";

export class MainBoardHelper extends MaterialRulesPart {
  constructor(game: MaterialGame, readonly player: number) {
    super(game)
  }

  areArchitectsAligned() {
    const architects = this.material(MaterialType.Architect).location(LocationType.MainBoardStackSpace).player(this.player).getItems()
    if (architects.length < 3) {
      return false; // Not enough for a line
    }
  
    // Verificar horizontal, vertical and diagonal alignment
    for (let i = 0; i < architects.length - 2; i++) {
      for (let j = i + 1; j < architects.length - 1; j++) {
        for (let k = j + 1; k < architects.length; k++) {
          const obj1 = architects[i];
          const obj2 = architects[j];
          const obj3 = architects[k];
  
          // Horizontal alignment
          if (obj1.location.y === obj2.location.y && obj2.location.y === obj3.location.y) {
            return true;
          }
  
          // Vertical alignment
          if (obj1.location.x === obj2.location.x && obj2.location.x === obj3.location.x) {
            return true;
          }
  
          // Diagonal alignment
          if (
            (obj1.location.x! - obj2.location.x! === obj1.location.y! - obj2.location.y!) && 
            (obj1.location.x! - obj3.location.x! === obj1.location.y! - obj3.location.y!)
          ) {
            return true;
          }
  
          if (
            (obj1.location.x! - obj2.location.x! === -(obj1.location.y! - obj2.location.y!)) &&
            (obj1.location.x! - obj3.location.x! === -(obj1.location.y! - obj3.location.y!))
          ) {
            return true;
          }
        }
      }
    }
  
    return false;
  }
}

