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
      startingMegaCredits: 39,
      initialActionText: 'Draw a card with an animal tag',

      metadata: {
        cardNumber: 'S01',
        description: 'You start with 39 M€, and 1 plant production. As your first action, reveal cards until you have revealed an animal tag. Take it and discard the rest.',
        renderData: CardRenderer.builder((b) => {
          b.production((pb) => pb.plants(2)).megacredits(39).nbsp.cards(1);
          b.corpBox('effect', (ce) => {
            ce.vSpace(Size.LARGE);
            ce.effect(undefined, (eb) => {
              eb.animal(1).played.any.startEffect;
              eb.megacredits(1).any.asterix();
            });
            ce.vSpace();
            ce.effect('when an animal tag is played, incl. this, THAT PLAYER gains 1 M€, you gain 1 M€.', (eb) => {
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

  private _onCardPlayed(player: Player, card: IProjectCard | CorporationCard){
    if (card.tags.includes(Tags.ANIMAL) === false) {
      return undefined;
    }
    const gainPerAnimal = 1;
    const animalTagsCount = card.tags.filter((tag) => tag === Tags.ANIMAL).length;
    const megacreditsGain = animalTagsCount * gainPerAnimal;

     const getMegacredits = new SelectOption(`Gain ${megacreditsGain} MC`, 'Gain M€', () => {
      player.addResource(Resources.MEGACREDITS, megacreditsGain, {log: true});
      return undefined;
    });

    // Artemis owner get 1M€ per animal tag
    player.game.getCardPlayer(this.name).addResource(Resources.MEGACREDITS, megacreditsGain, {log: true});

    // Card player gets 1 M€ per animal tag  
      player.addResource(Resources.MEGACREDITS, megacreditsGain, {log: true});
      return undefined;
  }

  public play() {
    return undefined;
  }
}
