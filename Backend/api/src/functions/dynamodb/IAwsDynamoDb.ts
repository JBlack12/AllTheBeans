export interface IAwsDynamoDb {
    CreateTable(params);
    InsertItem(params);
    QueryItem(params);
    UpdateItem(params);
}
