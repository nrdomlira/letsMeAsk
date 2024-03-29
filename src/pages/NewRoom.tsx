import { FormEvent, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import illustationImg from '../assets/images/illustration.svg';
import logoImg from '../assets/images/logo.svg';

import { Button } from '../components/Button';
import { useAuth } from '../hooks/useAuth';
import { database } from '../services/firebase';

import '../styles/auth.scss';

export function NewRoom() {
    const { user } = useAuth();
    const [newRoom, setNewRoom] = useState('');
    const history = useHistory();


    async function handleCreateRoom(event: FormEvent) {
        event.preventDefault();

        if (newRoom.trim() === '') {
            return;
        }

        const roomRef = database.ref('rooms');
        const firebaseRoom = await roomRef.push({
            title: newRoom,
            authorId: user?.uid
        })

        history.push(`/rooms/${firebaseRoom.key}`)
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

                    <h2>Crie uma nova sala</h2>
                    <form onSubmit={handleCreateRoom}>
                        <input type="text" placeholder="Nome da sala" onChange={event => { setNewRoom(event.target.value) }} value={newRoom}></input>
                        <Button type="submit">Criar sala</Button>
                    </form>
                    <p>Quer entrar em uma sala já existente?<Link to="/">Clique aqui</Link></p>
                </div>
            </main>
        </div>
    )
}