import { useNavigate } from "react-router-dom";
import { goToLoginPage } from "../routes/coordinator";
import logo_labeddit from "./img/logo_labeddit.png"
import styled from "styled-components";

const LabHeader = styled.header`
    margin: 0;
    padding: 4em;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    background-color: #e88300;
    height: 9vh;

    .logo {
        width: 23%;
        margin: 0;
    }

    .reddit {
        width: 2.5rem;
        height: 2.5rem;
    }
    `

function Header(props) {
    const navigate = useNavigate();

    const logout = () => {
        if (window.confirm("Tem certeza de que deseja sair?")) {
            localStorage.removeItem("token");
            localStorage.removeItem("userEmail");
            goToLoginPage(navigate);
            alert("Logout com sucesso!");
        };
    };

    return (
        <header>
            <h1>LabEddit</h1>
            {props.isProtected && (
                <>
                    <h3>Bem-vindo, {localStorage.getItem("userEmail")}!</h3>
                    <button onClick={logout}>Logout</button>
                </>
            )}
        </header>
        <LabHeader>
            <img className='logo' src={logo_labeddit} alt="logo labeddit"/>
            
            {props.isProtected && (
                <section>
                    <img className="reddit" 
                    src="https://logodownload.org/wp-content/uploads/2018/02/reddit-logo-16.png" 
                    alt="iamagem reddit"></img>
                    <h3>Bem-vindo(a), 
                    <br />                       
                    {localStorage.getItem("userEmail")}!</h3>
                    <button onClick={logout}>Logout</button>
                </section>
            )}
        </LabHeader>
    );
};

export default Header;