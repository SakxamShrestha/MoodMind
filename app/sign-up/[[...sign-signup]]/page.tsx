import {SignUp} from "@clerk/nextjs";
const SignUpPage = () => {
    return <SignUp afterSignOutUrl="/new-user" forceRedirectUrl="/new-user"/>

}

export default SignUp; 