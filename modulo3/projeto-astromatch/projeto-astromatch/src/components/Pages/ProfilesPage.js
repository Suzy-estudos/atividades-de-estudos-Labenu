import axios from "axios"
import { useEffect, useState } from "react"
import { BASE_URL, ALUNO } from '../constants/urls.js'

function ProfilesPage() {

    const [profile, setProfile] = useState(undefined)

    useEffect(() => {
        getProfile()
    }, []
    )

    const getProfile = () => {
        const url = `${BASE_URL}/${ALUNO}/person`

        axios
            .get(url)
            .then((response) => {
                setProfile(response.data.profile)
            })
            .catch((error) => {
                alert("Tente novamente mais tarde")
                console.log(error.message)
            })
    }

    const chooseProfile = (profileId, choice) => {
        const url = `${BASE_URL}/${ALUNO}/choose-person`

        const body = {
            id: profileId, 
            choice: choice
        }

        axios
        .post(url, body)
        .then((response) => {
            if (body.choice && response.data.isMatch){
                alert("Deu match!")
            }
            getProfile()
        })
        .catch((error) => {
            console.log(error.message)
        })
    }

    const resetProfiles = () => {
        const url = `${BASE_URL}/${ALUNO}/clear`

        axios
        .put(url)
        .then(() => {
            alert("Perfis resetados com sucesso!")
            getProfile()
        })
        .catch((error) => {
            console.log(error.message)
        })
    }

    const profileCard = profile ? (
        <section>
            <img
                src={profile.photo}
                alt={profile["photo_alt"]}
                height={"240px"}
            >
            </img>
            <h3>{profile.name}, {profile.age}</h3>
            <p>{profile.bio}</p>

            <button onClick={() => chooseProfile(profile.id, false)}>Dislike</button>           
            <button onClick={() => chooseProfile(profile.id, true)}>Like</button>
        </section>
    ) : (
        <div>
        <h3>Acabaram os matches! Clique em 'Resetar Perfis" para reiniciar</h3>
        <button onClick={ () => resetProfiles() }>Resetar Perfis</button>
        </div>
    )

    return (
        <div>
            <h2>Perfis</h2>
            {profileCard}
         </div>
    )
}

export default ProfilesPage