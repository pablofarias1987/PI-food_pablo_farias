import React from "react";
import Start from "../components/Start";
import { configure, shallow } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import isReact from "is-react";
import video from "../components/Styles/Video.mp4.webm"
import plate from "../components/Styles/Plate.png"

configure({ adapter: new Adapter() });

describe("<Start />", () => {
    const start = shallow(<Start/>)
    
    it('Es componente de clase', () => {
        expect(isReact.classComponent(Start)).toBeTruthy();
    })
    
    it('Debería renderizar dentro de un tag "video", otro tag "source" con el video provisto en la carpeta "../components/Styles/Video.mp4.webm"', () => {
        expect(start.find("source").at(0).prop("src")).toEqual(video);
    })

    it('Debería renderizar un "h1" con el texto "Henry PI Food"', () => {
        expect(start.find("h1").at(0).text()).toEqual("Henry PI Food");
    })

    it('Deberia renderizar un "Link" a /home.', () => {
        expect(start.find("Link").at(0).prop("to")).toEqual("/home");
    })

    it('Debería renderizar en un tag "img" la imagen provista en la carpeta "../components/Styles/Plate.png"', () => {
        expect(start.find("img").at(0).prop("src")).toEqual(plate);
    })

    it('La imagen debería tener un atributo "alt" con el texto "Plate"', () => {
        expect(start.find("img").at(0).prop("alt")).toEqual("Plate");
    })
})