import styled from "styled-components";

export const View = styled.div`
    width: fit-content;
    display: flex;
    transform: ${props => props.move};
    transition: 0.5s;
`;

export const Slide = styled.div`
    /*background-color: rgba(0,0, 0, 0.7); */
    background-image: url(${props => props.image});
    background-repeat: no-repeat; /* Eliminates image repetition */
    background-size: 100% 100%; /* (image-width image-height) */
    background-position: center; /*Centre's image */
    /*background-blend-mode: multiply;*/ /*blends background-image with 
    -colour */ 
    width: ${props => props.width};
    margin: ${props => props.margin};
    height: var(--slide-height);
    border-radius: 5px;
    display: flex;
    align-items: center;
    transition: transform 0.5s; 
    &:hover {
        transform: scale(1.03);
    }
    &:hover .slide-banner {
        visibility: visible;
    }
    
`;

export const DescriptionPanel = styled.div`
    display: ${props => props.display} !important; /* Prevents styled-components from ignoring this line. */
    background-image: url(${props => props.img});
    background-repeat: no-repeat; /* Eliminates image repetition */
    background-size: 100% 100%; /* (image-width image-height) */
    background-position: center; /*Centre's image */
    background-color: rgba(0, 0, 0, 0.7);
    background-blend-mode: multiply; /*blends background-image with 
    -colour */
    display: flex;
    flex-direction: column;
    align-items: center;
    color: white;
    margin-top: 5px;
    padding: 10px;
    border-radius: 5px;
    & p, h3 {
        text-align: center;
        margin-left: 0px;
    }
`;

export const LeftArrow = styled.button`
    visibility: ${props => props.visibility};
`;

export const RightArrow = styled.button`
    visibility: ${props => props.visibility};
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