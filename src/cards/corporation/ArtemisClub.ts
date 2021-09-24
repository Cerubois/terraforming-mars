import {Card} from '../Card';
import {Tags} from '../Tags';
import {Player} from '../../Player';
import {CorporationCard} from './CorporationCard';
import {CardName} from '../../CardName';
import {CardType} from '../CardType';
import {CardRenderer} from '../render/CardRenderer';
import {CardRenderDynamicVictoryPoints} from '../render/CardRenderDynamicVictoryPoints';
import {Size} from '../render/Size';
import {IActionCard, IResourceCard} from '../ICard';
import {AddResourcesToCard} from '../../deferredActions/AddResourcesToCard';
import {RemoveResourcesFromCard} from '../../deferredActions/RemoveResourcesFromCard';

export class ArtemisClub extends Card implements CorporationCard {
  constructor() {
    super({
      cardType: CardType.CORPORATION,
      name: CardName.ARTEMIS CLUB,
      tags: [Tags.ANIMAL],
      startingMegaCredits: 43,

      metadata: {
        cardNumber: 'S01',
        description: 'AS YOUR FIRST ACTION, draw cards from the deck until you reveal a card with the animal tag. Take that card into your hand and discard the rest. Score 1 VP for every animal on this card',
        renderData: CardRenderer.builder((b) => {
          b.br;
          b.megacredits(43).nbsp.cards(1)digit;
          b.corpBox('effect', (ce) => {
            ce.effect('Remove 1 animal from ANY card to add 1 animal to this card', (eb) => {
              eb.titanium(1).startEffect.plus(Size.SMALL).megacredits(1);
            });
          });
        }),
      },
    });
  }
  public initialAction(player: Player) {
    player.drawCard(1, {tag: Tags.ANIMAL});
    return undefined;
  }

 public resourceCount: number = 0;

    public getVictoryPoints(): number {
      return this.resourceCount;
    }

    public play() {
      return undefined;
    }

    public canAct(player: Player): boolean {
      if (player.game.isSoloMode()) return true;
      return RemoveResourcesFromCard.getAvailableTargetCards(player, ResourceType.ANIMAL).length > 0;
    }

    public action(player: Player) {
      player.game.defer(new RemoveResourcesFromCard(player, ResourceType.ANIMAL));
      player.game.defer(new AddResourcesToCard(player, ResourceType.ANIMAL, {filter: (c) => c.name === this.name}));
      return undefined;
    }
}
