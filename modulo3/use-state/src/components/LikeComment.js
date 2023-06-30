import { useState } from 'react';

export function LikeComment(props) {
    const [like, setLike] = useState(false)
    const [commented, setCommented] = useState(false)
    const [comments, setComments] = useState([])
    const [numberComments, setNumberComments] = useState(0)
    const [inputValue, setInputValue] = useState("")

    const changeLike = () => {
        setLike(!like)
    }

    const changeNumberLike = () => {
        if (like === true) {
            return 1
        } else {
            return 0
        }
    }

    const addComments = () => {
        setCommented(!commented)
    }

    const onChangeComment = (event) => {
        setInputValue(event.target.value)
    }

    const sendComment = (comment) => {
        const listComments = [... comments, comment]
        setComments(listComments)
        setCommented(false)
        setNumberComments(numberComments = 1)
        setInputValue("") 
    }

    const boxComments = commented ? (
        <section>
            <input
                placeholder='Digite seu comentário'
                value={inputValue}
                onChange={onChangeComment}
            />
            <button onClick={() => { sendComment(inputValue) }}>
                Enviar
            </button>
        </section>
    )
        : (
            comments.map((comment, index) => {
                return (
                    <div key={index}>
                        <p>{comments}</p>
                    </div>
                )
            })
        )
    return (
        <><section>
            <p>Curtidas: {changeNumberLike()}</p>
            <button onClick={() => changeLike()}>{like === false ? "Like" : "Dislike"}</button>
        </section>
        <section>
            <div>
                <p>Comentários: {numberComments}</p>
                <button onClick={addComments}>{commented === false ? "Adicionar comentário" : "Fechar comentário"}</button>
            </div>
            {boxComments}
        </section></>
    )
}