import * as alt from 'alt-client';
import * as native from 'natives';
import { Events_Misc } from '../../shared/enums/events';
import { sleep } from '../utility/sleep';

alt.on('connectionComplete', handleConnectionComplete);
alt.onServer(Events_Misc.FetchQT, handleFetchQT);

async function handleConnectionComplete() {
    native.startAudioScene(`CHARACTER_CHANGE_IN_SKY_SCENE`);
    native.doScreenFadeOut(0);
    native.triggerScreenblurFadeOut(0);
}

async function handleFetchQT() {
    const instance = alt.LocalStorage.get();
    const qt = instance.get('qt');

    if (!qt) {
        alt.emitServer(Events_Misc.DiscordTokenNone);
        return;
    }

    await sleep(250);

    alt.emitServer(Events_Misc.DiscordToken, qt);
}
