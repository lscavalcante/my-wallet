import styled  from 'styled-components';

interface ILegendsProps {
    color: string;
}

export const Container = styled.div`
    width: 48%;
    min-height: 260px;
    margin: 10px 0;

    background-color: ${props => props.theme.colors.tertiary};
    color: ${props => props.theme.colors.white};
    border-radius: 7px; 

    display: flex;

    @media(max-width:1200px) {
        display: flex;
        flex-direction: column;

        width: 100%;
        height: auto;
    }

`;

export const SideRight = styled.main`
    flex: 1;
    min-height: 150px;
    
    display: flex;
    justify-content: center;
    padding-top: 35px;
`;

export const SideLeft = styled.aside`
    flex:1;
    padding: 30px 20px;

    > h2 {
        margin-bottom: 10px;
        padding-left: 16px;
    }
`;

export const LegendContainer = styled.ul`
list-style: none;

max-height: 180px;
padding-right: 15px;

overflow-y: scroll;

::-webkit-scrollbar {
    width: 10px;
}

::-webkit-scrollbar-thumb {
    background-color: ${props => props.theme.colors.secondary};
    border-radius: 10px;
}

::-webkit-scrollbar-track {
    background-color: ${props => props.theme.colors.tertiary};
}

@media(max-width:1200px) {
        display: flex;
        flex-direction: row;

        height: auto;
    }

`;

export const Legend = styled.li<ILegendsProps>`

    display: flex;
    align-items: center;

    margin-bottom: 7px;

    padding-left: 16px;
   
   > div {
        background-color: ${props => props.color};
        height: 45px;
        width: 45px;
        border-radius: 3px;
        font-size: 14px;

        line-height: 45px;
        text-align: center;

   }

   > span {
       margin-left: 5px;
   }

   @media(max-width:1200px) {
           
        > div {
                height: 30px;
                width: 30px;
                
                font-size: 10px;
                line-height: 30px;

        }
    }
`;