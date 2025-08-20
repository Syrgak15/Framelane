import {serverStore} from "../../serverStore/index";
import {getMainPageCollectionsData} from "../../features/slices/mainPageReducer";
import MainPageClient from "./MainPageClient";

export default async function MainPage() {
    console.log(serverStore);
    await serverStore.dispatch(getMainPageCollectionsData());
    const state = serverStore.getState();
    console.log(state);
    // return <MainPageClient initialValue={state}/>
}
