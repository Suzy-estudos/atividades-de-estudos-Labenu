import { format } from 'date-fns';
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import GlobalStateContext from "../global/GlobalStateContext";
import { requestChangePostVote, requestCreatePostVote, requestDeletePostVote } from '../services/requests';
import { goToPostDetailsPage } from '../routes/coordinator';
import styled from 'styled-components';

function PostCard(props) {
    const { id, userId, title, body, createdAt, voteSum, commentCount } = props.post;

    const date = createdAt && format(new Date(createdAt), 'dd/MM/yyyy');

    return (
        <article>
            <h3>{title}</h3>
            <span><b>Autor: </b>{userId}</span>
            <p>Criado em {date}</p>
            <img src={"https://picsum.photos/200/300?random=" + id} alt="Imagem aleatória do post" />     
            <p><b>Descrição: </b>{body}</p>
            <p>Votos: {voteSum ? voteSum : 0}</p>
            <button>Votar em "Não Gostei"</button>
            <br />
            <button>Votar em "Gostei"</button>
            <p>Comentários: {commentCount ? commentCount : 0}</p>
            <button>Ver comentários</button>
            <hr />
        </article>

const MainPosts = styled.main`
    padding:1em;
    margin: 1em;
    border-radius: 1rem;
    box-shadow: #e88300 0.1em 0.1em 1em;
    width: 60vw;
    height: 145vh;

    .user {
        display: flex;
        justify-content: center;
    }

    .user-photo {
        width: 2.5rem;
        height: 2.5rem;
        margin-top: 0.5rem
    }

    .posts {
        align-items: center;
        margin: 0.3rem;
        border-radius: 1rem;
    }

    .post-photo{
        width: 20em;
        height: 20em;
        border-radius: 1rem;
    }

    .cards {
        align-items: center;
    }
`

function PostCard(props) {
    const navigate = useNavigate();

    const { setters, getters } = useContext(GlobalStateContext);

    const [isDownVoted, setIsDownVoted] = useState(false);

    const [isUpVoted, setIsUpVoted] = useState(false);

    const { setPost } = setters;

    const { getPosts } = getters;
    
    const { id, username, title, body, createdAt, voteSum, commentCount, userVote } = props.post;

    const date = createdAt && format(new Date(createdAt), 'dd/MM/yyyy');

        useEffect(() => {
        if (userVote) {
            userVote === 1 ? setIsUpVoted(true) : setIsDownVoted(true);
        };
    }, [userVote]);

    const goToComments = () => {
        setPost(props.post);
        goToPostDetailsPage(navigate, id);
    };

    const chooseVote = (typeVote) => {
        if (typeVote === "up") {
            if (isDownVoted) {
                requestChangePostVote(id, 1, getPosts);
                setIsUpVoted(true);
                setIsDownVoted(false);
            } else {
                requestCreatePostVote(id, 1, getPosts);
                setIsUpVoted(true);
            };
        } else {
            if (isUpVoted) {
                requestChangePostVote(id, -1, getPosts);
                setIsDownVoted(true);
                setIsUpVoted(false);
            } else {
                requestCreatePostVote(id, -1, getPosts);
                setIsDownVoted(true);
            };
        };
    };

    const removeVote = (typeVote) => {
        requestDeletePostVote(id, getPosts);
        typeVote === "up" ? setIsUpVoted(false) : setIsDownVoted(false);
    };

    const showVoteButtons = props.isFeed && (
        <>
            {userVote && isDownVoted ?
                <button onClick={() => removeVote("down")}>Remover voto "Não Gostei"</button>
                : <button onClick={() => chooseVote("down")}>
                    {isUpVoted ? `Mudar voto para "Não Gostei"` : `Votar em "Não Gostei"`}
                </button>
            }
            <br />
            {userVote && isUpVoted ?
                <button onClick={() => removeVote("up")}>Remover voto "Gostei"</button>
                : <button onClick={() => chooseVote("up")}>
                    {isDownVoted ? `Mudar voto para "Gostei"` : `Votar em "Gostei"`}
                </button>
            }
        </>
    );

    return (
        <MainPosts>
        <article className='posts'>
            <section className='user'>
            <img className='user-photo'
            src="https://logodownload.org/wp-content/uploads/2018/02/reddit-logo-16.png"
            alt="imagem usuário">                
            </img>
            <h3><b>{username}</b></h3>
            </section>
            <h3>{title}</h3>            
            <img className='post-photo'  src={"https://picsum.photos/200/300?random=" + id} alt="Imagem aleatória do post" />     
            <h3>{body}</h3>
            <p><i>Criado em {date}</i></p>
            <p>Votos: {voteSum ? voteSum : 0}</p>
            {showVoteButtons}
            <p>Comentários: {commentCount ? commentCount : 0}</p>
            {props.isFeed && <button onClick={goToComments}>Ver comentários</button>}            
        </article>
        </MainPosts>
    );
};

export default PostCard;