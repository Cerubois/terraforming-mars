import {IProjectCard} from '../IProjectCard';
import {Tags} from '../../common/cards/Tags';
import {Card} from '../Card';
import {CardType} from '../../common/cards/CardType';
import {Player} from '../../Player';
import {Resources} from '../../common/Resources';
import {CardName} from '../../common/cards/CardName';
import {CardRenderer} from '../render/CardRenderer';
import {all, played} from '../Options';

export class TollStation extends Card implements IProjectCard {
  constructor() {
    super({
      cardType: CardType.AUTOMATED,
      name: CardName.TOLL_STATION,
      tags: [Tags.SPACE],
      cost: 12,

      metadata: {
        cardNumber: '099',
        renderData: CardRenderer.builder((b) => {
          b.production((pb) => {
            pb.megacredits(1).slash().space({played, all}).asterix();
          });
        }),
        description: 'Increase your M€ production 1 step for each space tag an OPPONENT has. (Will always target the highest)',
      },
    });
  }
  public play(player: Player) {
    const amount = player.game.getPlayersInGenerationOrder()
      .filter((aPlayer) => aPlayer !== player)
      .map((opponent) => opponent.getTagCount(Tags.SPACE, 'raw'))
      .reduce((most, opp) => (most || 0) > opp ? most : opp, 0); // Balance change: Total Space tags from all opponents -> Highest amount of Space tags from opponents.
    player.addProduction(Resources.MEGACREDITS, amount, {log: true});
    return undefined;
  }
}
