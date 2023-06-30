import React from 'react';
import styled from 'styled-components'
import Post from './components/Post/Post';

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

        <Post
          nomeUsuario={'Mona'}
          fotoUsuario={'https://www.olharconceito.com.br/imgsite/noticias/selfie1.png'}
          fotoPost={'https://razoesparaacreditar.com/wp-content/uploads/2020/09/koty-nuvem-e1600311936794.jpg'}
        />

        <Post
          nomeUsuario={'Vicking'}
          fotoUsuario={'https://www.oversodoinverso.com.br/wp-content/uploads/2019/12/Alguem-photoshops-animais-em-coisas-aleatorias-e-a-Internet-adora-40-fotos-OT7UAyYtQ8.jpg'}
          fotoPost={'https://www.oversodoinverso.com.br/wp-content/uploads/2019/10/coisas-que-n%C3%A3o-s%C3%A3o-gatos-como-gatos-0.jpg'}
        />
      </MainContainer>
    );
  }
}

export default App;
