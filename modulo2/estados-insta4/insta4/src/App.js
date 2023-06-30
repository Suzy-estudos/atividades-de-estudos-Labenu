import React from 'react';
import styled from 'styled-components'
import Post from './components/Post/Post';
import Post2 from './components/Post2/Post2'

const MainContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`

class App extends React.Component {
  render() {
    return (
      <MainContainer>
        <Post
          nomeUsuario={'paulinha'}
          fotoUsuario={'https://picsum.photos/50/50'}
          fotoPost={'https://picsum.photos/200/150'}
        />
      </MainContainer>
    );
  }
}

class App extends React.Component {
  render() {
    return (
      <MainContainer>
        <Post2
          nomeUsuario={'paulinha'}
          fotoUsuario={'https://picsum.photos/50/50'}
          fotoPost={'https://picsum.photos/200/150'}
        />
  state = {

    listaUsuarios: [
      {
        nome: 'paulinha',
        fotoUsuario: 'https://picsum.photos/50/50',
        fotoPost: 'https://picsum.photos/200/150'
      },
      {
        nome: 'Mona',
        fotoUsuario: 'https://www.olharconceito.com.br/imgsite/noticias/selfie1.png',
        fotoPost: 'https://razoesparaacreditar.com/wp-content/uploads/2020/09/koty-nuvem-e1600311936794.jpg'
      },
      {
        nome: 'Vicking',
        fotoUsuario: 'https://www.oversodoinverso.com.br/wp-content/uploads/2019/12/Alguem-photoshops-animais-em-coisas-aleatorias-e-a-Internet-adora-40-fotos-OT7UAyYtQ8.jpg',
        fotoPost: 'https://www.oversodoinverso.com.br/wp-content/uploads/2019/10/coisas-que-n%C3%A3o-s%C3%A3o-gatos-como-gatos-0.jpg'
      }
    ],

    valorInputNome: "",
    valorInputFotoUsuario: "",
    valorInputFotoPost: "",
    form: ""

  };

  // onSubmitForm = (event) => {
  //   event.preventDefault()

  adicionaPost = () => {
    const novoNome = {
      nome: this.state.valorInputNome,
      fotoUsuario: this.state.valorInputFotoUsuario,
      fotoPost: this.state.InputFotoPost
    };

    const novaListaUsuarios = [...this.state.listaUsuarios];
    novaListaUsuarios.push({
    });

    this.setState({ listaUsuarios: novaListaUsuarios })

  }

  onChangeInputNome = (event) => {
    this.setState({ valorInputNome: event.target.value });
  };
  onChangeInputFotoUsuario = (event) => {
    this.setState({ valorInputFotoUsuario: event.target.value });
  };
  onChangeInputFotoPost = (event) => {
    this.setState({ valorInputFotoPost: event.target.value })
  };
  onChangeInputForm = (event) => {
    this.setState({ valorInputForm: event.target.value })
  }

  render() {
    return (
      <MainContainer>
        <form onSubmit={this.onSubmitForm}>
          <label for="">
            <input
              name="Nome"
              placeholder='Usuário'
              value={this.state.nomeInput}
              onChange={this.onChangeNome}
            />
          </label>

          <label for="">
            <input
              name="fotoUsuario"
              placeholder='Foto do Usuario'
              value={this.state.nomeInput}
              onChange={this.onChangeNome}
            />
          </label>

          <label for="">
            <input
              name="fotoPost"
              placeholder='Foto Postada'
              value={this.state.nomeInput}
              onChange={this.onChangeNome}
            />
          </label>

          <button>Adicionar</button>
        </form>

        {this.state.listaUsuarios.map((usuario) => {
          return <Post
            nomeUsuario={usuario.nome}
            fotoUsuario={usuario.fotoUsuario}
            fotoPost={usuario.fotoPost}
          />
        })}
      </MainContainer>
    );
  }
}

export default App;
