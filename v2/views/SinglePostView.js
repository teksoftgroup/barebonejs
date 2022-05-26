import AbstractView from "./AbstractView.js";

export default class extends AbstractView {
    constructor(params){
        super(params);
        this.setTitle("SampleView");
    }

    async getHtml(){
        console.log(this.params.id);
        return `
            <h1>Post</h1>
            <p>
                You are viewing a single post    
            </p>
            <p>
                <a href="/"> Back </a>
            </p>
        `;
    }
    
}