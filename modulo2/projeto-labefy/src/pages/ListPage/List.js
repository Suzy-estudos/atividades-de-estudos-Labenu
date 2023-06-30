import React from "react";
import styled from "styled-components";
import axios from "axios";
import PlaylistDetail from "../PlaylistDetail/PlaylistDetail";

const DeleteButton = styled.span`
  color: red;
  cursor: pointer;
`;

const axiosConfig = {
  headers: {
    Authorization: "suzy-chiconi-aragon"
  }
};

class List extends React.Component {
  state = {
    lists: [],
    paginaInicial: "playlists",
    playlistId: "",
    name: ""
  };

  componentDidMount() {
    this.buscarPlaylist();
  }

  buscarPlaylist = () => {
    axios
      .get(
        "https://us-central1-labenu-apis.cloudfunctions.net/labefy/playlists/search?name=string",
        axiosConfig
      )
      .then(response => {
        this.setState({ playlists: response.data });
      });
  };

  handlePlaylistDeletion = playlistId => {
    if (window.confirm("Tem certeza que deseja apagar a playlist?")) {
      axios
        .delete(
          `https://us-central1-labenu-apis.cloudfunctions.net/labefy/playlists/:playlistId/${playlistId}`,
          axiosConfig
        )
        .then(() => {
          this.buscarPlaylist();
        })
        .catch(event => {
          alert("Tem certeza que deseja deletar essa playlist?");
        });
    }
  };

  changePage = playlistId => {
    if (this.state.paginaInicial === "playlists") {
      this.setState({ paginaInicial: "playlistDetail", playlistId: playlistId });
    } else {
      this.setState({ paginaInicial: "playlists", playlistId: "" });
    }
  };

  handlePlaylistChange = event => {
    const novaPlaylistValue = event.target.value;

    this.setState({ name: novaPlaylistValue });
  };

  handleSearchPlaylist = () => {
    axios
      .get(
        `https://us-central1-labenu-apis.cloudfunctions.net/labefy/playlists/${this.state.playlists
        }`,
        axiosConfig
      )
      .then(response => {
        this.setState({ playlists: response.data });
      })
      .catch(error => {
        alert("Erro ao criar a playlist");
        console.log(error);
      });
  };

  render() {
    return (
      <div>
        {this.state.paginaInicial === "playlists" ? (
          <div>
            <ul>
              {this.state.playlists.length === 0 && <div>Carregando...</div>}
              {this.state.playlists.map(user => {
                return (
                  <li>
                    <span onClick={() => this.changePage(List.id)}>
                      {List.name}
                    </span>
                    <DeleteButton
                      onClick={() => this.handlePlaylistDeletion(List.id)}
                    >
                      Deletar &#10060;
                    </DeleteButton>
                  </li>
                );
              })}
            </ul>
            <hr />
            <h4>Buscar playlist</h4>
            <input
              placeholder="Nome playlist"
              type="text"
              value={this.state.name}
              onChange={this.handlePlaylistChange}
            />
            <button onClick={this.handleSearchPlaylist}>Confirmar</button>
          </div>
        ) : (
          <playlistsDetail playlistId={this.state.playlistId} changePage={this.changePage} />
        )}
      </div>
    );
  }
}

export default List;