import styled from "styled-components";

export const StyledHeroMainWrapper = styled.div`
    width: 100%;
    min-height: 100vh;
    background: linear-gradient(135deg, #f8fafc 0%, #ffe0e9 100%);
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 40px 0;
`

export const WidgetGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
    gap: 32px;
    width: 90%;
    max-width: 1100px;
    margin-top: 32px;
`

export const WidgetCard = styled.div`
    background: linear-gradient(120deg, #fff 60%, #ffe0e9 100%);
    box-shadow: 0 4px 24px rgba(0,0,0,0.08), 0 1.5px 6px rgba(255,169,169,0.12);
    border-radius: 18px;
    padding: 32px 24px;
    display: flex;
    flex-direction: column;
    align-items: center;
    transition: transform 0.18s, box-shadow 0.18s;
    cursor: pointer;
    &:hover {
        transform: translateY(-6px) scale(1.03);
        box-shadow: 0 8px 32px rgba(255,169,169,0.18), 0 2px 8px rgba(0,0,0,0.10);
    }
`

export const WidgetPreview = styled.div`
    margin-bottom: 18px;
    color: #ff6f91;
`

export const WidgetName = styled.h2`
    font-size: 1.4rem;
    font-weight: 700;
    margin: 0 0 8px 0;
    color: #22223b;
`

export const WidgetDescription = styled.p`
    font-size: 1rem;
    color: #6c6c80;
    margin: 0 0 18px 0;
    text-align: center;
`

export const ViewDetailsButton = styled.button`
    background: linear-gradient(90deg, #ff6f91 0%, #ffb86c 100%);
    color: #fff;
    border: none;
    border-radius: 8px;
    padding: 10px 22px;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    box-shadow: 0 2px 8px rgba(255,111,145,0.10);
    transition: background 0.18s, box-shadow 0.18s;
    &:hover {
        background: linear-gradient(90deg, #ffb86c 0%, #ff6f91 100%);
        box-shadow: 0 4px 16px rgba(255,111,145,0.18);
    }
`

