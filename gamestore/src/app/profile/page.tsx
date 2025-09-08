import {getServerSession} from "next-auth";
import {authOptions} from "../../config/auth";
import ProfilePageClientComponent from "./ProfilePageClientComponent";


export default async function ProfilePageServerComponent () {

    const session = await getServerSession(authOptions)
    return (
        <ProfilePageClientComponent session={session} />
    )
}