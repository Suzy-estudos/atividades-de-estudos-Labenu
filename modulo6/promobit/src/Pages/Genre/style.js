import styled from 'styled-components'

export const Container = styled.div`
  align-items: center;
  background-color: #03577b;
`
export const Content = styled.div`
  max-width: 500vw;
  max-height: 100vh;
  margin: 0 auto;
  text-align: center;
  padding: 12rem 2rem;

  h1 {
    font-size: 2.5rem;
    font-weight: bold;
    line-height: 3.5rem;
    color: white;
  }

  h2 {
    font-size: 1.8rem;
    font-weight: bold;
    font-weight: 700;
    line-height: 3.5rem;
    margin-top: 1rem;
    margin-bottom: 1rem;
    color: white;
  }

  @media (max-width: 720px) {
    text-align: center;
    justify-content: center;
    align-items: center;
    margin: 0 3rem;
  }
`

export const GenreButton = styled.button`
  height: 2rem;
  width: auto;
  padding: 0.5rem 1rem;
  margin-left: 0.7rem;
  margin-inline-start: 0.5rem;
  margin-bottom: 0.75rem;
  border: 0;
  border-radius: 0.25rem;
  display: inline-flex;
  align-items: center;
  font-size: 1rem;
  font-weight: 700;
  background-color: ${props => (props.marked ? '#17d2af' : '#fff')};
  color: ${props => (props.marked ? '#FFFFFF' : '#323232')};  
  `