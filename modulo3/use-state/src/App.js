import { useState } from "react";
import { Header } from './components/Header';
import { Post } from './components/Post';
import userFoto from './components/img/Suzy_perfil.jpeg';
import postFoto from './components/img/Kit_RD.jpeg';
import { LikeComment } from './components/LikeComment';

function App() {
    return (
        <main>
            <Header
            userFoto = {userFoto}
            userName = "Suzy"
            />
            <hr />
            <Post
            postFoto = {postFoto}
            subtitle = "Gratidão e imenso orgulho em começar minha trilha em programação/desenvolvimento com a RD!"
            />
            <hr />
            <LikeComment />
        </main>
    )
}

export default App
