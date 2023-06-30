import styled from 'styled-components';

export const PaginateContainer = styled.div`
  .pagination {
    display: flex;
    flex-direction: row;
    color: #032541;
    list-style-type: none;
    padding: 12px;

    li {
      border-radius: 12px;
      a {
        margin: 0.5rem;
        cursor: pointer;
      }
    }
  }

  .break-me {
    cursor: default;
  }

  .active {
    border-color: transparent;
    font-weight: bold;
    color: #032541;
  }
`