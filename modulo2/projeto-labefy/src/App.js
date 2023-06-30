import React from "react"
import MusicsPage from "./pages/MusicsPage/Musics";
import PlaylistDetail from "./pages/PlaylistDetail/PlaylistDetail";
import PlaylistsPage from "./pages/PlaylistsPage/Playlist";
import List from "./pages/ListPage/List";

export default class App extends React.Component {
state = {
  telaAtual: "playlists"
}

selectPage = () => {
  switch (this.state.telaAtual) {
    case "playlists":
      return <PlaylistsPage />
    case "lista":
      return <List />
    case "detalhes":
      return <PlaylistDetail />
    case "musicas":
      return <MusicsPage />
    default:
      return <PlaylistsPage />
  }
}

  render(){
    return (
      <div>
        {this.selectPage()}
      </div>
    );
  }
}