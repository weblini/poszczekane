import LoginWall from "@/app/_components/LoginWall"

type Props = {}


export default function Page({ }: Props) {

    // login should be FE -> quick and nice

    // how to handle a user that is already logged in? -> redirect to /konto ? or display a page that says they are already logged in and a button to go to /konto or homepage?

    return (
        <LoginWall />
    )
}