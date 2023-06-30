import { useNavigate } from "react-router-dom";
import { goToHomePage } from "../routes/coordinator";
import styled from "styled-components";

function ErrorPage() {
    const navigate = useNavigate();

    return (
        <>
            <h1>Página não encontrada!</h1>
            <button onClick={() => goToHomePage(navigate)}>Voltar para página inicial</button>
        </>
    );
}

export default ErrorPage;