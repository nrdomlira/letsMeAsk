import { Link } from 'react-router-dom';
import illustationImg from '../assets/images/illustration.svg';
import logoImg from '../assets/images/logo.svg';

import { Button } from '../components/Button';

import '../styles/auth.scss';

export function NewRoom() {
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

                    <h2>Crie uma nova sala</h2>
                    <form>
                        <input type="text" placeholder="Nome da sala"></input>
                        <Button type="submit">Criar sala</Button>
                    </form>
                    <p>Quer entrar em uma sala já existente?<Link to="/">Clique aqui</Link></p>
                </div>
            </main>
        </div>
    )
}