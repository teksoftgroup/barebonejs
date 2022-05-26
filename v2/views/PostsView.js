import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
    constructor(params){
        super(params);
        this.setTitle("SampleView");
    }

    async getHtml(){
        return `
            <h1>Posts</h1>
            <p>
                is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, 
                but also the leap into electronic typesetting, remaining essentially unchanged.
            </p>
            <p>
                <a href="/"> Back </a>
            </p>
        `;
    }
    
}