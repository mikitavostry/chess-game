import { Cell } from "../Cell";
import { Colors } from "../Colors";
import { Figure, FigureNames } from "./Figure";
import blackLogo from '../../assets/black-king.png'
import whiteLogo from '../../assets/white-king.png'


export class King extends Figure {

    constructor(color: Colors, cell: Cell) {
        super(color, cell)
        this.logo = color === Colors.BLACK ? blackLogo : whiteLogo
        this.name = FigureNames.KING
    }

    canMove(target: Cell): boolean {
        if (!super.canMove(target)) {
            return false
        }

        for (let i = this.cell.x - 1; i < this.cell.x + 2; i++) {
            for (let j = this.cell.y - 1; j < this.cell.y + 2; j++) {
                if (target.x === i && target.y === j) {
                    return true
                }
            }
        }
        return false

    }
}