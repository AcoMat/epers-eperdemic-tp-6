import { signInWithPopup } from "firebase/auth"
import { auth, provider } from "../../configs/firebase";


export default function SignInGoogle() {
    
    const handleClick = async () => {
        try {
            const result = await signInWithPopup(auth,provider);
            localStorage.setItem("token",result.user.getIdToken);
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div>
            <button onClick={handleClick}>Iniciar Sesion con Google</button>
        </div>
    )
}