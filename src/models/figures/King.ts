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
                if (target.x === i && target.y === j && !this.isKingUnderAtttack(target)) {
                    return true
                }
            }
        }
        return false

    }

    isKingUnderAtttack(target: Cell): boolean {
        for (let i = 0; i < this.cell.board.cells.length; i++) {
            const row: Cell[] = this.cell.board.cells[i]
            console.log(row)
            for (let j = 0; j < row.length; j++) {
                const cell: Cell = row[j]
                if (cell.figure?.color !== this.color) {
                    switch (cell.figure?.name) {
                        case FigureNames.BISHOP:
                            if (cell.isEmptyDiagonal(target)) {
                                return true
                            }
                            break
                        case FigureNames.KNIGHT:
                            const dx = Math.abs(cell.x - target.x)
                            const dy = Math.abs(cell.y - target.y)
                            if ((dx === 1 && dy === 2) || (dx === 2 && dy === 1)) {
                                return true
                            }
                            break
                        case FigureNames.PAWN:
                            const direction = cell.figure?.color === Colors.BLACK ? 1 : -1

                            if (target.y === cell.y + direction
                                && (target.x === cell.x + 1 || target.x === cell.x - 1)
                                && cell.isEnemy(target)) {
                                return true
                            }
                            break
                        case FigureNames.QUEEN:
                            if (cell.isEmptyVertical(target)) {
                                return true
                            }
                            if (cell.isEmptyHorizontal(target)) {
                                return true
                            }
                            if (cell.isEmptyDiagonal(target)) {
                                return true
                            }
                            break
                        case FigureNames.ROOK:
                            if (cell.isEmptyVertical(target)) {
                                return true
                            }
                            if (cell.isEmptyHorizontal(target)) {
                                return true
                            }
                            break
                        case FigureNames.KING:
                            for (let i = cell.x - 1; i < cell.x + 2; i++) {
                                for (let j = cell.y - 1; j < cell.y + 2; j++) {
                                    if (target.x === i && target.y === j) {
                                        return true
                                    }
                                }
                            }
                            break
                    }
                }
            }
        }
        return false
    }
}