import styled from "styled-components";

export const Head = styled.header`
    background-image: url(${props => props.image});
    background-repeat: no-repeat; /* Eliminates image repetition */
    background-size: 100% 100%; /* (image-width image-height) */
    background-position: center; /*Centre's image */
    background-color: black;
    min-height: 60vh;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`;

export const HeaderDescription = styled.div`
    background-color: var(--navbar-backgroundcolor);
    display: ${props => props.display} !important;
    flex-direction: column;
    color: white;
    padding: 0px 40px 10px 40px;
    & h3 {
        margin-left: 0px;
    }
`;

export const Navlinks = styled.ul`
    @media (max-width: 480px) {
        flex-direction: column;
        position: absolute;
        left: 100%;
        top: var(--navbar-height);
        background-color: var(--navbar-backgroundcolor);
        width: 90px;
        align-items: center;
        border-radius: 4px;
        transform: ${props => props.slide}; /* Transforms the element as specified
        */
        transition: transform ${props => props.duration}; /* (transition-property, -duration,
        -timing-function, -delay) */
    }
`;

export const Episodes = styled.div`
    display: ${props => props.display}
`;

export const Loader = styled.div`
    display: ${props => props.display};
    height: 1px;
    width: 100%;
    background-color: rgb(163, 163, 163);
    animation-name: load;
    animation-duration: 2s;
    animation-iteration-count: infinite;
    @keyframes load {
    from {transform: translateX(-100%)};
    to {transform: translateX(100%)}
    }
`; 