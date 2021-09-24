import {Tags} from '../Tags';
import {Player} from '../../Player';
import {IProjectCard} from '../IProjectCard';
import {Card} from '../Card';
import {CorporationCard} from '../corporation/CorporationCard';
import {ResourceType} from '../../ResourceType';
import {CardName} from '../../CardName';
import {CardType} from '../CardType';
import {CardRenderer} from '../render/CardRenderer';
import {Size} from '../render/Size';
import {Resources} from '../../Resources';
import {ResourceType} from '../../ResourceType';
import {IResourceCard} from '../ICard';

export class ArtemisSactuary extends Card implements CorporationCard {
  constructor() {
    super({
      cardType: CardType.CORPORATION,
      name: CardName.ARTEMIS_SACTUARY,
      tags: [Tags.ANIMAL.PLANT],
      startingMegaCredits: 41,
      initialActionText: 'Draw a card with an animal tag',

      metadata: {
        cardNumber: 'S01',
        description: 'You start with 41 M€, and 1 plant production. As your first action, reveal cards until you have revealed an animal tag. Take it and discard the rest.',
        renderData: CardRenderer.builder((b) => {
          b.production((pb) => pb.plants(2)).megacredits(41).nbsp.cards(1);
          b.corpBox('effect', (ce) => {
            ce.vSpace(Size.LARGE);
            ce.effect(undefined, (eb) => {
              eb.animal(1).played.any.startEffect;
              eb.megacredits(1).any.asterix();
            });
            ce.vSpace();
            ce.effect('When you play an animal tag gain 1 plant production. If you play a plant tag gain 1 SpaceBuck', (eb) => {
              eb.animals(1).played.any.startEffect;
              eb.megacredits(1);
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

  public onCardPlayed(player: Player, card: IProjectCard) {
    return this._onCardPlayed(player, card);
  }

  public onCorpCardPlayed(player: Player, card: CorporationCard) {
    return this._onCardPlayed(player, card);
  }

  private _onCardPlayed(player: Player, card: IProjectCard | CorporationCard) {
    for (const tag of card.tags) {
      if (tag === Tags.ANIMAL) {
        player.game.getCardPlayer(this.name).addProduction(Resources.PLANTS, 1, {log: true});
      }
    }
  private _onCardPlayed(player: Player, card: IProjectCard | CorporationCard) {
    for (const tag of card.tags) {
      if (tag === Tags.PLANT) {
        player.game.getCardPlayer(this.name).addResource(Resources.MEGACREDITS, 1, {log: true});
      }
    }
  }

  public play() {
    player.addProduction(Resources.PLANTS, 1);
    //player.addProduction(Resources.MEGACREDITS, 1)
    return undefined;
  }
}
