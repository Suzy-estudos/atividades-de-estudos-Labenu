import React from "react";
import styled from "styled-components";
import axios from "axios";

const axiosConfig = {
  headers: {
    Authorization: "suzy-chiconi-aragon"
  }
};

class PlaylistDetail extends React.Component {
  state = {
    playlistDetail: {},
    playlistEdition: "editButton",
    name: ""    
  };

  componentDidMount() {
    this.getPlaylistDetail();
  }

  getPlaylistDetail = () => {
    axios
      .get(
        `https://us-central1-labenu-apis.cloudfunctions.net/labefy/playlists/${
          this.props.playlistId
        }`,
        axiosConfig
      )
      .then(response => {
        this.setState({ playlistDetail: response.data });
      })
      .catch(err => {
        console.log(err);
      });
  };

  changePlaylistEditionField = () => {
    if (this.state.playlistEdition === "editButton") {
      this.setState({ playlistEdition: "playlistEditForm" });
    } else {
      this.setState({ playlistEdition: "editButton" });
    }
  };

  handlePlaylistChange = event => {
    const novaPlaylist = event.target.value;

    this.setState({ name: novaPlaylist });
  };

  handleCreatePlaylist = () => {
    const body = {
      name: this.state.name,
    };

    axios
      .put(
        `https://us-central1-labenu-apis.cloudfunctions.net/labefy/playlists/${
          this.props.playlistId
        }`,
        body,
        axiosConfig
      )
      .then(() => {
        this.setState({ name: "" });
        this.getPlaylistDetail();
        this.changePlaylistEditionField();
        alert(`Playlist ${this.state.name} editada com sucesso!`);
      })
      .catch(error => {
        alert("Erro ao criar a playlist");
        console.log(error);
      });
  };

  render() {
    const playlistEdition =
      this.state.playlistEdition === "editButton" ? (
        <button onClick={this.changePlaylistEditionField}>Editar playlist</button>
      ) : (
        <div>
          <input
            placeholder="Playlist"
            type="text"
            value={this.state.name}
            onChange={this.handlePlaylistChange}
          />
          
          <button onClick={this.handleCreatePlaylist}>Salvar</button>
        </div>
      );

    return (
      <div>
        <div>
          <p>{this.state.playlistDetail.name}</p>
        </div>
        <div>{playlistEdition}</div>
        <hr />
        <button onClick={this.props.changePage}>
          Voltar para tela de Playlists
        </button>
      </div>
    );
  }
}

export default PlaylistDetail;