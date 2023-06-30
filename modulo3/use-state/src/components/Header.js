export function Header(props) {
    return (
        <><h1>Post</h1>
        <section>
            <img src={props.userFoto} alt="foto usuário" />
            <p>{props.userName}</p>
        </section></>
    )
}