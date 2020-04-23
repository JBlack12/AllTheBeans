import { DynamoDB } from "aws-sdk";

export class GetInventoryBody {
    public name: string;
    public price: string;
    public aroma: string;
    public colour: string;
    public image: string;

    constructor(dynamoOutputObj) {
        this.name = dynamoOutputObj.Name.S;
        this.price = dynamoOutputObj.Cost.S;
        this.aroma = dynamoOutputObj.Aroma.S;
        this.colour = dynamoOutputObj.Colour.S;
        this.image = dynamoOutputObj.Image.S;
    }
}
