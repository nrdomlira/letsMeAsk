import { useHistory } from 'react-router-dom';


import illustationImg from '../assets/images/illustration.svg';
import logoImg from '../assets/images/logo.svg';
import googleIcon from '../assets/images/google-icon.svg';

import '../styles/auth.scss';
import { Button } from '../components/Button';
import { useAuth } from '../hooks/useAuth';

export function Home() {
    const history = useHistory();
    const { user, signInWithGooglePopup } = useAuth();

    async function handleCreateRoom() {
        if (!user) {
            await signInWithGooglePopup()
        }

        history.push('/rooms/new');
    }

    return (
        <div id="page-auth">
            <aside>
                <img src={illustationImg} alt="imagem de ilustração" />
                <strong>Toda pergunta tem uma resposta.</strong>
                <p>Aprenda e compartilhe conhecimento com outras pessoas</p>
            </aside>

            <main>
                <div className="main-content">
                    <img src={logoImg} alt="Letmeask Logo" />
                    <button className="create-room" onClick={handleCreateRoom}>
                        <img src={googleIcon} alt="google-icone" />
                        Crie sua sala com o Google
                    </button>
                    <div className="separator">ou entre em uma sala</div>
                    <form>
                        <input type="text" placeholder="Digite o código da sala"></input>
                        <Button type="submit">Entrar na sala</Button>
                    </form>
                </div>
            </main>
        </div>
    );
}