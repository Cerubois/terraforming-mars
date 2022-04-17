import {Message} from '../Message';
import {CardType} from '../cards/CardType';
import {CardResource} from '../CardResource';
import {Units} from '../Units';
import {CardName} from '../CardName';
import {Resources} from '../Resources';
import {CardDiscount} from '../cards/ICard';
import {Tags} from '../cards/Tags';

export interface CardModel {
    name: CardName;
    resources: number | undefined;
    // TODO(kberg): Rename to cardResource. Actually, remove it altogether, and rely on the JSON implementation.
    resourceType: CardResource | undefined;
    calculatedCost?: number;
    discount?: CardDiscount,
    cardType: CardType;
    isDisabled: boolean;
    warning?: string | Message;
    reserveUnits: Readonly<Units>; // Written for The Moon, but useful in other contexts.
    bonusResource?: Array<Resources>; // Used with the Mining cards and Robotic Workforce
    cloneTag?: Tags; // Used with Pathfinders
    startingMegacredits?: number;
}
