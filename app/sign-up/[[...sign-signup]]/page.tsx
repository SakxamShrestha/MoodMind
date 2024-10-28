import {SignUp} from "@clerk/nextjs";
const SignUpPage = () => {
    return <SignUp afterSignOutUrl="/new-user" redirectUrl="/new-user"/>

}

export default SignUp; 