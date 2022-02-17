import {IProjectCard} from '../IProjectCard';
import {Tags} from '../Tags';
import {Card} from '../Card';
import {CardType} from '../CardType';
import {Player} from '../../Player';
import {Resources} from '../../Resources';
import {CardName} from '../../CardName';
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
        description: 'Increase your M€ production 1 step for each space tag your OPPONENTS have.',
      },
    });
  }

    public play(player: Player) {
        //Find opponent with most space tags
        //let allOpps = player.game.getPlayers().filter((aPlayer) => aPlayer !== player)
        //let mostOpp = allOpps.
        //    .map((opponent) => opponent.getTagCount(Tags.SPACE, 'raw'));

         const amount = player.game.getPlayers()
              .filter((aPlayer) => aPlayer !== player)
              .map((opponent) => opponent.getTagCount(Tags.SPACE, 'raw'))
              .reduce((most, opp) => (most || 0) > opp ? most : opp, 0); // Testing this line to see if reduce works like this?
              player.addProduction(Resources.MEGACREDITS, amount, {log: true});
         return undefined;
    }

}
